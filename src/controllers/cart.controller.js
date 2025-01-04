import CARTMODEL from "../models/cart.model.js";

export const AddProductToCart = async (req, res) => {
    try {
        const { user } = req;
        const { productId, productQuantity } = req.body;

        let userCart = await CARTMODEL.findOne({cartOwner: user._doc._id});
        if(!userCart) {
            userCart = new CARTMODEL({cartOwner: user._doc._id, itemsList: []})
        }

        const existingItem = userCart.itemsList.find(item => item.productId.equals(productId))

        if(existingItem) {
            existingItem.productQuantity += productQuantity;
        } else {
            userCart.itemsList.push({ productId: productId, productQuantity: productQuantity })
        }

        await userCart.save();
        return res.status(200).json({message: "Product added to cart"})

    } catch (error) {
        console.log("Error @AddProductToCard -> cart.controller.js")
        return res.status(500).json({message: "Internal server error"})
    }
}

export const DeleteProductFromCart = async (req, res) => {
    try {
        const { user } = req;
        const { productId } = req.params;

        let userCart = await CARTMODEL.findOne({cartOwner: user._doc._id});
        if(!userCart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        userCart.itemsList = userCart.itemsList.filter(item => !item.productId.equals(productId));

        await userCart.save();
        res.status(200).json({ message: "Product removed from cart", userCart });

    } catch (error) {
        console.log("Error @DeleteProductFromCart -> cart.controller.js", error.message)
        return res.status(500).json({message: "Internal server error"})
    }
}

export const GetCart = async (req, res) => {
    try {
        const { user } = req;
        let userCart = await CARTMODEL.findOne({cartOwner: user._doc._id});

        if(!userCart) {
            userCart = new CARTMODEL({cartOwner: user._doc._id, itemsList: []});
            await userCart.save();
            return res.status(404).json({ message: "Cart not found!!! Thus creaded one" });
        }
        
        return res.status(200).json(userCart);

    } catch (error) {
        console.log("Error @getCart -> cart.controller.js")
        return res.status(500).json({message: "Internal server error"})
    }
}