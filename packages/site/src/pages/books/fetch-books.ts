export const fetchBooks = async () => {
  const res = await fetch('/.netlify/functions/books');
  const json = await res.json();
  return json.itemsList;
}