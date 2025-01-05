import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['Credit card', 'Debit card', 'UPI'],
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Success', 'Failed'],
        required: true
    },
    paidAt: {
        type: Date,
    },
    transactionId: {
        type: String, // from the payment gateway
    }
}, {
    timestamps: true
})

const PAYMENTMODEL = mongoose.model('Payment', paymentSchema)

export default PAYMENTMODEL;