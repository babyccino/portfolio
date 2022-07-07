import React, { } from 'react';
import { useSelector } from 'react-redux';

import useCustomDispatch from '../../hooks/customDispatch';

import styles from './intro.module.scss';

import { introStatus as introStatusEnum } from '../../util';

import Bars from '../bars/bars';
import Button from '../button/button';

const Right = () => (
  <span className={styles.rightContainer}>
    <span className={styles.rightAnimated1}>right</span>
    <span className={styles.rightAnimated2}>right</span>
    <span className={styles.rightTransparent}>right</span>
  </span>
);

const Intro = () => {
  const willDisappear = useSelector(({ introStatus }) => introStatus >= introStatusEnum.willDisappear);
  const colorPalette = useSelector(({ colorPalettes }) => colorPalettes[colorPalettes.length - 1]);

  const { requestUnmount } = useCustomDispatch();

  return (
    <div className={styles.container + (willDisappear ? " " + styles.willDisappear : "")}>
      <div className={styles.welcomeContainer}>
        <h1 style={{color: colorPalette[0]}} className={styles.title}>Welcome</h1>
        <h2 className={styles.instructions}>
          Don&apos;t like the color palette? Then neither do I! <br />
          Press&nbsp;
          <span style={{color: colorPalette[1]}} className={styles.spacebar}>spacebar</span>
          &nbsp;or&nbsp;
          <span style={{color: colorPalette[1]}}>swipe&nbsp;<Right /></span>
          &nbsp;to change it
        </h2>
        <div className={styles.button}>
          <Button color={colorPalette[1]} onClick={requestUnmount}>Come and learn about me!</Button>
        </div>
      </div>
      <div className={styles.barsContainer}>
        <Bars />
      </div>
    </div>
  );
};

export default Intro;
