const PageParser = require('../PageParser');
const Item       = require('../Item');
const SAURI_SITE = 'http://363636.ru';

class SauriPageParser extends PageParser {
  parseElement(element) {
    let config = {
      name: element.find('.description h3 a').text(),
      weight: parseInt(element.find('.description .weight').text()),
      price: parseInt(element.find('.price').text()),
      details: element.find('p:not([class])').text().slice(8).replace('.', '').split(', '),
      image: SAURI_SITE + element.find('.pic img').attr('src'),
      href: SAURI_SITE + element.find('.pic a').attr('href'),
      vendor: 'Саюри',
      type: this.type
    }

    return new Item(config);
  }

  parsePage(body) {
    let items = [];
    let self = this;

    self.$('.product_list li').each(function (index, element) {
      items.push(self.parseElement(self.$(element)));
    });

    return items;
  }
}

module.exports = SauriPageParser;
