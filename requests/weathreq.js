const requestPromise = require('request-promise');

module.exports = async function(reg = '') {
    if (!reg) {
        throw new Error('Перестаньте ничего не вводить...');
        return;
    }

    const apiKey = '47f2ed6fdce527f0c9de9fdf829244fc';

    const uri = 'http://api.openweathermap.org/data/2.5/weather';

    const options = {
        uri,
        qs: {
            appid: apiKey,
            q: reg,
            units: 'imperial'
        },
        json: true
        
    };

    try {

        const data = await requestPromise(options);

        const cel = ((data.main.temp - 32) * 5/9).toFixed(0);

        return {
            weather: `${data.name}: ${cel} ${data.weather[0].main}`,
            error: null
        }

    } catch(error) {
        return {
            weather: null,
            error: error.error.message
        }
    }



};