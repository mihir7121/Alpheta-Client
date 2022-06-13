export function formatNumber(num, digits = 2) {
  num = parseFloat(num)
  if (num < 1) {
    return num.toFixed(4)
  }
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

export function shortenAddress(address) {
  let result = ''
  result += address.substring(0, 4)
  result += '....'
  result += address.substring(address.length - 4, address.length)
  return result
}

export function formatScore(score) {
  return Math.round((score + Number.EPSILON) * 100) / 100
}