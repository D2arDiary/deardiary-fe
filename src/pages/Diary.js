import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { emotionList } from "../util/emotion";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `Home > 나의 ${id}번째 일기`;
  }, []);

  useEffect(() => {
    const targetDiary = diaryList.find(
      (it) => parseInt(it.id) === parseInt(id)
    );
    if (targetDiary) {
      setData(targetDiary);
    } else {
      // alert("없는 일기입니다.");
      navigate("/", { replace: true });
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );
    <div className="DiaryPage"></div>;

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))}의 기록`}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"수정 하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />

        <article>
          <section>
            <h4>오늘의 일기</h4>
            {/* <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} />
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>*/}
          </section>
          <div className="diary_content_section">
            <section>
              <div className="diary_content_wrapper">
                <div className="diary_content_wrapper_data">
                  <p>{data.content}</p>
                </div>
              </div>
            </section>
          </div>

          <section>
            <div className="diary_empathy_wrapper">
              <div className="diary_content_wrapper_empathy">
                <p>{data.message}</p>
              </div>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
