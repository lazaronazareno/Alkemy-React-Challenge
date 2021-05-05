const BASE_URL = 'https://www.superheroapi.com/api/4136848176351482';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const randomNumber = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
  const simulateNetworkLatency = (min = 30, max = 1500) =>
  delay(randomNumber(min, max));
  
  async function callApi(endpoint, options = {}) {
    await simulateNetworkLatency();
    
    options.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Origin': 'http://localhost:3000',
    'Access-Control-Allow-Origin' : 'http://localhost:3000',
    'Access-Control-Allow-Credentials' : true,
    'Access-Control-Allow-Methods' : ('OPTIONS', 'GET', 'POST'),
    'Access-Control-Allow-Headers' : ('Origin', 'Content-Type', 'Accept'),
    'Access-Control-Max-Age': '86400'
  };
  
  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();
  
  return data;
}

const api = {
  id: {
    heroesList() {
      let list = [];
        for(let i = 1 ; i < 21 ; i++){
          console.log(i);
          list.push(i);
        }
        console.log(list);
        return callApi(`/search/all`);
    },
    randomHero() {
      let min = 0;
      let max = 732;
      return callApi(`/${randomNumber(min,max)}`);
    },
    image() {
      let min = 0;
      let max = 732;
      return callApi(`/${randomNumber(min,max)}/image`);
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
