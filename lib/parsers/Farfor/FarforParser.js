const SiteParser       = require('../SiteParser');
const FarforPageParser = require('./FarforPageParser');
const COLLECTIONS      = require('../../helpers/db').collections;
const FARFOR_SITE      = 'http://ivanovo.farfor.ru/';

const types = {
  "pizza/"          : COLLECTIONS.PIZZA,
  "filter/premium/" : COLLECTIONS.SUSHI,
  "japan/sety/"     : COLLECTIONS.SUSHI,
  "japan/sushi/"    : COLLECTIONS.SUSHI,
  "lapsha/"         : COLLECTIONS.NOODLES,
  "japan/rolly/"    : COLLECTIONS.ROLLS,
  "japan/supy/"     : COLLECTIONS.SOUP,
  "dobawky/"        : COLLECTIONS.SAUCES,
  "salaty/"         : COLLECTIONS.SALADS,
  "zakuski/"        : COLLECTIONS.SNAKES,
  "dessert/"        : COLLECTIONS.DESSERTS,
  "napitki/"        : COLLECTIONS.DRINKS
}

class FarforParser extends SiteParser {
  generateParsers() {
    return Object.keys(types).map((tail) => {
      return new FarforPageParser(FARFOR_SITE + tail, types[tail]);
    })
  }
}

module.exports = FarforParser;
