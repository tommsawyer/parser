const utils = require('../helpers/utils');

class SiteParser {
  run(onProgress) {
    let parsers = this.generateParsers();

    let parseActions = parsers.map(parser => parser.parse());

    parseActions.forEach(parsePromise => {
      parsePromise.then(() => onProgress());
    });

    return Promise.all(parseActions)
      .then(items => utils.flattenFirstLevel(items));
  }
}

module.exports = SiteParser;
