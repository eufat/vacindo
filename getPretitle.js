const dummy = require("./dummy.json");
const fs = require("fs");

const output = {
    data: []
};

const pretitleSet = new Set();

for (let item of dummy.data) {
    pretitleSet.add(item.preTitle);
}

for (let item of pretitleSet) {
    output.data.push(item);
}

const json = JSON.stringify(output);
fs.writeFile("destinationTypes.json", json, "utf8", () => {
    console.log("done.");
});
