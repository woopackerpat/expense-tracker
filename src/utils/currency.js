function formatThaiCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "THB",
    currencyDisplay: "symbol",
  }).format(value);
}

export {formatThaiCurrency}
