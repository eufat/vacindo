const dummy = require("./dummy.json");
const fs = require("fs");

const shortid = require('shortid');
const Hashids = require('hashids');

const output = {};

function generateHash() {
    const hashids = new Hashids(shortid.generate(), 8);
    const hash = hashids.encode(1);

    return hash;
}

for (let item of dummy.data) {
    const id = generateHash();
    output[id] = item;
}

const json = JSON.stringify(output);
fs.writeFile("destinationsData.json", json, "utf8", () => {
    console.log("done.");
});
