export default async (id) => {
  return fetch(`https://randomuser.me/api/?seed=${id}`)
    .then(r => r.json())
    .then(data => data.results[0]);
}