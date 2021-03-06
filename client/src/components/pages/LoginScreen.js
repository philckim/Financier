import React, { useState, useContext } from "react";

import { AuthContext } from "../functions/auth-context";
import { useAxiosClient } from "../hooks/axios-hook";
import Button from "../shared/Button";
import Card from "../shared/Card";
import ErrorModal from "../layout/ErrorModal";
import { useForm } from "../hooks/form-hook";
import ImageUpload from "../layout/ImageUpload";
import Input from "../shared/Input";
import LoadingSpinner from "../layout/LoadingSpinner";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../functions/validators";

import "../css/login.css";

const LoginScreen = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useAxiosClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  /**
   * User presses SWITCH TO LOGIN/SIGNUP: Changes form data
   * @param {state} isLoginMode - Login default. Current mode
   */
  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          email: undefined,
          image: undefined,
          name: undefined,
          password: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          email: {
            value: "",
            isValid: false,
          },
          password: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  /**
   * User presses LOGIN or SIGN UP: Sends the respective request & data
   * @param {*} event - Click
   * @param {state} formState - What is currently typed in
   */
  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "POST",
          "http://localhost:5000/api/users",
          {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }
        );
        auth.login(responseData.token);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("image", formState.inputs.image.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        const responseData = await sendRequest(
          "POST",
          "http://localhost:5000/api/users/create",

          formData
        );
        auth.login(responseData.token);
      } catch (err) {}
    }
  };

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Cuddly Octo Doodle</h1>
          <ErrorModal error={error} onClear={clearError} />
          <Card className="authentication">
            {isLoading && <LoadingSpinner asOverlay />}
            <h2 style={{ color: "black" }}>Login Required</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
              <Input
                element="input"
                id="email"
                type="email"
                label="E-Mail"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email address."
                onInput={inputHandler}
              />
              {!isLoginMode && (
                <>
                  <ImageUpload
                    center
                    id="image"
                    onInput={inputHandler}
                    errorText="Please provide an image."
                  />

                  <Input
                    element="input"
                    id="name"
                    type="text"
                    label="Your Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a name."
                    onInput={inputHandler}
                  />
                </>
              )}
              <Input
                element="input"
                id="password"
                type="password"
                label="Password"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid password, at least 5 characters."
                onInput={inputHandler}
              />
              <Button dark disabled={!formState.isValid} type="submit">
                {isLoginMode ? "LOGIN" : "SIGNUP"}
              </Button>
            </form>
            <Button dark onClick={switchModeHandler}>
              SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LoginScreen;
