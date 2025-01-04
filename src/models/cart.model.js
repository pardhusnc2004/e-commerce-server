import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    cartOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    itemsList: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        productQuantity: {
            type: Number,
            required: true,
            min: 1
        }
    }]
})

const CARTMODEL = mongoose.model('Cart', cartSchema);

export default CARTMODEL;