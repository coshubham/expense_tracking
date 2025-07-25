import cors from 'cors';
import express from 'express';
import http from 'http';
import dotenv from "dotenv";
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import ConnectMongo from 'connect-mongodb-session';

import { ApolloServer } from "@apollo/server";
import { buildSchema } from "graphql";
import mergeResolvers from "./resolvers/index.js";
import mergeTypeDefs from "./typeDefs/index.js";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { buildContext } from "graphql-passport";

import { connectDB } from './db/connectDB.js';
import { configurePassport } from './passport/passort.js';
import job from './cron.js';

dotenv.config();
configurePassport();

job.start(); // Start the cron job

const __dirname = path.resolve();
const app = express();

const httpServer = http.createServer(app);

const MongoDBStore = ConnectMongo(session);
const store = new MongoDBStore({
  uri:process.env.MONGO_URI,
  collection: "session",
})

store.on("error",(err) => console.log(err));

app.use(
  session({
    secret: process.env.SESSION_SECRET, // Corrected typo here
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,  // 1 week expiration time
      httpOnly: true, 
      secure: false,                  // Cookie cannot be accessed via JavaScript
    },
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
  typeDefs: mergeTypeDefs,
  resolvers: mergeResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
 
await server.start();

app.use(
  '/graphql',
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req,res }) => buildContext({ req,res }),
  }),
);

//npm run bulid will your frontend app
app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("*",(req, res) => {  
  res.sendFile(path.join(__dirname, "frontend/dist", "index.html"))
})

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDB();

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
