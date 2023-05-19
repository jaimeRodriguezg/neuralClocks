//se convierte los minutos ingresados por el usuario a un tipo Date con los minutos ingresados
export const convertMinutesToExpiryDate = (minutes: number): Date => {
  const currentDate = new Date();
  const expiryDate = new Date(currentDate.getTime() + minutes * 60000);
  return expiryDate;
};
