import React from "react";
import Form from "./Form";
import Joi from "joi-browser";
import * as userService from "../services/userServices";
import { loginWithJwt } from "../services/authService";

class RegisterForm extends Form {
  state = { data: { username: "", password: "", name: "" }, errors: {} };
  schema = {
    username: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
      .min(5),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    // call the server
    try {
      const result = await userService.register(this.state.data);
      loginWithJwt("token", result.headers["x-auth-token"]);
      console.log(result);
      window.location = "/";
      console.log("SUBMITTED");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        var errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
        // console.log(ex.response);
      }
    }
  };

  render() {
    return (
      <form className="m-4" onSubmit={this.handleSubmit}>
        <h1>Register Form</h1>
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "password")}
        {this.renderInput("name", "Name")}
        {this.renderButton("Register")}
      </form>
    );
  }
}

export default RegisterForm;
