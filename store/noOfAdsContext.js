import React, { createContext, useState } from "react";

export const NumberOfAdsContext = createContext();

export const NumberOfAdsProvider = ({ children }) => {
  const [numberOfAds, setNumberOfAds] = useState(0);

  return (
    <NumberOfAdsContext.Provider value={{ numberOfAds, setNumberOfAds }}>
      {children}
    </NumberOfAdsContext.Provider>
  );
};
