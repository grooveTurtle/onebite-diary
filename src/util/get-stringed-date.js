// 날짜 -> yyyy-mm-dd 로 반환하기
export const getStringedDate = (targetDate) => {
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  month = month < 10 ? `0${month}` : month;

  return `${year}-${month}-${date}`;
};