const generateForexPrice = (fxPair, initialAsk, initialBid) => {
  const priceObject = {
    pair: fxPair,
    ask: (initialAsk + Math.random()).toFixed(6),
    bid: (initialBid + Math.random()).toFixed(6),
    timestamp: new Date(),
  };

  return priceObject;
};

export default generateForexPrice;
