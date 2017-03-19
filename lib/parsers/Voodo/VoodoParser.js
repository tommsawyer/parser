const SiteParser       = require('../SiteParser');
const VoodoPageParser = require('./VoodoPageParser');
const COLLECTIONS      = require('../../helpers/db').collections;
const VOODO_SITE = 'http://voodoo-pizza.ru';

const types = {
  "/picca": COLLECTIONS.PIZZA,
  "/pasta": COLLECTIONS.PASTA,
  "/salaty": COLLECTIONS.SALADS,
  "/zakuski": COLLECTIONS.SNAKES,
  "/napitki": COLLECTIONS.DRINKS
}

class VoodoParser extends SiteParser {
  generateParsers() {
    return Object.keys(types).map((tail) => {
      return new VoodoPageParser(VOODO_SITE + tail, types[tail]);
    })
  }

  getPageCount() {
    return Object.keys(types).length;
  }
}

module.exports = VoodoParser;
