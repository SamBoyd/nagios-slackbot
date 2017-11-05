import { describe, it } from 'mocha'
import { expect, should } from 'chai'

import { constructAcknowledgeCommand, constructScheduleDowntimeCommand } from '../src/commandBuilder'

describe('commandBuilder', () => {
    describe('constructAcknowledgeCommand', () => {
        it('should send request to the correct endpoint', () => {
            const validInput = {'host': 'some host', 'service': 'some service'};
            const expectedEndpoint = 'acknowledge';

            const stubSendPost = (endpoint, data, cb) => {
                expect(endpoint).to.deep.equal(expectedEndpoint);
            };

            const sendAcknowledgementCommand = constructAcknowledgeCommand(stubSendPost);

            sendAcknowledgementCommand(validInput.host, validInput.service, () => {
            })
        });

        it('should send the correct data blob', () => {
            const validInput = {'host': 'some host', 'service': 'some service'};
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

            const sendAcknowledgementCommand = constructAcknowledgeCommand(stubSendPost);

            sendAcknowledgementCommand(validInput.host, validInput.service, () => {
            })
        });


        it('should return an error if request failed', done => {
            const validInput = {'host': 'some host', 'service': 'some service'};
            const expectedResult = {'error': 'failed'};

            const stubSendPost = (endpoint, data, cb) => {
                cb({error: 'failed'}, null)
            };

            const sendAcknowledgementCommand = constructAcknowledgeCommand(stubSendPost);

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
            const validInput = {'host': 'some3 host', 'service': 'some service'};

            const expectedResult = {'result': 'OK'};

            const stubSendPost = (endpoint, data, cb) => {
                cb({result: 'OK'}, null)
            };

            const sendAcknowledgementCommand = constructAcknowledgeCommand(stubSendPost);

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

    describe('constructScheduleDowntimeCommand', () => {
        it('should send request to the correct endpoint', () => {
            const validInput = {
                host: 'some host',
                service: 'some service',
                duration: '100'
            };
            const expectedEndpoint = 'schedule_downtime';

            const stubSendPost = (endpoint, data, cb) => {
                expect(endpoint).to.deep.equal(expectedEndpoint);
            };

            const sendScheduleDowntimeCommand = constructScheduleDowntimeCommand(stubSendPost);

            sendScheduleDowntimeCommand(validInput.host, validInput.service, validInput.duration, () => {})
        });

        it('should send the correct data blob', () => {
            const validInput = {
                host: 'some host',
                service: 'some service',
                duration: '100'
            };
            const expectedData = {
                host: 'some host',
                service: 'some service',
                duration: '100',
                comment: "Service some service acknowledged from slack",
                author: "nagios-slack-bot"
            };

            const stubSendPost = (endpoint, data, cb) => {
                expect(data).to.deep.equal(expectedData);
            };

            const sendScheduleDowntimeCommand = constructScheduleDowntimeCommand(stubSendPost);

            sendScheduleDowntimeCommand(validInput.host, validInput.service, validInput.duration, () => {})
        });


        it('should return an error if request failed', done => {
            const validInput = {
                host: 'some host',
                service: 'some service',
                duration: '100'
            };
            const expectedResult = {'error': 'failed'};

            const stubSendPost = (endpoint, data, cb) => {
                cb({error: 'failed'}, null)
            };

            const sendScheduleDowntimeCommand = constructScheduleDowntimeCommand(stubSendPost);

            const callback = (err, res) => {
                if (err) {
                    expect(err).to.deep.equal(expectedResult);
                    done()
                } else {
                    throw new Exception
                }
            };

            sendScheduleDowntimeCommand(validInput.host, validInput.service, validInput.duration, callback)
        });

        it('should return success msg if it succedes', done => {
            const validInput = {
                host: 'some host',
                service: 'some service',
                duration: '100'
            };
            const expectedResult = {'result': 'OK'};

            const stubSendPost = (endpoint, data, cb) => {
                cb({result: 'OK'}, null)
            };

            const sendScheduleDowntimeCommand = constructScheduleDowntimeCommand(stubSendPost);

            const callback = (err, res) => {
                if (err) {
                    expect(err).to.deep.equal(expectedResult);
                    done()
                } else {
                    throw new Exception
                }
            };

            sendScheduleDowntimeCommand(validInput.service, validInput.host, validInput.duration, callback)
        })
    });
});