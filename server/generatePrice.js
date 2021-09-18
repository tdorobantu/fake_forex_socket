const generatePrice = (fxPair, initialAsk, initialBid) => {
  const priceObject = {
    pair: fxPair,
    ask: initialAsk + Math.random(),
    bid: initialBid + Math.random(),
    timestamp: new Date(),
  };

  return priceObject;
};

export default generatePrice;
