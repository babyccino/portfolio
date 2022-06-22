import React, { useState } from 'react';
import { SocialIcon } from 'react-social-icons';

import styles from './icons.module.scss';

const Icon = ({ url, defaultColor, hoverColor, style }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={styles.icons}
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <SocialIcon
        bgColor='rgba(0,0,0,0)'
        fgColor={hover ? hoverColor : defaultColor}
        url={url}
      />
    </div>
  );
}
const Icons = ({ color }) => (
  <div className={styles.mainContainer}>
    <div className={styles.iconsContainer}>
      <Icon style={{animationDelay: "1.2s"}} url={"https://www.linkedin.com/in/gus-ryan-50/"} defaultColor={color} hoverColor='#0A66C2' />
      <Icon style={{animationDelay: "1.5s"}} url={"https://github.com/babyccino"} defaultColor={color} hoverColor='hsl(210, 66.7%, 90%)' />
      <Icon style={{animationDelay: "1.8s"}} url={"https://www.instagram.com/babyccino1/"} defaultColor={color} hoverColor='#e95950' />
    </div>
    <div style={{borderLeft: `1px solid ${color}`, animationDelay: "2.1s"}} className={styles.line} />
  </div>
);

export default Icons;