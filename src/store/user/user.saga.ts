////typed ts file

// import { takeLatest, put, all, call } from "redux-saga/effects";
// import { USER_ACTION_TYPES } from "./user.types";
// import {
//   signInSuccess,
//   signInFailed,
//   signUpFailed,
//   signUpSuccess,
//   signOutSuccess,
//   signOutFailed,
// } from "./user.action";
// import {
//   createAuthUserWithEmailAndPassword,
//   createUserDocumentFromAuth,
//   getCurrentUser,
//   signInAuthUserWithEmailAndPassword,
//   signInWithGooglePopUp,
//   signOutUser,
// } from "../../utils/firebase/firebase.utils";

// export function* getSnapshotFromUserAuth(userAuth, addtitionalDetails) {
//   try {
//     const userSnapshot = yield* call(
//       createUserDocumentFromAuth,
//       userAuth,
//       addtitionalDetails
//     );
//     console.log("userSnapshot", userSnapshot);
//     console.log("userSnapshot.data", userSnapshot.data());
//     yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
//   } catch (error) {
//     yield* put(signInFailed(error));
//   }
// }

// export function* isUserAuthenticated() {
//   try {
//     const userAuth = yield* call(getCurrentUser);
//     if (!userAuth) return;
//     yield* call(getSnapshotFromUserAuth, userAuth);
//   } catch (error) {
//     yield* put(signInFailed(error));
//   }
// }
// export function* signInWithGoogle() {
//   try {
//     const { user } = yield* call(signInWithGooglePopUp);
//     yield* call(getSnapshotFromUserAuth, user);
//   } catch (error) {
//     yield* put(signInFailed(error));
//   }
// }

// export function* signInWithEmail({ payload: { email, password } }) {
//   try {
//     const { user } = yield* call(
//       signInAuthUserWithEmailAndPassword,
//       email,
//       password
//     );
//     yield* call(getSnapshotFromUserAuth, user);
//   } catch (error) {
//     yield* put(signInFailed(error));
//   }
// }

// export function* signUp({ payload: { email, password, displayName } }) {
//   try {
//     const { user } = yield* call(
//       createAuthUserWithEmailAndPassword,
//       email,
//       password
//     );
//     yield* put(signUpSuccess(user, { displayName }));
//   } catch (error) {
//     yield* put(signUpFailed(error));
//   }
// }
// export function* signInAfterSignUp({ payoss: { user, addtitionalDetails } }) {
//   try {
//     yield* call(getSnapshotFromUserAuth, user, addtitionalDetails);
//   } catch (error) {
//     yield* put(signUpFailed(error));
//   }
// }

// export function* onSignOut() {
//   try {
//     yield* call(signOutUser);
//     yield* put(signOutSuccess());
//   } catch (error) {
//     yield* put(signOutFailed());
//   }
// }
// export function* onSignOutStart() {
//   try {
//     yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, onSignOut);
//   } catch (error) {}
// }
// export function* onSignUpSuccess() {
//   try {
//     yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
//   } catch (error) {}
// }

// export function* onSignUpStart() {
//   try {
//     yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
//   } catch (error) {}
// }
// export function* onEmailSignInStart() {
//   yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
// }

// export function* onGoogleSignInStart() {
//   yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
// }
// export function* onCheckUserSession() {
//   yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
// }

// export function* userSagas() {
//   yield* all([
//     call(onCheckUserSession),
//     call(onGoogleSignInStart),
//     call(onEmailSignInStart),
//     call(onSignUpStart),
//     call(onSignOutStart),
//   ]);
// }
////typed ts file
import { takeLatest, put, all, call } from "typed-redux-saga/macro";
import { USER_ACTION_TYPES } from "./user.types";
import {
  signInSuccess,
  signInFailed,
  signUpFailed,
  signUpSuccess,
  signOutSuccess,
  signOutFailed,
  EmailPasswordSignInStart,
  SignUpStart,
  SignInSuccess,
  SignUpSuccess,
} from "./user.action";
import {
  AdditionalInformation,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopUp,
  signOutUser,
} from "../../utils/firebase/firebase.utils";
import { User } from "firebase/auth";

export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalInformation
) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    if (userSnapshot) {
      yield* put(
        signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
      );
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}
export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopUp);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithEmail({
  payload: { email, password },
}: EmailPasswordSignInStart) {
  try {
    const userCredential = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      yield* call(getSnapshotFromUserAuth, userCredential.user);
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}
//
export function* signUp({
  payload: { email, password, displayName },
}: SignUpStart) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      yield* put(signUpSuccess(userCredential.user, displayName));
    }
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}
export function* signInAfterSignUp({
  payload: { user, additionalDetails },
}: SignUpSuccess) {
  yield* call(getSnapshotFromUserAuth, user, {
    displayName: additionalDetails,
  });
}

export function* onSignOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}
export function* onSignOutStart() {
  try {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, onSignOut);
  } catch (error) {}
}
export function* onSignUpSuccess() {
  try {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
  } catch (error) {}
}

export function* onSignUpStart() {
  try {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
  } catch (error) {}
}
export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}
export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignOutStart),
  ]);
}
