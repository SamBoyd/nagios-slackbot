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

export const isAService = (service, host, callback) => {
    getAllServices((err, res) => {
        if (err) {
            callback(err, null)
        } else {
            const hostExists = host in res;
            if (hostExists) {
                const serviceExists = service in res[host].services;
                return callback(null, serviceExists)
            } else {
                callback(null, false)
            }
        }
    })
};

export const stateOfServiceIsOK = (service) => {
    return (service === 'A check in an OK state')
};

export const isAHost = (host, callback) => {
    getAllServices((err, res) => {
        if (err) {
            callback(err, null)
        } else {
            const hostExists = host in res;
            callback(null, hostExists)
        }
    })
};