import { useState, useEffect } from "react";

const SCROLL_THRESHOLD = 10;

const useIsScrollingUp = initialState => {
  const [scrollUp, setScrollUp] = useState(initialState);
  
  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY < lastScrollY;
      
      if (Math.abs(scrollY - lastScrollY) > SCROLL_THRESHOLD) {
        if (direction !== scrollUp) {
          setScrollUp(direction);
        }
        lastScrollY = scrollY > 0 ? scrollY : 0;
      }
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection); // clean up
  }, [scrollUp]);

  return scrollUp;
}

export default useIsScrollingUp;