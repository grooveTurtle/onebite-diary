import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Editor from "../components/Editor";
import Button from "../components/Button";
import { useContext } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import { useEffect } from "react";
import { useState } from "react";
import useDiary from "../hooks/useDiary";
import usePageTitle from "../hooks/usePageTitle";

const Edit = () => {
  const nav = useNavigate();
  const params = useParams();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const data = useContext(DiaryStateContext);
  usePageTitle(`${params.id}번 일기 수정하기`);

  const curDiaryItem = useDiary(params.id);

  // 얘는 이벤트 핸들러이므로 nav가 렌더링 이후에 실행되므로 잘 되는것...
  const onClickDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("정말 수정하시겠습니까?")) {
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content
      );

      nav("/", { replace: true });
    }
  };

  return (
    <div>
      <div>
        <Header
          title={"일기 수정하기"}
          leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)} />}
          rightChild={
            <Button
              text={"삭제하기"}
              type={"NEGATIVE"}
              onClick={onClickDelete}
            />
          }
        />
        <Editor initData={curDiaryItem} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default Edit;
