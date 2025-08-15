export const toUrlSafeBase64 = (str: string) => {
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

export const fromUrlSafeBase64 = (str: string) => {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) {
    str += "=";
  }
  return str;
};
