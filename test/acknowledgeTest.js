import { describe, it } from 'mocha'
import { expect, should } from 'chai'

import { sendAcknowledgment } from '../src/acknowledge'

describe('sendAcknowledgement', () => {

    it('should send the correct data blob', () => {
        const validInput = { 'host': 'some host', 'service': 'some service' };
        const expectedData = {
            host: 'some host',
            service: 'some service',
            comment: "Service some service acknowledged from slack",
            sticky: true,
            notify: false,
            persistent: true,
            author: "nagios-slack-bot"
        };

        const stubSendPost = (data, cb) => {
            expect(data).to.deep.equal(expectedData)
        };

        const acknowledge = sendAcknowledgment(stubSendPost);

        acknowledge(validInput.service, validInput.host, () => {})
    });


    it('should return an error if request failed', done => {
        const validInput = { 'host': 'some host', 'service': 'some service' };
        const expectedResult = { 'error': 'failed'};

        const stubSendPost = (data, cb) => {
            cb({ error: 'failed' }, null)
        };

        const acknowledge = sendAcknowledgment(stubSendPost);

        const callback = (err, res) => {
            if (err) {
                expect(err).to.deep.equal(expectedResult);
                done()
            } else {
                throw new Exception
            }
        };

        acknowledge(validInput.service, validInput.host, callback)
    });

    it('should return success msg if it succedes', done => {
        const validInput = { 'host': 'some host', 'service': 'some service' };

        const expectedResult = { 'result': 'OK'};

        const stubSendPost = (data, cb) => {
            cb({ result: 'OK' }, null)
        };

        const acknowledge = sendAcknowledgment(stubSendPost);

        const callback = (err, res) => {
            if (err) {
                expect(err).to.deep.equal(expectedResult);
                done()
            } else {
                throw new Exception
            }
        };

        acknowledge(validInput.service, validInput.host, callback)
    })
});