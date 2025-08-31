import React, { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_PATHS } from "../../../utils/apiPaths";
import AuthInput from "../../../components/input/AuthInput";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle Sign Up Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }
    setError("");

    try {
      const response = await axios.post(API_PATHS.AUTH.REGISTER, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSignUp}>
        <AuthInput
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email"
          placeholder="youremail@gmail.com"
          type="text"
        />

        <AuthInput
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />

        {error && <p>{error}</p>}

        <button type="submit">SignUp</button>
      </form>
    </div>
  );
};

export default Register;
