class Pizza {
  constructor(config) {
    this.name    = config.name;
    this.weight  = config.weight;
    this.price   = config.price;
    this.details = config.details;
    this.image   = config.image;
    this.href    = config.href;
    this.vendor  = config.vendor;
  }
}

module.exports = Pizza;
