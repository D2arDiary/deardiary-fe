import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyButton from "../components/MyButton";

const Login = () => {
  const [inputId, setInputID] = useState("");
  const [inputPw, setInputPw] = useState("");
  const navigate = useNavigate();
  const handleInputId = (e) => {
    setInputID(e.target.value);
    console.log("inputId :: ", inputId);
  };
  const handleInputPw = (e) => {
    setInputPw(e.target.value);
    console.log("inputPw :: ", inputPw);
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
      .post("http://192.168.0.195:38383/api/login", info)
      .then((response) => {
        console.log(response.data);
        if (response.data.isLogin == "true") {
          sessionStorage.setItem("isLogin", "true");
          window.location.href = "/";
        } else {
          sessionStorage.setItem("isLogin", "false");
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
      <div>
        <input
          className="id_field"
          type="text"
          placeholder="ID"
          onChange={handleInputId}
        />
      </div>
      <br></br>
      <div>
        <input
          className="pw_field"
          type="password"
          placeholder="Password"
          onChange={handleInputPw}
        />
      </div>
      <br></br>
      <MyButton text={"로그인"} onClick={onClickLogin} />
      <MyButton text={"회원가입"} />
    </div>
  );
};

export default Login;
