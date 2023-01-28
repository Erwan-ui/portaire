export const updateCardNumber = (cardNumber) => ({
  type: "UPDATE_CARD_NUMBER",
  cardNumber,
});

export const updateExpiryDate = (expiryDate) => ({
  type: "UPDATE_EXPIRY_DATE",
  expiryDate,
});

export const updateCCV = (ccv) => ({
  type: "UPDATE_CCV",
  ccv,
});
