const User = require('../modele/User');
exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: "user not found" });
        }
        await User.findByIdAndDelete(id);
        res.send("deleteted");
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
}