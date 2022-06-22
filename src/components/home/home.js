import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';

import styles from './home.module.scss';

import Icons from '../icons';
import Header from '../header/header';
import Intro from '../intro/intro';

import { introStatus as introStatusEnum } from '../util';
import Content from '../content/content';

const Home = () => {
  const isIntroVisible = useSelector(({ introStatus }) => (introStatus !== introStatusEnum.notVisible));
  const colorPalette = useSelector(({ colorPalettes }) => colorPalettes[colorPalettes.length - 1]);
  const eventListeners = useRef([]);

  const removeListeners = () => {
    for (const listener of eventListeners.current) {
      document.removeEventListener("keydown", listener);
    }
  }

  if (!isIntroVisible) {
    removeListeners();
  }
  
  const dispatch = useDispatch();
  useEffect(() => {
    // React strict mode renders the component twice. This makes sures the listeners aren't instantiated twice
    removeListeners();

    const onKeyDown = ({ code }) => {
      if (code === "Space") dispatch({type: "newColorPalette"});
      if (code === "Enter") dispatch({type: "setIntroStatus", payload: introStatusEnum.requestUnmount});
    };
    document.addEventListener("keydown", onKeyDown);
    eventListeners.current.push(onKeyDown);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Gus Ryan</title>
        <meta name="description" content="Gus Ryan" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      { isIntroVisible ?
        <Intro /> :
        <>
          <Header color1={colorPalette[0]} color2={colorPalette[1]} />
          <Icons color={colorPalette[0]} />
          <Content />
        </>
      }

    </div>
  );
}

export default Home;
