const SauriParser = require('./Sauri/SauriParser');
const FarforParser = require('./Farfor/FarforParser');

module.exports = [
  new SauriParser(),
  new FarforParser()
];
