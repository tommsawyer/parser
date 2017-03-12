const FarforPageParser = require('./FarforPageParser');
const DISH_TYPES = require('../../types');
const FARFOR_SITE = 'http://ivanovo.farfor.ru/';

const types = {
  "pizza/": DISH_TYPES.PIZZA,
  "filter/premium/": DISH_TYPES.SUSHI,
  "lapsha/": DISH_TYPES.NOODLES,
  "japan/sety/": DISH_TYPES.SUSHI,
  "japan/rolly/": DISH_TYPES.ROLLS,
  "japan/sushi/": DISH_TYPES.SUSHI,
  "japan/supy/": DISH_TYPES.SOUP,
  "dobawky/": DISH_TYPES.SAUCES,
  "salaty/": DISH_TYPES.SALADS,
  "zakuski/": DISH_TYPES.SNAKES,
  "dessert/": DISH_TYPES.DESSERTS,
  "napitki/": DISH_TYPES.DRINKS
}

class FarforParser {

  generateParsers() {
    return Object.keys(types).map((tail) => {
      return new FarforPageParser(FARFOR_SITE + tail, types[tail]);
    })
  }

  run() {
    let parsers = this.generateParsers();
    let parseActions = parsers.map((parser) => {
      return parser.parse();
    });

    return Promise.all(parseActions).then((items) => {
      return items.reduce((items, suit) => {
        return items.concat(suit);
      }, []);
    });
  }
}

module.exports = FarforParser;