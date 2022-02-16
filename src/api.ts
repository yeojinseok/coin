const BaseURL = "https://api.coinpaprika.com/v1"


export const fetchCoins = () =>{
    const response =fetch(`${BaseURL}/coins`).then(response=>
    response.json()
    );
    return response;
}

// export function fetchCoinss() {
//     return fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
//       response.json()
//     );
//   }

export const fetchCoininfo = (coinid:string) =>{
  const response =fetch(`${BaseURL}/coins/${coinid}`).then(response=>
  response.json()
  );
  return response;
}

export const fetchCoinTickers = (coinid:string) =>{
  const response =fetch(`${BaseURL}/coins/${coinid}`).then(response=>
  response.json()
  );
  return response;
}


export const fetchCoinHistory=(coinId:string) =>{

  const endDate = Math.floor(Date.now()/1000);
  const startDate = endDate - 60*60*24*7;
  const response = fetch(`${BaseURL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`).then(response=>
    response.json());
    return response;

}

