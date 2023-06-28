import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { rootReducer } from "./root-reducer";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./rootSaga";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["user"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
  process.env.NODE_ENV === "development" && logger,
  // thunk,
  sagaMiddleware,
].filter(Boolean);

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// const composedEnhances = composeEnhancer(applyMiddleware(...middlewares));
// export const store = createStore(persistedReducer, undefined, composedEnhances);
export const store = composeEnhancer(applyMiddleware(...middlewares))(
  createStore
)(persistedReducer); //you cal also used this to creat eyour store

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
