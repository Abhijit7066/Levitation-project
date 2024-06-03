import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedProps {
  Component: React.ComponentType;
}

const Protected: React.FC<ProtectedProps> = ({ Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = localStorage.getItem('login') && JSON.parse(localStorage.getItem('login') as string).login;
    const tokenExpiry = new Date(localStorage.getItem('tokenExpiry') || '') <= new Date();
  
    if (!isLogin && tokenExpiry) {
      navigate("/signin");
    }
  }, [navigate]); // Include navigate in the dependency array
  
  

  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
