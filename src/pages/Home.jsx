import React from "react";
import Header from "../../../section12/src/components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";

const getMonthlyData = (pivorDate, data) => {
  const beginTime = new Date(
    pivorDate.getFullYear(),
    pivorDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();
  const endTime = new Date(
    pivorDate.getFullYear(),
    pivorDate.getMonth() + 1,
    0, // 다음 달의 0일, 즉 이번 달의 마지막 날
    23,
    59,
    59
  ).getTime();
  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime
  );
};
const Home = () => {
  const data = useContext(DiaryStateContext);
  const [pivotData, setPivotData] = useState(new Date());
  usePageTitle(`감정 일기장`);

  const monthlyData = getMonthlyData(pivotData, data);

  const onDecreaseMonth = () => {
    setPivotData(new Date(pivotData.getFullYear(), pivotData.getMonth() - 1));
  };

  const onIncreaseMonth = () => {
    setPivotData(new Date(pivotData.getFullYear(), pivotData.getMonth() + 1));
  };

  return (
    <div>
      <Header
        title={`${pivotData.getFullYear()}년 ${pivotData.getMonth() + 1}월`}
        leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
        rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
