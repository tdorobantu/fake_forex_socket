const generateDepositPrice = (currency, initialMaturity) => {
  const priceObject = {
    currency: currency,
    maturity: (initialMaturity + Math.random()).toFixed(2),
    timestamp: new Date(),
  };

  return priceObject;
};

export default generateDepositPrice;
