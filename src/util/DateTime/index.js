export const chatTime = date => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${hours}:${minutes}:${seconds} ${hours > 12 ? 'PM' : 'AM'}`;
};

export const chatDate = date => {
  const years = date.getFullYear();
  const months = date.getMonth() + 1;
  const dates = date.getDate();

  return `${years}-${months}-${dates}`;
};