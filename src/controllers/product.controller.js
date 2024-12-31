import PRODUCTMODEL from "../models/product.model.js";

export const AddProduct = async (req, res) => {
    try {
        const {productName, minBuyQuantity, productCategory, productOwner, ProductImages, productDescription, productFeatures} = req.body;
        const existingProduct = await PRODUCTMODEL.findOne({productName: productName, productOwner: productOwner});
        if(existingProduct) {
            return res.status(409).json({message: 'Similar Product already exists'});
        }
        const newProduct = new PRODUCTMODEL({
            productName: productName,
            minBuyQuantity: minBuyQuantity,
            productCategory: productCategory,
            productOwner: productOwner,
            productImages: ProductImages,
            productDescription: productDescription,
            productFeatures: productFeatures
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
        
    } catch (error) {
        console.log("Error @EditProduct -> prodcut.controller.js")
        return res.status(500).json({message: "Internal server error"})
    }
}

export const DeleteProdcut = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("Error @DeleteProdcut -> prodcut.controller.js")
        return res.status(500).json({message: "Internal server error"})
    }
}
