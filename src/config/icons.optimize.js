const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const SVGO = require('svgo');

const svgo = new SVGO({});

// Get the icon name
const getName = filepath => path.basename(filepath, path.extname(filepath));

// Build the optimized SVG data
const svgOptimize = (globPattern, callback) => {
  const dataList = [];
  const filepaths = glob.sync(globPattern);
  filepaths.forEach((filepath) => {
    const name = getName(filepath);
    fs.readFile(filepath, 'utf8', (err, fileData) => {
      if (err) {
        throw err;
      }
      // eslint-disable-next-line no-console
      console.log(`Optimizing icon: "${name}"`);
      svgo.optimize(fileData, {
        path: filepath,
      }).then((result) => {
        dataList.push({
          metadata: Object.assign(result.info, {
            name: name.replace(/\s+/g, '-').toLowerCase(),
          }),
          source: result.data,
        });
        if (dataList.length === filepaths.length) {
          callback(dataList);
        }
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
    });
  });
};

module.exports = svgOptimize;
