import { Navigate } from "react-router-dom";

const Context = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return isLoggedIn ? children : <Navigate to="/" />;
};

export default Context;