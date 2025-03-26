export default class AppHelper {
  static isServer() {
    return typeof window === "undefined";
  }

  static sliceContent(str, len = 25) {
    return str && str.length > len ? str.slice(0, len) + "..." : str;
  }

  static hashEmail(email) {
    const atIndex = email.indexOf("@");
    const username = email.substring(0, atIndex);
    const domain = email.substring(atIndex + 1);

    const hashedUsername = username.substring(0, 3) + "...";
    const hashedEmail = hashedUsername + "@" + domain;

    return hashedEmail;
  }

  static sliceName(name) {
    if (!name) {
      return "";
    }
    const nameArray = name.split(" ");
    return nameArray[0][0] + "." + nameArray[1];
  }

  static formatDate(date) {
    const getYear = date.getFullYear();

    const getMonth = date.getMonth() + 1;

    const getDay = date.getDate();

    return `${getYear}-${getMonth > 9 ? getMonth : `0${getMonth}`}-${
      getDay > 9 ? getDay : `0${getDay}`
    }`;
  }

  static handleNumberFractions(number) {
    return Number(number).toLocaleString(undefined, {
      minimumIntegerDigits: 1,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
