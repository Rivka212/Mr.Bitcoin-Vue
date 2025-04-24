
import axios from 'axios';
import { storageService } from './async-storage.service';
const TRADE_VOLUME_KEY = 'tradeVolume'

export const bitcoinService = {
    getRate,
    getTradeVolume,
}

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


