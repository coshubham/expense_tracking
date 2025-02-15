import { gql } from "graphql-tag";
import { mergeTypeDefs } from "@graphql-tools/merge";
import userTypeDef from "./user.typeDef.js";
import transactionTypeDef from "./transaction.typeDef.js";

const mergedTypeDefs = gql`
  ${userTypeDef}
  ${transactionTypeDef}
`;

export default mergedTypeDefs;
