const axios = require('axios');

const options = {
    method: 'GET',
    url: 'https://datagram-products-v1.p.rapidapi.com/storeproduct/superproduct_id/30320/',
    headers: {
        'X-RapidAPI-Key': '1f49197d9bmshf4d5a63a6db5b45p1ced46jsn7648510c4f4a',
        'X-RapidAPI-Host': 'datagram-products-v1.p.rapidapi.com',
    },
};

axios
    .request(options)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.error(error);
    });
