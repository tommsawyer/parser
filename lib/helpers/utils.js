module.exports = {
  flattenFirstLevel: function(arr) {
    return arr.reduce((newArray, element) => {
      return newArray.concat(element);
    }, []);
  },
};
