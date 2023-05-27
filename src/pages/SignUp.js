import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyButton from "../components/MyButton";

const SignUp = () => {
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

  const onClickSignUp = async () => {
    const info = { username: inputId, password: inputPw };
    const data = await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/signup`, info)
      .then((response) => {
        // console.log(response.data["signUp"]);
        if (response.data["signUp"] === "success") {
          alert("회원가입에 성공하였습니다.");
          navigate("/");
        } else {
          alert("이미 있는 ID입니다.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="login_wrapper">
      {/* <img className="login_logo" src="assets/logo.png" /> */}
      <section>
        <h1>회원 가입하기</h1>
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
          />
        </div>
      </section>
      <div className="form_wrapper">
        {/* <MyButton text={"로그인"} type={"positive"} onClick={onClickLogin} /> */}
        <MyButton text={"뒤로가기"} onClick={() => navigate(-1)} />
        <MyButton
          type={"positive"}
          text={"회원 가입"}
          onClick={onClickSignUp}
        />
      </div>
    </div>
  );
};

export default SignUp;
