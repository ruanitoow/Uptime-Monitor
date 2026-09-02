const userControl = {}

userControl.data = (req, res) => {
    res.status(200).json({ message: "Successfully retrieved data" });
}

export { userControl }