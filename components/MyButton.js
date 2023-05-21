import { type } from "@testing-library/user-event/dist/type";
import React from "react";

const btnType = ["positive", "negative"].includes(type) ? type : "default";

const MyButton = ({ text, type, onClick }) => {
  return (
    <button
      className={["MyButton", `MyButton_${type}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
MyButton.defaultProps = {
  type: "default",
};
export default MyButton;
