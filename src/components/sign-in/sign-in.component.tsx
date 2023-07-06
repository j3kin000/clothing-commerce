import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import "./sign-in.styles.scss";
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopUp,
} from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import { useDispatch } from "react-redux";
import {
  emailPasswordSignInStart,
  googleSignInStart,
} from "../../store/user/user.action";
import { AuthError, AuthErrorCodes } from "firebase/auth";

const defaultFormFields = {
  email: "",
  password: "",
};

type ErrorCode = {
  error: string | unknown;
};
const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    try {
      dispatch(googleSignInStart());
    } catch (error) {}
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // const { user } = await signInAuthUserWithEmailAndPassword(
      //   email,
      //   password
      // );
      dispatch(emailPasswordSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      switch ((error as AuthError).code) {
        case AuthErrorCodes.INVALID_PASSWORD:
          alert("Incorrect Password");
          break;
        case AuthErrorCodes.INVALID_EMAIL:
          alert("Incorrect Email");
          break;
        default:
          alert("Try again later ");
          console.log("error code", (error as AuthError).code);
      }
    }
  };
  return (
    <div className="sign-in-container">
      <h2>Sign in with your email and password</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormInput
          label="Email"
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          required
        />
        <FormInput
          label={"Password"}
          required
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="button"
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
