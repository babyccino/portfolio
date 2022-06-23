import React, {  } from 'react';
import { Link } from "react-scroll";

import useIsScrollingUp from '../../hooks/scrollUp';
import useIsTopOfPage from '../../hooks/topOfPage';
import { multipleClasses } from '../util';

import styles from './header.module.scss'

const Logo = ({ color1, color2 }) => (
  <svg style={{fill: "url(#MyGradient)"}} viewBox="0 0 400 400" width="auto" height="auto" >
    <polygon strokeWidth="0" points="0,0 400,0 400,100 100,100 100,300 300,300 300,200 400,200 400,400 0,400" />
    <linearGradient gradientTransform="rotate(45)" id="MyGradient">
      <stop offset="0%" stopColor={color1} />
      <stop offset="100%" stopColor={color2} />
    </linearGradient>
    Sorry, your browser does not support inline SVG.
  </svg>
);

const Header = ({ color1, color2 }) => {
  const scrollUp = useIsScrollingUp(true);
  const topOfPage = useIsTopOfPage(true);

  return (
    <div
      style={{color: color1}}
      className={multipleClasses(styles.mainContainer, scrollUp ? undefined : styles.scrollUp, topOfPage ? undefined : styles.topOfPage)}
    >
      <div className={styles.contentContainer}>
        <div className={styles.logo}><Logo color1={color1} color2={color2} /></div>
        <nav className={styles.sections}>
          <Link to="about" smooth offset={-56} style={{borderColor: color1}}>About</Link>
          <Link to="projects" smooth offset={-56} style={{borderColor: color1}}>Projects</Link>
          <Link to="contact" smooth offset={-56} style={{borderColor: color1}}>Contact</Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;