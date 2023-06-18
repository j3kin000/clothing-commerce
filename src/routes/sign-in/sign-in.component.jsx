import React, { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  createUserDocumentFromAuth,
  signInWithGooglePopUp,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up/sign-up-form.component";

const SignIn = () => {
  useEffect(() => {
    const init = async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        createUserDocumentFromAuth(response.user);
      }
    };
    init();
  }, []);
  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopUp();
      createUserDocumentFromAuth(user);
    } catch (error) {}
  };

  return (
    <div>
      <button onClick={logGoogleUser}>sign in with google</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
