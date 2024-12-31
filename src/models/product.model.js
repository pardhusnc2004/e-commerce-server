import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    minBuyQuantity: {
        type: Number,
        default: 1
    },
    productCategory: {
        type: [String],
        default: []
    },
    productOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productImages: {
        type: [String],
        default: []
    },
    productDescription: {
        type: String,
        required: true
    },
    productFeatures: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
})

const PRODUCTMODEL = mongoose.model('Product', productSchema);

export default PRODUCTMODEL;