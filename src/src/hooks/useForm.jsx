import { useState } from "react";
import Joi from "joi";
import Input from "../common/Input";

const useForm = (formData, schema) => {
  const [data, setData] = useState(formData);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (!error) return null;
    const errors = {};
    error.details.map((item) => (errors[item.path[0]] = item.message));
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm() || {});
    if (validateForm()) return;

    doSubmit();
  };

  const doSubmit = () => {
    // Call the server!
    console.log("Submitted!");
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const rule = schema.extract(name);
    const subSchema = Joi.object({ [name]: rule });
    const { error } = subSchema.validate(obj);
    return error ? error.details[0].message : null;
  };

  const handleChange = ({ target: input }) => {
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        [input.name]: validateProperty(input) ? validateProperty(input) : null,
      };
    });

    setData((prevData) => {
      return { ...prevData, [input.name]: input.value };
    });
  };

  const renderInput = (name) => {
    return (
      <Input
        key={name}
        name={name}
        label={name.replace(/^./, (str) => str.toUpperCase())}
        value={data[name]}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  const renderButton = (label) => {
    return (
      <button disabled={validateForm()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  const formResults = [errors, handleSubmit, renderInput, renderButton];
  return formResults;
};

export default useForm;
