const BASE_URL = 'https://www.superheroapi.com/api/4136848176351482';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const randomNumber = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
  const simulateNetworkLatency = (min = 30, max = 1500) =>
  delay(randomNumber(min, max));
  
  async function callApi(endpoint, options = {}) {
    await simulateNetworkLatency();
    
    options.headers = {
      'Access-Control-Allow-Origin' : 'http://localhost:3000',
      'Content-Type': 'application/json',
      'Origin' : 'http://localhost:3000',
  };
  
  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();
  
  return data;
}

const api = {
  superhero: {
    addHero(id) {
      return callApi(`/${id}`);
    },

    search(heroId) {
      return callApi(`/search/${heroId}`);
    },
  },
};

export default api;
