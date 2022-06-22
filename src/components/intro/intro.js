import React from 'react';
import { useSelector } from 'react-redux';

import styles from './intro.module.scss';

import { introStatus as introStatusEnum } from '../util';

import Bars from '../bars/bars';

const Intro = () => {
  const willDisappear = useSelector(({ introStatus }) => introStatus >= introStatusEnum.willDisappear);
  const colorPalette = useSelector(({ colorPalettes }) => colorPalettes[colorPalettes.length - 1]);

  return (
    <div className={styles.container + (willDisappear ? " " + styles.willDisappear : "")}>
      <div className={styles.welcomeContainer}>
        <h1 style={{color: colorPalette[0]}} className={styles.title}>Welcome</h1>
        <h2 className={styles.instructions}>
          Press <span className={styles.spacebar}>spacebar</span><br />  
          or swipe&nbsp;
          <span className={styles.upContainer}>
            <span className={styles.upAnimated1}>up</span>
            <span className={styles.upAnimated2}>up</span>
            <span className={styles.upTransparent}>up</span>
          </span>
          <br />
          to try a new color palette
        </h2>
      </div>
      <div className={styles.barsContainer}>
        <Bars />
      </div>
    </div>
  );
};

export default Intro;
