//se convierte los minutos ingresados por el usuario a un tipo Date
export const convertMinutesToExpiryDate = (minutes: number): Date => {
  const currentDate = new Date();
  const expiryDate = new Date(currentDate.getTime() + minutes * 60000);
  return expiryDate;
};

//formateamos para que siempre se muestre con 2 dígitos
export const formatedDate = (value: number): string => {
  return String(value).padStart(2, '0');
};
