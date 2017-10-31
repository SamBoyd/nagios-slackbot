const superagent = require('superagent');

const STATUS_ENDPOINT = 'http://monitor.unrulymedia.com/status';

export const getAllServices = (callback) => {
    superagent.get(STATUS_ENDPOINT, (err, res) => {
        if (err) {
            console.log(err);
            callback(err, null)
        } else {
            callback(null, JSON.parse(res.text).content)
        }
    })
};

export const isAService = (callback, host, service) => {
    getAllServices((err, res) => {
        if (err) {
            callback(err, null)
        } else {
            const serviceExists =  service in res[host].services;
            return callback(null, serviceExists)
        }
    })
};