class Item {
  constructor(config) {
    this.name = config.name;
    this.weight = config.weight;
    this.price = config.price;
    this.details = config.details;
    this.image = config.image;
    this.diameter = config.diameter;
    this.href = config.href;
    this.vendor = config.vendor;
    this.type = config.type;
  }
}

module.exports = Item;