const Form = ({ title, initData, schema, children }) => {
  const [data, setData] = useState(initData);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const { error } = schema.validate(account, { abortEarly: false });
    if (!error) return null;
    const errors = {};
    error.details.map((item) => (errors[item.path[0]] = item.message));
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm() || {});
    if (validateForm()) return;

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

    setAccount((prevAccount) => {
      return { ...prevAccount, [input.name]: input.value };
    });
  };

  const renderButton = (buttonLabel) => {
    <button disabled={validateForm()} className="btn btn-primary">
      {buttonLabel}
    </button>;
  };
  return;
};

export default Form;
