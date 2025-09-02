import { useContext } from "react";
import { Context } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

export function Protected({ children }) {
  
  const { user, admin } = useContext(Context);


  if (!user) {
    return <Navigate to="/" replace/>;
  }else if(!admin){
    return children;
  }else if(admin){
    return <Navigate to="/adminhome" replace/>;
  }
}
