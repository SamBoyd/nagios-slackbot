import { describe, it } from 'mocha'
import { expect, should } from 'chai'

import { constructNagiosCommand } from '../src/commandBuilder'

describe('constructNagiosCommand', () => {

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

        const stubSendPost = (endpoint, data, cb) => {
            expect(data).to.deep.equal(expectedData);
        };

        const sendAcknowledgementCommand = constructNagiosCommand(stubSendPost);

        sendAcknowledgementCommand(validInput.host, validInput.service, () => {})
    });


    it('should return an error if request failed', done => {
        const validInput = { 'host': 'some host', 'service': 'some service' };
        const expectedResult = { 'error': 'failed'};

        const stubSendPost = (endpoint, data, cb) => {
            cb({ error: 'failed' }, null)
        };

        const sendAcknowledgementCommand = constructNagiosCommand(stubSendPost);

        const callback = (err, res) => {
            if (err) {
                expect(err).to.deep.equal(expectedResult);
                done()
            } else {
                throw new Exception
            }
        };

        sendAcknowledgementCommand(validInput.service, validInput.host, callback)
    });

    it('should return success msg if it succedes', done => {
        const validInput = { 'host': 'some3 host', 'service': 'some service' };

        const expectedResult = { 'result': 'OK'};

        const stubSendPost = (endpoint, data, cb) => {
            cb({ result: 'OK' }, null)
        };

        const sendAcknowledgementCommand = constructNagiosCommand(stubSendPost);

        const callback = (err, res) => {
            if (err) {
                expect(err).to.deep.equal(expectedResult);
                done()
            } else {
                throw new Exception
            }
        };

        sendAcknowledgementCommand(validInput.service, validInput.host, callback)
    })
});