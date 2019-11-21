import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";
import Select from "../common/Select";

class Form extends Component {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  validate = () => {
    const results = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });

    if (!results.error) return null;
    // console.log(results);
    const errors = {};
    for (let item of results.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema, { abortEarly: true });
    // console.log(error.details[0]);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    // console.log(errorMessage);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
    // console.log(input);
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    // console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        type={type}
        onChange={this.handleChange}
        errors={errors[name]}
      />
    );
  };

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderButton = name => {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-primary clickable"
      >
        {name}
      </button>
    );
  };
}

export default Form;
