import React, { useEffect, useRef, Suspense } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

import styles from './home.module.scss';

import Intro from '../intro/intro';
const Header = dynamic(() => import('../header/header'));
const Content = dynamic(() => import('../content/content'));

import useCustomDispatch from '../../hooks/customDispatch';

import { introStatus as introStatusEnum } from '../../util';

const Home = () => {
  const isIntroVisible = useSelector(({ introStatus }) => (introStatus !== introStatusEnum.notVisible));
  const dispatch = useCustomDispatch();
  const eventListeners = useRef([]);

  const removeListeners = () => {
    for (const listener of eventListeners.current) {
      document.removeEventListener("keydown", listener);
    }
  }

  if (!isIntroVisible) {
    removeListeners();
  }
  
  useEffect(() => {
    // React strict mode renders the component twice. This makes sures the listeners aren't instantiated twice
    removeListeners();

    const onKeyDown = ({ code }) => {
      switch (code) {
      case "Space": return dispatch.newColorPalette();
      case "Enter": return dispatch.requestUnmount();
      }
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
        <link rel="icon" href="/icon.png" />
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;700&display=swap" rel="stylesheet" />
      </Head>

      { isIntroVisible ?
        <Intro /> :
        <Suspense>
          <Header />
          <Content />
        </Suspense>
      }

    </div>
  );
}

export default Home;
