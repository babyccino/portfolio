import React from 'react';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import { linearGradient, multipleClasses } from '../util';

import styles from './contact.module.scss';

const Contact = () => {
  const options = {
    triggerOnce: true,
    rootMargin: '0px 0px',
  };
  const [inViewRef, inView] = useInView(options);
  
  const color = useSelector(({ colorPalettes }) => colorPalettes[colorPalettes.length - 1][3]);

  return (
    <section
      className={multipleClasses(styles.content, styles.contact)}
      id="contact"
    >
      <div 
        className={styles.contentInner}
        ref={inViewRef}
      >
        <div
          className={multipleClasses(styles.contentTitleContainer, styles.beforeFadeIn, inView ? styles.fadeIn : undefined)}
          style={{animationDelay: "200ms"}}
        >
          <h3 style={{color}} className={styles.contentTitle}>Always down to chat</h3>
        </div>
        <span
          style={{display: "inline-block", animationDelay: "500ms"}}
          className={multipleClasses(styles.beforeFadeIn, inView ? styles.fadeIn : undefined)}
        >
          I'm currently open to any and all opportunties
        </span>
        <div className={multipleClasses(styles.buttonContainer, styles.beforeFadeIn, inView ? styles.fadeIn : undefined)}>
          <a
            className={styles.emailButton}
            href='mailto:gus.ryan163@gmail.com'
            role="button"
            style={{
              borderColor: color,
              color,
              backgroundImage: linearGradient("90deg", color, color + " 49%", "transparent 50%")
            }}
          >
            email me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
