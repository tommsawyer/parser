const Parser = require('../parser');
const Items = require('../items');
const SAURI_SITE = 'http://363636.ru';

class SauriParser extends Parser {
  parseElement(element) {
    let pizzaConfig = {
      name    : element.find('.description h3 a').text(),
      weight  : parseInt(element.find('.description .weight').text()),
      price   : parseInt(element.find('.price').text()),
      details : element.find('p:not([class])').text().slice(8).replace('.', '').split(', '),
      image   : SAURI_SITE + element.find('.pic img').attr('src'),
      href    : SAURI_SITE + element.find('.pic a').attr('href'),
      vendor  : 'Саюри'
    }

    return new Items.Pizza(pizzaConfig);
  }
  
  parsePage(body) {
    let pizzas = [];
    let self = this;

    self.$('.product_list li').each(function(index, element) {
      pizzas.push(self.parseElement(self.$(element)));
    });

    return pizzas;
  }

  static get url() {
    return SAURI_SITE + '/katalog/pitstsa/'
  }
}

module.exports = SauriParser;
