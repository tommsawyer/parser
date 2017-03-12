const SauriPageParser = require('./SauriPageParser');
const DISH_TYPES = require('../../types');
const SAURI_SITE = 'http://363636.ru/katalog/';

const types = {
  "pitstsa/": DISH_TYPES.PIZZA,
  "supy/": DISH_TYPES.SOUP,
  "rolly-slozhnye/": DISH_TYPES.ROLLS,
  "post/": DISH_TYPES.ROLLS,
  "rolly-teplye/": DISH_TYPES.ROLLS,
  "rolly-prostye/": DISH_TYPES.ROLLS,
  "rolly-ostrye/": DISH_TYPES.ROLLS,
  "rolly-prostye/": DISH_TYPES.ROLLS,
  "sandych-rolly/": DISH_TYPES.ROLLS,
  "rolly-desertnye/": DISH_TYPES.ROLLS,
  "nabory-mozaika/": DISH_TYPES.ROLLS,
  "kitayskaya-lapsha/": DISH_TYPES.NOODLES,
  "spring-rolly/": DISH_TYPES.PASTA,
  "sushi/": DISH_TYPES.SUSHI,
  "salaty/": DISH_TYPES.SALADS,
  "napitki/": DISH_TYPES.DRINKS
}

class SauriParser {

  generateParsers() {
    return Object.keys(types).map((tail) => {
      return new SauriPageParser(SAURI_SITE + tail, types[tail]);
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

module.exports = SauriParser;