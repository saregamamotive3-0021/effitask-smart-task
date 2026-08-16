import { Navigate } from "react-router-dom";

const Context = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default Context;