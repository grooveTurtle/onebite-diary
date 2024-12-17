import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    const $title = document.getElementsByTagName("title")[0]; // 관례상 DOM 요소가 저장되기 때문에
    $title.innerText = title;
  }, [title]);
};

export default usePageTitle;
