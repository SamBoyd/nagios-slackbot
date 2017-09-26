const superagent = require('superagent');

export const sendPost = (data, cb) => {
    superagent.post('http://monitor.unrulymedia.com/api')
        .send(data)
        .accept('application/json')
        .end((err, res) => cb(res));
};