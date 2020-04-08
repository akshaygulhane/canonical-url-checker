const request = require('request');
const cheerio = require('cheerio');

const HOST = ""; //paste the url here

const output = [];

const { URL_DATA } = require('./url_data');

function getCanonicalURL(inputUrl, body) {
    const $ = cheerio.load(body);
    const canonical_rul = $('link[rel=canonical]').attr("href");
    
    output.push({
        "URL": inputUrl,
        "CAN_URL": canonical_rul
    });

    console.log(output)
}

URL_DATA.forEach(url => {
    request.get(HOST + url, (err, res, data) => {
        if(!err) {
            getCanonicalURL(url, data)
        }
        else {
            console.error("Error accessing ", url, "\n Status Code:", res.statusCode)
        }

    })
})