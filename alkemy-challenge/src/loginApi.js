const BASE_URL = 'https://hosted-cors.herokuapp.com/http://challenge-react.alkemy.org';

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
    'Referer': 'http://localhost:3000',
  };
  
  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();
  
  return data;
}

const loginApi = {
  login: {
    accept(email, password) {
        return callApi(`/`, {
          method: 'POST',
          body: JSON.stringify(email, password),
        });
      },
  },
};

export default loginApi;
