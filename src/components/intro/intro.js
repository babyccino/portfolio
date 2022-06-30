import React, { } from 'react';
import { useSelector } from 'react-redux';

import useCustomDispatch from '../../hooks/customDispatch';

import styles from './intro.module.scss';

import { introStatus as introStatusEnum } from '../../util';

import Bars from '../bars/bars';
import Button from '../button/button';

const Intro = () => {
  const willDisappear = useSelector(({ introStatus }) => introStatus >= introStatusEnum.willDisappear);
  const colorPalette = useSelector(({ colorPalettes }) => colorPalettes[colorPalettes.length - 1]);

  const { requestUnmount } = useCustomDispatch();

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
        <div>
          <Button color={colorPalette[1]} onClick={requestUnmount}>Click to enter flavour country</Button>
        </div>
      </div>
      <div className={styles.barsContainer}>
        <Bars />
      </div>
    </div>
  );
};

export default Intro;
