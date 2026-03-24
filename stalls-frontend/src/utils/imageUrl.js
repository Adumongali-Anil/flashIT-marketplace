export const getImage = (img) => {
  if (!img) return "https://picsum.photos/400/200";

  return `https://flashit-marketplace.onrender.com/uploads/${img}?t=${new Date().getTime()}`;
};