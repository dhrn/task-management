import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("test@test.com");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="">
      <h1>Log In</h1>
      <p>use: test@test.com/ test@test.com</p>
      <input
        type="text"
        className=""
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail Address"
      />
      <input
        type="password"
        className=""
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        className=""
        onClick={() => signInWithEmailAndPassword(auth, email, password)}
      >
        Login
      </button>
    </div>
  );
}
export default Login;
