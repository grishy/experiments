const axios = require('axios');
const https = require('https');
const urls = require('./urls.json');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false, // (NOTE: this will disable client verification)
})

const instance = axios.create({ httpsAgent })
instance.defaults.headers.common['Csrf-Token'] = 'black' // for all requests
instance.defaults.headers.common['Cookie'] = `black` // for all requests

for (const u of urls) {
    instance.get(u.url)
        .then(res => {
            const data = res.data
            const downloadurl = `https://109.107.175.208${data.key_zip_url}`
            console.log(downloadurl);
        })
        .catch(error => {
            console.error(error);
        });

}
