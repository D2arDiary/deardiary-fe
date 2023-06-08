import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

const Login = () => {
  const [inputId, setInputID] = useState("");
  const [inputPw, setInputPw] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   // navigate("/");
  //   window.location.replace("/");
  // }, [inputId]);

  const handleInputId = (e) => {
    setInputID(e.target.value);
    console.log("inputId :: ", inputId);
  };
  const handleInputPw = (e) => {
    setInputPw(e.target.value);
    console.log("inputPw :: ", inputPw);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onClickLogin();
    }
  };

  const onClickSignUp = () => {
    navigate("/signup");
  };

  const onClickLogin = async () => {
    console.log("click login");
    console.log("ID: ", inputId);
    console.log("PW: ", inputPw);
    let info = {
      userId: inputId,
      userPw: inputPw,
    };

    console.log("info :: ", info);

    let status = await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/login`, info)
      .then((response) => {
        console.log(response.data);
        if (response.data.isLogin == "true") {
          sessionStorage.setItem("isLogin", "true");
          sessionStorage.setItem("userId", inputId);
          window.location.href = "/";
        } else {
          sessionStorage.setItem("isLogin", "false");
          sessionStorage.removeItem("isLogin");
          sessionStorage.removeItem("userId");
          alert("아이디 또는 비밀번호가 틀렸습니다.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="login_wrapper">
      <img className="login_logo" src="assets/logo.png" />
      <section>
        <h2>ID</h2>
        <div>
          <input
            className="id_field"
            type="text"
            placeholder="    ID"
            onChange={handleInputId}
          />
        </div>
        <h2>Password</h2>
        <div>
          <input
            className="pw_field"
            type="password"
            placeholder="    Password"
            onChange={handleInputPw}
            onKeyPress={handleKeyPress}
          />
        </div>
      </section>
      <div className="form_wrapper">
        <MyButton text={"로그인"} type={"positive"} onClick={onClickLogin} />
        <MyButton text={"회원 가입 "} onClick={onClickSignUp} />
      </div>
    </div>
  );
};

export default Login;
