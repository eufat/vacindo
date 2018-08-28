const dummy = require('./dummy.json');
const fs = require('fs');

const output = {
  data: [],
};

const pretitleSet = new Set();

for (const item of dummy.data) {
  pretitleSet.add(item.preTitle);
}

for (const item of pretitleSet) {
  output.data.push({
    name: item,
    imageURL: '',
  });
}

const json = JSON.stringify(output);
fs.writeFile('destinationCategory.json', json, 'utf8', () => {
  console.log('done.');
});
