import { describe, it } from 'mocha'
import { expect } from 'chai'
var sinon = require('sinon');
import nock from 'nock'

const superagent = require('superagent');

import { sendPost } from '../src/nagiosRequest'

describe('sendPost', () => {
    it('should send the request to the correct host', () => {

        const expectedHost = 'http://monitor.unrulymedia.com/api';

        let request = sinon.spy(superagent, 'post');

        sendPost(expectedHost, () => {});

        request.restore();
        sinon.assert.calledOnce(request);
        sinon.assert.calledWith(request, expectedHost)
    });

    it('should send the correct data', done => {
        const expectedData = { body: 'some data'};

        nock('http://monitor.unrulymedia.com')
            .post('/api', expectedData )
            .reply(200, { ok: true });


        sendPost(expectedData, (res) => {
            expect(res.body).to.deep.equal({ ok: true });
            done()
        });
    })
});