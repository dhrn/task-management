import { Outlet, useNavigate } from "react-router-dom";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";


const AuthHandler = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  return <Outlet context={{ user }} />;
};

export default AuthHandler;
