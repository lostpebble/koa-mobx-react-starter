export function getRandomUser() {
  return fetch('https://randomuser.me/api/').then(resp => {
    return resp.json();
  }).then(resp => {
    return resp.results[0];
  });
}
