const fs = require('fs');
const commandLineArgs = require('command-line-args');
const getDirName = require('path').dirname;
const optionDefinitions = [
  {name: "component", alias: 'c', type: String, multiple: true },
];
const { component: components } = commandLineArgs(optionDefinitions);

const writeFile = (path, contents, cb) => {
  fs.mkdir(getDirName(path), { recursive: true }, err => {
    if (err) return cb(err);

    fs.writeFile(path, contents, cb);
  });
}

for (const component of components) {
  capitalised = component.slice(0,1).toUpperCase() + component.slice(1).toLowerCase();
  lowerCase = component.toLowerCase();

  const index = 
`import ${capitalised} from './${lowerCase}';

export default ${capitalised};
`;
  const componentFile =
`import React from 'react';

import styles from './${lowerCase}.module.scss';

const ${capitalised} = () => {


  return (
    <div className={styles.container}>

    </div>
  );
};

export default ${capitalised};
`
  const sass =
`.container {

}
`

  const directory = `${__dirname}/src/components/${component}`;
  writeFile(`${directory}/index.js`, index, err => {if (err) throw err;});
  writeFile(`${directory}/${lowerCase}.js`, componentFile, err => {if (err) throw err;});
  writeFile(`${directory}/${lowerCase}.module.scss`, sass, err => {if (err) throw err;});
}