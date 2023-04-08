const yup = require("yup");

const registerValidation = async (data) => {
  const schema = yup.object().shape({
    firstname: yup.string().min(2).required(),
    lastname: yup.string().min(2).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  });

  try {
    await schema.validate(data);
    return true;
  } catch (error) {
    return false;
  }
};

const loginValidation = async (data) => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  });

  try {
    await schema.validate(data);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = { registerValidation, loginValidation };
