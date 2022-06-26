import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import useCustomDispatch from '../../hooks/customDispatch';

import { useSwipeable } from 'react-swipeable';

import styles from './bars.module.scss';

import { introStatus as introStatusEnum } from '../../util';

const Bars = () => {
  const dispatch = useCustomDispatch();

  const colorPalettes = useSelector(state => state.colorPalettes);
  const dontRenderBefore = useRef(0);
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

  if (introStatus === introStatusEnum.willDisappear) 
    setTimeout(() => dispatch.notVisible(), 1000);

  useEffect(() => {
    const i = colorPalettes.length - 1;
    setTimeout(() => dontRenderBefore.current = i, 1000);

    clearTimeout(currentlyAnimating.current.timeout);
    currentlyAnimating.current.currentlyAnimating = true;

    currentlyAnimating.current.promise = new Promise(res => {
      currentlyAnimating.current.timeout = setTimeout(() => {
        currentlyAnimating.current.currentlyAnimating = false;

        res();
      }, 1000);
    })
  }, [colorPalettes]);

  const config = { swipeDuration: 1500 };
  const handlers = useSwipeable({
    onSwipedUp: () => dispatch.newColorPalette(),
    ...config,
  });
  
  const regularRender = useCallback(() => colorPalettes.map((palette, i) => {
    if (i < dontRenderBefore.current) return null;

    let style = styles.barContainer;
    if (introStatus === introStatusEnum.willDisappear || introStatus === introStatusEnum.notVisible) {
      style += (" " + styles.disappear)
    }
    return (
      <div key={i} className={styles.container} {...handlers}>
        {palette.map((color, ii) => (
          <div key={i*100 + ii} style={{animationDelay: (color.charCodeAt(2) % 12 + 1)*0.03 + "s"}} className={style}>
            {/* <code className={styles.barHeader}>{color.toUpperCase()}</code> */}
            <div style={{backgroundColor: color}} className={styles.barColor}></div>
          </div>
        ))}
      </div>
    );
  }));

  return regularRender();
};

export default React.memo(Bars);