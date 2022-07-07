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
      const func = () => {setClickLink(false); console.log('hey')};
      document.addEventListener("keydown", func);
      document.addEventListener("wheel", func);
      document.addEventListener("touchmove", func);
      return () => {
        document.removeEventListener("keydown", func);
        document.removeEventListener("wheel", func);
        document.removeEventListener("touchmove", func);
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
          style={{backgroundImage: linearGradient("135deg", colorPalette[0], colorPalette[1])}}
          onClick={() => animateScroll.scrollToTop()}
        >G</a>
        <nav className={styles.sections}>
          <Link
            to="about"
            smooth
            offset={-85}
            style={{borderColor: color}}
            onClick={disableHeaderHide}
          >About</Link>
          <Link
            to="projects"
            smooth
            offset={-85}
            style={{borderColor: color}}
            onClick={disableHeaderHide}
          >Projects</Link>
          <a
            style={{borderColor: color}}
            onClick={() => {animateScroll.scrollToBottom(); disableHeaderHide();}}
          >Contact</a>
        </nav>
      </div>
    </div>
  );
};

export default Header;