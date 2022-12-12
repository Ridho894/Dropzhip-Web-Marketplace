
/**
 * Format number to thousand separator
 *
 * exammple:
 * 1200000 => 1.200.000
 *
 * @param num number
 * @param separator string (optional) default is '.'
 * @returns
 */
export const thousandFormat = (num: number, separator: string = '.') => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

/**
 * TODO: fix, example value 10.181 but will shown as 10.2k
 *
 * To add subfix number thousand, million, billion, and etc
 * stolen from https://stackoverflow.com/a/9462382/14063413 but modified to work with number
 *
 * @example
 * 1000 -> 1k
 * 1200 -> 1.1k
 * 2000000 -> 2M
 * 2500000 -> 2.5M
 *
 * @param num number to format
 * @param digits precicion of the number
 * @returns string with the number formatted
 */
export const nFormatter = (num: number, digits: number | null = null) => {
  const lookup = [
    { value: 1, symbol: "", digits: 1 },
    { value: 1e3, symbol: "k", digits: 1 }, // thousand
    { value: 1e6, symbol: "M", digits: 2 }, // million
    { value: 1e9, symbol: "B", digits: 2 }, // billion
    { value: 1e12, symbol: "T", digits: 2 }, // trillion
    { value: 1e15, symbol: "P", digits: 2 }, // quadrillion
    { value: 1e18, symbol: "E", digits: 2 } // quintillion
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function (item) {
    return num >= item.value;
  });

  return item ? (num / item.value).toFixed(digits || item.digits).replace(rx, "$1") + item.symbol : "0";
}
