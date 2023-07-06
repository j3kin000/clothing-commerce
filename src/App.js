import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Shop from "./routes/shop/shop.component";
import Authentication from "./routes/authentication/authentication.component";
import Checkout from "./routes/checkout/checkout.component";
import {
  createUserDocumentFromAuth,
  getCurrentUser,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";
import { checkUserSession, setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";
import { GlobalStyle } from "./global.styles";
const App = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChangedListener((user) => {
  //     if (user) {
  //       createUserDocumentFromAuth(user);
  //     }
  //     console.log("dispatchinguser");
  //     dispatch(setCurrentUser(user));
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);
  return (
    <div>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/shop/*" element={<Shop />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
