import { useState } from "react";
import Joi from "joi";
import Input from "../common/Input";
import useForm from "../hooks/useForm";

const LoginForm = () => {
  const account = { username: "", password: "" };
  // const [account, setAccount] = useState({ username: "", password: "" });
  // const [errors, setErrors] = useState({});
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  // const validateForm = () => {
  //   const { error } = schema.validate(account, { abortEarly: false });
  //   if (!error) return null;
  //   const errors = {};
  //   error.details.map((item) => (errors[item.path[0]] = item.message));
  //   return errors;
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setErrors(validateForm() || {});
  //   if (validateForm()) return;

  //   // Call the server!
  //   console.log("Submitted!");
  // };

  // const validateProperty = ({ name, value }) => {
  //   const obj = { [name]: value };
  //   const rule = schema.extract(name);
  //   const subSchema = Joi.object({ [name]: rule });
  //   const { error } = subSchema.validate(obj);
  //   return error ? error.details[0].message : null;
  // };

  // const handleChange = ({ target: input }) => {
  //   setErrors((prevErrors) => {
  //     return {
  //       ...prevErrors,
  //       [input.name]: validateProperty(input) ? validateProperty(input) : null,
  //     };
  //   });

  //   setAccount((prevAccount) => {
  //     return { ...prevAccount, [input.name]: input.value };
  //   });
  // };

  // const renderInput = (name) => {
  //   return (
  //     <Input
  //       key={name}
  //       name={name}
  //       label={name.replace(/^./, (str) => str.toUpperCase())}
  //       value={account[name]}
  //       onChange={handleChange}
  //       error={errors[name]}
  //     />
  //   );
  // };

  // const renderButton = (label) => {
  //   return (
  //     <button disabled={validateForm()} className="btn btn-primary">
  //       {label}
  //     </button>
  //   );
  // };

  const { errors, handleSubmit, renderInput, renderButton } = useForm(
    account,
    schema
  );

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      {Object.keys(account).map((key) => {
        return renderInput(key);
      })}
      {renderButton("Login")}
      {console.log(account, errors)}
    </form>
  );
};

export default LoginForm;
