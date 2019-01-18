const sortByEmail = (list) => {
  if (list && list.length) {
    list.sort((a, b) => {
      let compareResult = 0;
      if (a.email < b.email) {
        compareResult = -1;
      } else if (a.email > b.email) {
        compareResult = 1;
      }
      return compareResult;
    });
  }
  return list;
};

export default sortByEmail;
