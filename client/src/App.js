import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import store from "./store/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
};
export default App;
