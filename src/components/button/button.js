import React from 'react';

import styles from './button.module.scss';

import { linearGradient } from '../../util';

const Button = ({ color, href, style, children, ...props }) => (
  <a
    className={styles.button}
    href={href}
    role="button"
    style={{
      borderColor: color,
      color,
      backgroundImage: linearGradient("90deg", color, color + " 49%", "transparent 50%"),
      ...style
    }}
    {...props}
  >
    {children}
  </a>
);

export default Button;
