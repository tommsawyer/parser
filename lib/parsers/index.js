const SauriParser = require('./Sauri/SauriParser');
const FarforParser = require('./Farfor/FarforParser');
const VoodoParser = require('./Voodo/VoodoParser');

module.exports = [
  new SauriParser(),
  new FarforParser(),
  new VoodoParser()
];
