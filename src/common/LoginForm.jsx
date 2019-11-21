import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
import * as authService from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    // call the server
    try {
      const { username, password } = this.state.data;
      await authService.login(username, password);
      window.location = "/";
      // console.log(jwt);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        var errors = { ...errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
    console.log("SUBMITTED");
  };

  render() {
    return (
      <form className="m-4" onSubmit={this.handleSubmit}>
        <h1>Login Form</h1>
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "password")}
        {this.renderButton("Login")}
      </form>
    );
  }
}

export default LoginForm;
