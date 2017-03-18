const SiteParser      = require('../SiteParser');
const SauriPageParser = require('./SauriPageParser');
const COLLECTIONS     = require('../../helpers/db').collections;
const SAURI_SITE      = 'http://363636.ru/katalog/';

const types = {
  "pitstsa/"           : COLLECTIONS.PIZZA,
  "supy/"              : COLLECTIONS.SOUP,
  "rolly-slozhnye/"    : COLLECTIONS.ROLLS,
  "post/"              : COLLECTIONS.ROLLS,
  "rolly-teplye/"      : COLLECTIONS.ROLLS,
  "rolly-prostye/"     : COLLECTIONS.ROLLS,
  "rolly-ostrye/"      : COLLECTIONS.ROLLS,
  "rolly-prostye/"     : COLLECTIONS.ROLLS,
  "sandych-rolly/"     : COLLECTIONS.ROLLS,
  "rolly-desertnye/"   : COLLECTIONS.ROLLS,
  "nabory-mozaika/"    : COLLECTIONS.ROLLS,
  "kitayskaya-lapsha/" : COLLECTIONS.NOODLES,
  "spring-rolly/"      : COLLECTIONS.PASTA,
  "sushi/"             : COLLECTIONS.SUSHI,
  "salaty/"            : COLLECTIONS.SALADS,
  "napitki/"           : COLLECTIONS.DRINKS
}

class SauriParser extends SiteParser {
  generateParsers() {
    return Object.keys(types).map((tail) => {
      return new SauriPageParser(SAURI_SITE + tail, types[tail]);
    })
  }

  getPageCount() {
    return Object.keys(types).length;
  }
}

module.exports = SauriParser;
