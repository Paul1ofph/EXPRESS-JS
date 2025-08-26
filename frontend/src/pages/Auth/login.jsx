import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import  axios  from "axios";
import { API_PATHS } from "../../utils/apiPaths";
import AuthInput from "../../components/input/AuthInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");
    // Login API
    try {
      const response = await axios.post(API_PATHS.AUTH.LOGIN,{email, password});
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
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <AuthInput
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        label="Email Address"
        placeholder="youreemail@example.com"
        type="text"
      />

      <AuthInput
       value={password}
       onChange={({target}) => setPassword(target.value)}
       label="Password"
       placeholder="Min 8 Characters"
       type="password"
      />

      {error && <p>{error}</p>}

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
