import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    description:{
        type: String,
        require: true,
    },
    paymentType: {
        type: String,
        enum: ["cash", "card"],
        require: true,
    },
    category: {
        type: String,
        enum: ["saving","expense","investment"],
    },
    amount: {
        type: Number,
        require: true,
    },
    location: {
        type: String,
        default: "Unknown",
    },
    date:{
        type: String,
        default:"Unknown",
    },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;