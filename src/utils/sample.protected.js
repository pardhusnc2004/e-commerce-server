export const protectedPage = (req, res) => {
    try {
        return res.status(200).json({message: `Welcome ${req.user._doc.fullName}`});
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
}