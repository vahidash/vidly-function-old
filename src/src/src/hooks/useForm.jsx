const useForm = ({ formData, schema }) => {
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

  doSubmit = () => {
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

  return [data, errors, handleSubmit, handleChange];
};
export default useForm;
