import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";

import { DiaryDispatchContext } from "./../App.js";

import axios from "axios";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

import { getStringDate } from "../util/date.js";

import { emotionList } from "../util/emotion.js";

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));
  const navigate = useNavigate();

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
  const userId = sessionStorage.getItem("userId");

  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const handleRemove = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      onRemove(originData.id);
      const info = {
        userId: userId,
        contentId: originData.id,
        content: content,
        date: date,
      };
      console.log(info);
      const createDiary = await axios
        .post("http://192.168.0.195:38383/api/deleteDiary", info)
        .then((response) => {
          console.log(response.data);
          // sessionStorage.setItem("localData", JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error(error);
        });

      navigate("/", { replace: true });
    }
  };

  const handleSubmit = async () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
        const info = { userId: userId, content: content, date: date };
        const createDiary = await axios
          .post("http://192.168.0.195:38383/api/postDiary", info)
          .then((response) => {
            console.log(response.data);
            // sessionStorage.setItem("localData", JSON.stringify(response.data));
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        const info = {
          userId: userId,
          contentId: originData.id,
          content: content,
          date: date,
        };
        console.log(info);
        const createDiary = await axios
          .post("http://192.168.0.195:38383/api/editDiary", info)
          .then((response) => {
            console.log(response.data);
            // sessionStorage.setItem("localData", JSON.stringify(response.data));
          })
          .catch((error) => {
            console.error(error);
          });
        onEdit(originData.id, date, content, emotion);
      }
    }
    navigate("/", { replace: true });
  };
  useEffect(() => {
    if (isEdit) {
      setContent(originData.content);
      setEmotion(originData.emotion);
      setDate(getStringDate(new Date(parseInt(originData.date))));
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
        rightChild={
          isEdit && (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>

        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
