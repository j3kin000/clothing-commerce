import { AnyAction } from "redux";
import { UserData } from "../../utils/firebase/firebase.utils";
import { USER_ACTION_TYPES } from "./user.types";
import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
} from "./user.action";

export type User_State = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};
const INITIAL_STATE: User_State = {
  currentUser: null,
  isLoading: false,
  error: null,
};

// export default (state = INITIAL_STATE, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
//       return { ...state, currentUser: payload };
//     case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
//       return { ...state, currentUser: null };
//     case USER_ACTION_TYPES.SIGN_IN_FAILED:
//       return { ...state, isLoading: false, error: payload };
//     case USER_ACTION_TYPES.SIGN_UP_FAILED:
//       return { ...state, isLoading: false, error: payload };
//     case USER_ACTION_TYPES.SIGN_OUT_FAILED:
//       return { ...state, isLoading: false, error: payload };
//     default:
//       return state;
//   }
// };
export default (state = INITIAL_STATE, action: AnyAction) => {
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  }
  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }
  if (
    signInFailed.match(action) ||
    signUpFailed.match(action) ||
    signOutFailed.match(action)
  ) {
    return { ...state, isLoading: false, error: action.payload };
  }

  return state;
};
