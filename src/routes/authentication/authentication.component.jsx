import React, { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  createUserDocumentFromAuth,
  signInWithGooglePopUp,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up/sign-up-form.component";
import SignInForm from "../../components/sign-in/sign-in.component";
import "./authentication.styles.scss";
const Authentication = () => {
  // useEffect(() => {
  //   const init = async () => {
  //     const response = await getRedirectResult(auth);
  //     if (response) {
  //       createUserDocumentFromAuth(response.user);
  //     }
  //   };
  //   init();
  // }, []);

  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
