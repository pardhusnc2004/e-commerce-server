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
    }
}, {
    timestamps: true
})

const PAYMENTMODEL = mongoose.model('Payment', paymentSchema)

export default PAYMENTMODEL;