export default (all = [], reg) => {
  if (reg.id === undefined) {
    return all;
  }
  const regExist = all.find(item => item.id === reg.id);
  if (!regExist) {
    return all.concat([reg]);
  }
  return all.map((item) => {
    if (item.id !== reg.id) {
      return item;
    }
    return {
      ...item,
      ...reg,
    };
  });
};
