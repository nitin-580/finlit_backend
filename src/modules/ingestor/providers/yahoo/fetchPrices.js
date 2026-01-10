const axios = require('axios');

async function fetchDailyPrices(symbol){
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.NS`;

    const response = await axios.get(url ,{
        params:{
            range:"1y",
            interval:"1d",
        },
    });
    return response.data;
}
module.exports ={
    fetchDailyPrices
}