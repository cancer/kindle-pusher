export const fetchBooks = async () => {
  const res = await fetch('/.netlify/functions/books');
  return res.json();
}