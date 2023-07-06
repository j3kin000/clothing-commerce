import { createSelector } from "reselect";
import { User_State } from "./user.reducer";
import { RootState } from "../store";

// export const selectCurrentUser = (state): User_State => state.user.currentUser;

export const userReducer = (state: RootState): User_State => state.user;

export const selectCurrentUser = createSelector(
  [userReducer],
  (user) => user.currentUser
);
