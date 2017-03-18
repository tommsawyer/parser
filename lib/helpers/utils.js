const ProgressBar = require('progress');

module.exports = {
  flattenFirstLevel: function(arr) {
    return arr.reduce((newArray, element) => {
      return newArray.concat(element);
    }, []);
  },

  createProgressBar: function(total) {
    return new ProgressBar('[:bar] :percent', {
      width: 50,
      total: total
    });
  },
};
