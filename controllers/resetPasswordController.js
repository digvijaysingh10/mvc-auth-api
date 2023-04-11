const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { loginValidation } = require("../middleware/validation");

const resetPassword = async (req, res) => {
    try {
        const { error } = loginValidation(req, res);
        if (error) {
            return res.status(400).send(eror.details[0].message);
        }
        const oldPassword = await bcrypt.compare(req.body.password, user.password);
        if (!oldPassword) {
            return res.status(404).send("PASSWORD DIDN'T MATCHED!!!");
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const user = await User.updateOne({
                password: hashedPassword
            });
            res.status(200).send({ message: "PASSWORD CHANGED SUCCESSFULLY!!!" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "SERVER ERROR!!!" });
    }
};