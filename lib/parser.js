const cheerio = require('cheerio');
const request = require('request');

class Parser {

  constructor(url, type) {
    this.url = url;
    this.type = type;
  }

  parse() {
    let self = this;

    return new Promise(function (resolve, reject) {
      request(self.url, function (err, res, body) {
        if (err)
          return reject(err);

        self.$ = cheerio.load(body);
        resolve(self.parsePage(body));
      });
    });
  }

  parsePage(body) {
    throw new Error('parsePage is not defined!');
  }

  static get url() {
    throw new Error('URL is not defined!');
  }
}

module.exports = Parser;
