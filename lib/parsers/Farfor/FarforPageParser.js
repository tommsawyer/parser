const PageParser  = require('../PageParser');
const Item        = require('../Item');
const COLLECTIONS = require('../../helpers/db').collections;
const FARFOR_SITE = 'http://ivanovo.farfor.ru';
const WEIGHT_REG_EXP = /(\d+) гр/;
const VENDOR_NAME = 'Фарфор';

class FarforPageParser extends PageParser {

  getCommonConfig(element) {
    return {
      details: [element.find('.products').text().trim()],
      image: FARFOR_SITE + element.find('.product__img').attr('src'),
      href: FARFOR_SITE + element.find('a.crumb.productlink').attr('href'),
      vendor: VENDOR_NAME,
      type: this.type
    }
  }

  parsePizzaElement(element, config) {
    let smallWeight = element.find('.topLeftLit .left div.weight span.weight');
    let bigWeight = element.find('.topLeftLit .left div.weight');
    let prices = element.find('.topLeftLit .left .price');

    let smallItemConfig = Object.assign({}, config, {
      name: config.name + " (маленькая)",
      weight: parseFloat(WEIGHT_REG_EXP.exec((smallWeight.text()))[1]),
      price: parseFloat(this.$(prices[0]).text())
    });

    let bigItemConfig = Object.assign({}, config, {
      name: config.name + " (большая)",
      weight: parseFloat(WEIGHT_REG_EXP.exec(this.$(bigWeight[1]).text())[1]),
      price: parseFloat(this.$(prices[1]).text())
    });

    return [new Item(bigItemConfig), new Item(smallItemConfig)];
  }

  parseElement(element, config) {
    let itemConfig = Object.assign({}, config, {
      name: element.find('.title a').text().trim(),
      price: parseFloat(element.find('.topLeft .price').text()),
      weight: parseFloat(WEIGHT_REG_EXP.exec(element.find('.weight').text())[1])
    });

    return new Item(itemConfig);
  }

  parsePage(body) {
    let items = [];
    let self = this;

    self.$('.b-productList2 .item').each(function (index, element) {
      let wrappedElement = self.$(element);
      let commonConfig = self.getCommonConfig(wrappedElement);
      if (self.type === COLLECTIONS.PIZZA) {
        items = items.concat(self.parsePizzaElement(wrappedElement, commonConfig));
      } else {
        items = items.concat(self.parseElement(wrappedElement, commonConfig));
      }
    });

    return items;
  }
}

module.exports = FarforPageParser;
