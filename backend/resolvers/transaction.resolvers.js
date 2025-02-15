import Transactions from "../models/transaction.model.js";

const transactionResolver ={
    Query: {
        transaction: async (_, __, context) => {
            try {
                if(!context.getUser()) throw new Error("Unauthorized");
                const userId = await context.getUser()._id;

                const transaction = await Transaction.find({ userId });
                return transaction;
            } catch (err) {
                console.error("Error getting transaction:",err);
                throw new Error("Error getting transactions");             
            }
        },
        transaction: async(_, { transactionId },) =>{
            try {
                const transaction = await Transaction.findById(transactionId);
                return transaction;
                
            } catch (err) {
                console.error("Error getting transaction:", err);
                throw new Error("Error getting transaction");
            }
        },
        //todo => add categoryStatistics query
    },
    Mutation: {
        createTransaction: async(_, {input},context) =>{
            try {
                const newTransaction = new Transactions({
                    ...input,
                    userId:context.getUser()._id
                })
                await newTransaction.save();
                return newTransaction;
            } catch (err) {
                console.error("Error creating transaction:", err);
                throw new Error("Error creating transaction");                
            }
        },
        updateTransaction: async(_, {input}) =>{
            try {
                const updateTransaction = await Transaction.findByIdAndUpdate(input.transactionId,{new:true});
                return updateTransaction;
            } catch (err) {
                console.error("Error update transaction:", err);
                throw new Error("Error update transaction");
            }
        },
        deleteTransaction: async(_, {transactionId}) =>{
            try {
                const deleteTransaction = await Transaction.findByIdAndDelete(transactionId);
                return deleteTransaction;
            } catch (err) {
                console.error("Error delete transaction:", err);
                throw new Error("Error delete transaction");
            }      
          },
        },
        //todo add the tranction realast
    };
export default transactionResolver;