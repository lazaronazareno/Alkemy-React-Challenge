const BASE_URL = 'https://superheroapi.com/api/4136848176351482';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const randomNumber = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const simulateNetworkLatency = (min = 30, max = 1500) =>
  delay(randomNumber(min, max));

async function callApi(endpoint, options = {}) {
  await simulateNetworkLatency();

  options.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'https://superheroapi.com/api/4136848176351482',
    'Access-Control-Request-Methods': 'GET',
    'origin': 'htttp://localhost:3000',
  };

  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}

const api = {
  id: {
    random() {
      let min = 0;
      let max = 732;
      return callApi(`/${randomNumber(min,max)}`);
    },
    biography() {
      let min = 0;
      let max = 732;
      return callApi(`/${randomNumber(min,max)}/biography`);
    },
    update(id, updates) {
      return callApi(`/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    },
    // Lo hubiera llamado `delete`, pero `delete` es un keyword en JavaScript asi que no es buena idea :P
    remove(id) {
      return callApi(`/${id}`, {
        method: 'DELETE',
      });
    },
  },
};

export default api;
