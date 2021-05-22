export const validateToday = (someDate) => {
  const today = new Date();

  const inputedDate = new Date(someDate);
  return (
    inputedDate.getDate() == today.getDate() &&
    inputedDate.getMonth() == today.getMonth() &&
    inputedDate.getFullYear() == today.getFullYear()
  );
};
