const sortBy = (list, property) => {
  if (list && list.length) {
    list.sort((a, b) => {
      let compareResult = 0;
      if (a[property] < b[property]) {
        compareResult = -1;
      } else if (a[property] > b[property]) {
        compareResult = 1;
      }
      return compareResult;
    });
  }
  return list;
};

export default sortBy;
