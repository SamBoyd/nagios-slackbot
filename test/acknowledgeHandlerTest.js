import { describe, it } from 'mocha'
import { expect, should } from 'chai'
var sinon = require('sinon');

import { parse, handleAcknowledgement } from '../src/acknowledgeHandler'
import { serviceLocator } from '../src/thrukServiceLocator'

describe('Acknowledge Hander', () => {
    describe('parse', () => {
        it('should fail to parse with an error', () => {
            let parsed = parse('acknowledge not a valid anything');

            expect(parsed).to.have.property('error');
        });

        it('should correctly parse an acknowledgement', () => {
            let parsed = parse('acknowledge Puppet run result across all exchanges on hostless-supply-side');

            expect(parsed).to.have.property('service');
            expect(parsed).to.have.property('host');

            expect(parsed.service).to.equal('Puppet run result across all exchanges');
            expect(parsed.host).to.equal('hostless-supply-side')
        });
    });
    
    describe('handleAcknowledge', () => {
        it('should respond to a with the correct msg', () => {
            const inputText = {'text': 'acknowledge Puppet run result across all exchanges on hostless-supply-side'};
            const bot = {
                reply: function () {
                }
            };
            const spy = sinon.spy(bot, 'reply');

            handleAcknowledgement(bot, inputText);

            const replyCall = bot.reply.getCall(0);

            expect(replyCall.args[1]).to.equal('Service:Puppet run result across all exchanges, Host:hostless-supply-side')
            expect(spy.calledOnce).to.be.true
        });

        it('should respond with a error if the input is not a real service', () => {
            const inputText = {'text': 'acknowledge This is not a service on hostless-supply-side'};
            const bot = {
                reply: function () {
                }
            };
            const spy = sinon.spy(bot, 'reply');

            handleAcknowledgement(bot, inputText);

            const replyCall = bot.reply.getCall(0);

            expect(replyCall.args[1]).to.equal('I can\'t seem to find that service');
            expect(spy.calledOnce).to.be.true
        });

        it('should respond with a error if the input is not a real host', () => {
            const inputText = {'text': 'acknowledge Puppet run result across all exchanges on not-a-host'};
            const bot = {
                reply: function () {
                }
            };
            const spy = sinon.spy(bot, 'reply');

            handleAcknowledgement(bot, inputText);

            const replyCall = bot.reply.getCall(0);

            expect(replyCall.args[1]).to.equal('I can\'t seem to find that host');
            expect(spy.calledOnce).to.be.true
        });

        it('should respond with an error if the inputted service is in an OK state', () => {
            const inputText = {'text': 'acknowledge A check in an OK state on some host'};
            const bot = {
                reply: function () {
                }
            };
            const spy = sinon.spy(bot, 'reply');

            handleAcknowledgement(bot, inputText);

            const replyCall = bot.reply.getCall(0);

            expect(replyCall.args[1]).to.equal('The service seems to be in an OK state.');
            expect(spy.calledOnce).to.be.true
        })
    })
});

