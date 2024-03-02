import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }]

})

export const Product = mongoose.model("Product", productSchema)