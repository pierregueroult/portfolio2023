const getContrastedColor = (color: string) => {
  // remove # from color if there is one
  const hex = color.replace("#", "");
  // convert hex to rgb
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  // calculate contrast
  const ratio = 0.299 * r + 0.587 * g + 0.114 * b;
  // return black or white
  return ratio > 186 ? "#000000" : "#ffffff";
};

export default getContrastedColor;
