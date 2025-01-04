import PRODUCTMODEL from "../models/product.model.js";

export const AddProduct = async (req, res) => {
    try {
        const { user } = req;
        const { productName, minBuyQuantity, productCategory, ProductImages, productDescription, productFeatures, productPrice, productDiscount, productInStock } = req.body;
        const existingProduct = await PRODUCTMODEL.findOne({productName: productName, productOwner: user._doc._id});
        if(existingProduct) {
            return res.status(409).json({message: 'Similar Product already exists'});
        }
        const newProduct = new PRODUCTMODEL({
            productName: productName,
            minBuyQuantity: minBuyQuantity,
            productCategory: productCategory,
            productOwner: user._doc._id,
            productImages: ProductImages,
            productDescription: productDescription,
            productFeatures: productFeatures,
            productDiscount: productDiscount,
            productPrice: productPrice,
            prodcutInStock: productInStock
        });
        newProduct.save();
        return res.status(201).json({message: "Product added successfully"})
    } catch (error) {
        console.log("Error @AddProdcut -> prodcut.controller.js")
        return res.status(500).json({message: "Internal server error"})
    }
}

export const EditProduct = async (req, res) => {
    try {
        const { user } = req;
        const { productId } = req.params;
        const { productName, minBuyQuantity, productCategory, productImages, productDescription, productFeatures, productInStock, productPrice, productDiscount } = req.body;
        const existingProduct = await PRODUCTMODEL.findOne({ productOwner: user._doc._id, _id: productId });
        if(!existingProduct) {
            return res.status(403).json({message: "You are not authorized to edit this product/ product invalid"})
        }
        const updatedProduct = await PRODUCTMODEL.findByIdAndUpdate(productId, {productName: productName, minBuyQuantity: minBuyQuantity, productCategory: productCategory, productImages: productImages, productDescription: productDescription, productFeatures: productFeatures, productDiscount: productDiscount, productPrice: productPrice, prodcutInStock: productInStock});
        return res.status(200).json({message: "Product updated successfully"});
    } catch (error) {
        console.log("Error @EditProduct -> prodcut.controller.js")
        return res.status(500).json({message: "Internal server error"})
    }
}

export const DeleteProdcut = async (req, res) => {
    try {
        const { user } = req;
        const { productId } = req.params;
        const existingProduct = await PRODUCTMODEL.findOne({ productOwner: user._doc._id, _id: productId });
        if(!existingProduct) {
            return res.status(403).json({message: "You are not authorized to delete this product/ product invalid"})
        }
        const deletedProduct = await PRODUCTMODEL.findByIdAndDelete(productId);
        return res.status(200).json({message: "Product deleted successfully"});
    } catch (error) {
        console.log("Error @DeleteProdcut -> prodcut.controller.js")
        return res.status(500).json({message: "Internal server error"})
    }
}
