import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import useCustomDispatch from '../../hooks/customDispatch';

import { useSwipeable } from 'react-swipeable';

import styles from './bars.module.scss';

import { introStatus as introStatusEnum, multipleClasses } from '../../util';

const Bars = () => {
  const dispatch = useCustomDispatch();

  const colorPalettes = useSelector(state => state.colorPalettes);
  
  const currentlyAnimating = useRef({currentlyAnimating: true, timeout: null, promise: null});
  let introStatus = useSelector(({ introStatus }) => {
    switch (introStatus) {
    case introStatusEnum.requestUnmount:
      if (currentlyAnimating.current.currentlyAnimating) {
        currentlyAnimating.current.promise.then(() => dispatch.willDisappear());
        return introStatusEnum.visible;
      }
      
      dispatch.willDisappear();
      return introStatusEnum.willDisappear;
    case introStatusEnum.visible:
    case introStatusEnum.willDisappear:
    case introStatusEnum.notVisible:
    default:
      return introStatus;
    }
  });

  const firstAngle = -21;
  const firstBarDuration = 1 * 1000;
  const animationTime = firstBarDuration * (2 * (-firstAngle)/(firstAngle + 90) + 1);

  if (introStatus === introStatusEnum.willDisappear) 
    setTimeout(() => dispatch.notVisible(), animationTime);

  useEffect(() => {
    const i = colorPalettes.length - 1;

    clearTimeout(currentlyAnimating.current.timeout);
    currentlyAnimating.current.currentlyAnimating = true;

    currentlyAnimating.current.promise = new Promise(res => {
      currentlyAnimating.current.timeout = setTimeout(() => {
        currentlyAnimating.current.currentlyAnimating = false;

        res();
      }, animationTime);
    })
  }, [colorPalettes]);

  useEffect(() => {
    const onKeyDown = ({ code }) => {
      if (code === "Space" && introStatus === introStatusEnum.visible) 
        currentlyAnimating.current.promise.then(() => dispatch.newColorPalette());        
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const handlers = useSwipeable({
    onSwipedRight: () => dispatch.newColorPalette(),
    swipeDuration: 1500,
  });

  const len = colorPalettes.length;
  return (
    <div className={styles.container} {...handlers} >
      {colorPalettes[len - 1].map((color, ii) => (
        <div
          key={"" + len + " " + ii}
          className={multipleClasses(styles[introStatus < introStatusEnum.willDisappear ? `swipeIn${ii}` : `swipeOut${ii}`], styles.bar)}
          style={{backgroundColor: color}}
        />
      ))}
      {len <= 1 ? null :
        colorPalettes[len - 2].map((color, ii) => (
          <div
            key={"" + len + " " + ii}
            className={multipleClasses(styles[`swipeOut${ii}`], styles.bar)}
            style={{backgroundColor: color}}
          />
        ))
      }
    </div>
  );
};

export default React.memo(Bars);
