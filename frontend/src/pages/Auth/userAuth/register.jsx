import React, { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="p-5">
      <form onSubmit={handleSignUp}>
        <h1 className="text-2xl text-center font-bold">Register</h1>
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

        <button
          type="submit"
          className="w-full text-sm font-medium bg-black text-white shadow-lg p-[10px] rounded-md my-1 hover:bg-black/80"
        >
          SignUp
        </button>
        <p className="text-[16px] text-slate-800 mt-3">
          Already have an account?{" "}
          <Link className="font-medium text-primary underline" to="/login">
            login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
