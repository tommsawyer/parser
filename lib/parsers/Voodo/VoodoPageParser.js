const PageParser = require('../PageParser');
const Item = require('../Item');
const COLLECTIONS = require('../../helpers/db').collections;
const VOODO_SITE = 'http://voodoo-pizza.ru';
const VENDOR_NAME = "Voodoo-pizza";

//TODO need to be refactored

class VoodooPageParser extends PageParser {
  getCommonConfig(element) {
    return {
      name: element.find('h3 a').text().trim(),
      image: element.find('span.field-content img').attr('src'),
      href: VOODO_SITE + element.find('span.field-content a').attr('href'),
      vendor: VENDOR_NAME,
      type: this.type
    }
  }

  parsePizzaElement(element, config) {
    let props = element.find('label.option');
    let smallSize = parseFloat(this.$(props[0]).text().split('=')[0].slice(1));
    let smallPrice = parseFloat(this.$(props[0]).text().split('=')[1]);

    let bigSize = parseFloat(this.$(props[1]).text().split('=')[0].slice(1));
    let bigPrice = parseFloat(this.$(props[1]).text().split('=')[1]);

    config.details = this.parsePizzaDetails(element);

    let bigItemConfig = Object.assign({}, config, {
      name: config.name + ' (большая)',
      price: bigPrice,
      diameter: bigSize
    });

    let smallItemConfig = Object.assign({}, config, {
      name: config.name + ' (маленькая)',
      price: smallPrice,
      diameter: smallSize
    });

    return [new Item(smallItemConfig), new Item(bigItemConfig)];
  }

  parseElement(element, config) {
    const WEIGHT_REG_EXP = /([\d,]+)\s*(г|л|мл)/;
    let parsedWeight = WEIGHT_REG_EXP.exec(element.find("#child p").text());

    let itemConfig = Object.assign({}, config, {
      price: parseFloat(element.find('.uc-price').text().replace(/[,.]*/g,'').trim()),
      weight: parsedWeight ? parseFloat(parsedWeight[1].replace(',','.')): null,
      details: this.parseDetails(element)
    });

    return new Item(itemConfig);
  }

  parseDetails(element) {
    let details = element.find("#child p").text();

    if (this.type === COLLECTIONS.SNAKES || this.type === COLLECTIONS.DRINKS) {
      return details;
    }

    details = details.split(',');
    let DETAILS_REG_EXP = /\(\d+.*\)(.*)/g;
    if (details.length === 1) {
      return details;
    }

    details[0] = DETAILS_REG_EXP.exec(details[0])[1];
    return details.map((detail) => detail.trim());
  }

  parsePizzaDetails(element) {
    let details = [];
    let detailsDescription;

    let detailsTitle = element.find("#child p strong").text();

    if (detailsTitle) {
      detailsDescription = element.find("#child p").text().replace(/[()]/g, '');
      details = detailsDescription.split('\n')[1].split(',');
      return details.map((detail) => detail.trim());
    }

    detailsDescription = element.find("#child p").text();
    const PIIZA_DETAILS_REG_EXP = /\(.*?\)/g;
    details = PIIZA_DETAILS_REG_EXP.exec(detailsDescription).slice(-1)[0].replace(/[()]/g, '').split(',');
    return details.map((detail) => detail.trim());
  }

  parsePage() {
    let items = [];
    let self = this;

    self.$('.region.region-content table td').each(function (index, element) {
      let wrappedElement = self.$(element);
      let commonConfig = self.getCommonConfig(wrappedElement);

      if (commonConfig.name) {
        if (self.type === COLLECTIONS.PIZZA) {
          items = items.concat(self.parsePizzaElement(wrappedElement, commonConfig));
        } else {
          items = items.concat(self.parseElement(wrappedElement, commonConfig));
        }
      }
    });

    return items;
  }
}

module.exports = VoodooPageParser;