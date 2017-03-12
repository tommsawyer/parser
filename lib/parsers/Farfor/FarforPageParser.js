const Parser = require('../../parser');
const Item = require('../../item');
const DISH_TYPES = require('../../types');
const FARFOR_SITE = 'http://ivanovo.farfor.ru';

//TODO: need to be refactored

class FarforPageParser extends Parser {

  parseElement(element) {
    let weightRegExp = /(\d+) гр/;

    let commonConfig = {
      name: element.find('.title a').text().trim(),
      price: parseInt(element.find('.topLeft .price').text()),
      weight: parseInt(weightRegExp.exec(element.find('.weight').text())[1]),
      details: [element.find('.products').text().trim()],
      image: FARFOR_SITE + element.find('.product__img').attr('src'),
      href: FARFOR_SITE + element.find('a.crumb.productlink').attr('href'),
      vendor: 'Фарфор',
      type: this.type
    }


    if (this.type === DISH_TYPES.PIZZA) {
      let smallWeight = element.find('.topLeftLit .left div.weight span.weight');
      let bigWeight = element.find('.topLeftLit .left div.weight');

      let prices = element.find('.topLeftLit .left .price');

      let smallItemConfig = Object.assign({}, commonConfig, {
        name: commonConfig.name + " (маленькая)",
        weight: parseInt(weightRegExp.exec((smallWeight.text()))[1]),
        price: parseInt(this.$(prices[0]).text())
      });

      let bigItemConfig = Object.assign({}, commonConfig, {
        name: commonConfig.name + " (большая)",
        weight: parseInt(weightRegExp.exec(this.$(bigWeight[1]).text())[1]),
        price: parseInt(this.$(prices[1]).text())
      });

      return [new Item(bigItemConfig), new Item(smallItemConfig)];
    }

    return new Item(commonConfig);
  }

  parsePage(body) {
    let items = [];
    let self = this;

    self.$('.b-productList2 .item').each(function (index, element) {
      items = items.concat(self.parseElement(self.$(element)));
    });

    return items;
  }
}

module.exports = FarforPageParser;
