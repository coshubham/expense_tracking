import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import GridBackground from './components/ui/GridBackground'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri:import.meta.env.VITE_NODE_ENV === "development"? 'http://localhost:4000/graphql': "/graphql", //uel for server gql
  cache: new InMemoryCache(),
  credentials: "include", // send cookessis with servers
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GridBackground>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </GridBackground>
    </BrowserRouter>
  </StrictMode>,
)
