import React, { useEffect, useState } from 'react';
import { Link, animateScroll } from "react-scroll";
import { useSelector } from 'react-redux';

import useIsScrollingUp from '../../hooks/scrollUp';
import useIsTopOfPage from '../../hooks/topOfPage';
import { multipleClasses, linearGradient } from '../../util';

import styles from './header.module.scss'

const Header = () => {
  const scrollUp = useIsScrollingUp(true);
  const topOfPage = useIsTopOfPage(true);
  const [clickLink, setClickLink] = useState(false);
  const colorPalette = useSelector(({ colorPalettes }) => colorPalettes[colorPalettes.length - 1]);
  
  const color = colorPalette[0];

  const disableHeaderHide = () => setClickLink(true);
  useEffect(() => {
    if (clickLink) {
      const listener = () => setClickLink(false);
      document.addEventListener("keydown", listener);
      document.addEventListener("wheel", listener);
      document.addEventListener("touchmove", listener);
      return () => {
        document.removeEventListener("keydown", listener);
        document.removeEventListener("wheel", listener);
        document.removeEventListener("touchmove", listener);
      };
    }
  }, [clickLink]);

  return (
    <div
      style={{color: color}}
      className={multipleClasses(
        topOfPage ? styles.topOfPage : undefined,
        scrollUp || clickLink ? undefined : styles.scrollUp,
        styles.mainContainer
      )}
    >
      <div className={styles.contentContainer}>
        <a
          className={styles.logo}
          style={{
            backgroundImage: linearGradient("135deg", colorPalette[0], colorPalette[1]),
            animationDelay: "0.8s"
          }}
          onClick={() => animateScroll.scrollToTop()}
        >G</a>
        <nav className={styles.sections}>
          <Link
            to="about"
            smooth
            offset={-50}
            style={{
              borderColor: color,
              animationDelay: "0.9s"
            }}
            onClick={disableHeaderHide}
          >About</Link>
          <Link
            to="projects"
            smooth
            offset={-50}
            style={{
              borderColor: color,
              animationDelay: "1.0s"
            }}
            onClick={disableHeaderHide}
          >Projects</Link>
          <a
            style={{
              borderColor: color,
              animationDelay: "1.1s"
            }}
            onClick={() => {animateScroll.scrollToBottom(); disableHeaderHide();}}
          >Contact</a>
        </nav>
      </div>
    </div>
  );
};

export default Header;