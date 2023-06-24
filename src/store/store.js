import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { rootReducer } from "./root-reducer";
import thunk from "redux-thunk";

const middlewares = [
  process.env.NODE_ENV === "development" && logger,
  thunk,
].filter(Boolean);

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhances = composeEnhancer(applyMiddleware(...middlewares));
export const store = createStore(persistedReducer, undefined, composedEnhances);
export const persistor = persistStore(store);
