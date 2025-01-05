import PAYMENTMODEL from "../models/payment.model.js";

export const AddPayment = async (req, res) => {
    try {
        const { user } = req;
        const { paymentMethod, paymentStatus, transactionId } = req.body;

        if (!paymentMethod || !paymentStatus || !transactionId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newPayment = new PAYMENTMODEL({
            userId: user._doc._id,
            paymentMethod,
            paymentStatus,
            transactionId,
            paidAt: paymentStatus === 'Success' ? new Date() : null
        });

        await newPayment.save();
        return res.status(201).json({ message: "Payment added successfully", data: newPayment });

    } catch (error) {
        console.log("Error @AddPayment -> payment.controller.js")
        return res.status(500).json({message: "Internal server error"})
    }
}

export const UpdatePayment = async (req, res) => {
    try {
        const { paymentId } = req.params; 
        const { paymentStatus, transactionId } = req.body; 

        if (!paymentId) {
            return res.status(400).json({ message: "Payment ID is required" });
        }

        if (!paymentStatus && !transactionId) {
            return res.status(400).json({ message: "At least one field (paymentStatus or transactionId) must be provided" });
        }

        const payment = await PAYMENTMODEL.findById(paymentId);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        if (paymentStatus) payment.paymentStatus = paymentStatus;
        if (transactionId) payment.transactionId = transactionId;
        if (paymentStatus === 'Success' && !payment.paidAt) {
            payment.paidAt = new Date(); 
        }
        await payment.save();

        return res.status(200).json({ message: "Payment updated successfully", data: payment });
    } catch (error) {
        console.log("Error @UpdatePayment -> payment.controller.js")
        return res.status(500).json({message: "Internal server error"})
    }
}

export const GetPayment = async (req, res) => {
    try {
        const { user } = req;
        const paymentId = req.params && req.params['paymentId'];
        // console.log(paymentId)
        if(!paymentId || paymentId === undefined) {
            const allPayments = await PAYMENTMODEL.find({userId: user._doc._id});
            return res.status(200).json({message: 'Fetched all payments', data: allPayments})
        } else {
            const payment = await PAYMENTMODEL.find(paymentId);
            if(!payment) return res.status(404).json({message: 'Payment not found/ you are unauthorized to view this payment'});
            return res.status(200).json(payment)
        }
    } catch (error) {
        console.log("Error @GetPayment -> payment.controller.js", error.message)
        return res.status(500).json({message: "Internal server error"})
    }
}