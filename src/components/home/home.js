import React, { useEffect, useRef, Suspense } from 'react';
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
  const removeEventListener = useRef(null);

  if (!isIntroVisible && removeEventListener.current) {
    removeEventListener.current();
  }
  
  useEffect(() => {
    const onKeyDown = ({ code }) => { if (code === "Enter") dispatch.requestUnmount(); }

    document.addEventListener("keydown", onKeyDown);
    removeEventListener.current = () => document.removeEventListener("keydown", onKeyDown);
    return removeEventListener.current;
  }, []);

  return (
    <div className={styles.container}>

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
