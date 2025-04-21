import { useState } from 'react';

// Hook chuyển đổi USD sang VND
const useCurrencyConverter = (initialAmount, exchangeRate) => {
  const [amountInVND, setAmountInVND] = useState(null);

  const convertToVND = () => {
    setAmountInVND(initialAmount * exchangeRate);
  };

  return {
    amountInVND,
    convertToVND
  };
};

export default useCurrencyConverter;
