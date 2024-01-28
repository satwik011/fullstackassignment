import React, { useState } from "react";
import styled from "styled-components";
import { setApiStatus } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = styled.div`
  text-align: center;
  margin: 20px;
`;

const InputContainer = styled.div`
  margin-bottom: 15px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const LoginButton = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("Both fields are mandatory");
    } else {
      setErrorMessage("");
      const loginStreamer = async () => {
        try {
          const response = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: username,
              name: password,
            }),
          });

          const newData = await response.json();
          console.log(newData);
          if (newData?.success == "success") {
            if (newData?.role == "admin") {
              dispatch(setApiStatus("success", "admin"));
              navigate("/admin");
            } else {
              dispatch(setApiStatus("success", "user"));
              navigate("/streamers");
            }
          } else {
            dispatch(setApiStatus("fail", ""));
          }
        } catch (error) {
          console.error("Error fetching streamers:", error);
          dispatch(setApiStatus("fail", ""));
        }
      };
      loginStreamer();
    }
  };

  return (
    <LoginPage>
      <h2>Login Page</h2>
      <InputContainer>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputContainer>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <LoginButton onClick={() => handleLogin()}>Login</LoginButton>
    </LoginPage>
  );
};

export default Login;
