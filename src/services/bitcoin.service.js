
import axios from 'axios';
const TRADE_VOLUME_KEY = 'tradeVolume'

export const bitcoinService = {
    getRate,
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


function getAvgBlockSize() {

    return this.http.get(`https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true`)
}

function getMarketPriceHistory() {

    return this.http.get(`https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`)
}