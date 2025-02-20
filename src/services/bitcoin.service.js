
import axios from 'axios';
import { storageService } from './async-storage.service';
const TRADE_VOLUME_KEY = 'tradeVolume'

export const bitcoinService = {
    getRate,
    getTradeVolume,
    getMarketPriceHistory,
    getAvgBlockSize,

}

// export const tradeVolume {
//     values: { x: number, y: number }[]
// }

// export const tradeResult {
//     name: string
//     value: number
// }

function getRate(coins) {
    return axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
}

function getTradeVolume() {
    const data = storageService.load(TRADE_VOLUME_KEY);
    if (data) return data
  
    return axios.get(`https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true`)
     .then(res => {
         console.log(res);
  const formattedData = res.data.values.map(item => ({
        name: new Date(item.x * 1000).toLocaleDateString("en-US"),
        value: item.y
      }))
      storageService.store(TRADE_VOLUME_KEY, formattedData);
      return formattedData;
})

    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
}
  
  

// function getTradeVolume(name, value){
//     const data = storageService.load(TRADE_VOLUME_KEY)
//     if (data) return Promise.resolve(data)
//     return axios.get(`https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true`)
//             .then(res => {
//                 const vals = _formatTradeVolumeForChart(res)
//                 storageService.store(TRADE_VOLUME_KEY, vals)
//                 return vals
//                 // return res.data;
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//                 throw error;
//             });   
// }

// Private functions
function _formatTradeVolumeForChart(res) {
    if (res && res.values && Array.isArray(res.values)) {
        return res.values.map(item => ({
            name: new Date(item.x * 1000).toLocaleDateString("en-US"),
            value: item.y
        }));
    } else {
        console.error('Invalid data received:', res)
        return [] 
    }
}


function getAvgBlockSize() {

    return this.http.get(`https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true`)
}

function getMarketPriceHistory() {

    return this.http.get(`https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`)
}