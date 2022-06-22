import { useState, useEffect } from "react";

const useIsTopOfPage = initialState => {
  const [topOfPage, setTopOfPage] = useState(initialState);
  
  useEffect(() => {
    const updateTopOfPage = () => {
      const newTopOfPage = window.scrollY < 10
      if (topOfPage !== newTopOfPage) setTopOfPage(newTopOfPage);
    };

    window.addEventListener("scroll", updateTopOfPage);
    return () => window.removeEventListener("scroll", updateTopOfPage); // clean up
  }, [topOfPage]);

  return topOfPage;
}

export default useIsTopOfPage;