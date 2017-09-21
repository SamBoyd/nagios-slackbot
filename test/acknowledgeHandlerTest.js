import { describe, it } from 'mocha'
import { expect, should } from 'chai'
var sinon = require('sinon');

import { parse, handleAcknowledgement } from '../src/acknowledgeHandler'
import { serviceLocator } from '../src/thrukServiceLocator'

describe('Acknowledge Hander', () => {
    it('should fail to parse with an error', () => {
            let parsed = parse('acknowledge not a valid anything');

            expect(parsed).to.have.property('error');
    });

    it('should correctly parse an acknowledgement', () => {
        let parsed = parse('acknowledge Puppet run result across all exchanges on hostless-supply-side');

        expect(parsed).to.have.property('service');
        expect(parsed).to.have.property('host');

        expect(parsed.service).to.equal('Puppet run result across all exchanges')
        expect(parsed.host).to.equal('hostless-supply-side')
    });

    it('should respond to a with the correct msg', () => {
        const inputText = {'text': 'acknowledge Puppet run result across all exchanges on hostless-supply-side'};
        const bot = { reply: function() {}};
        sinon.spy(bot, 'reply');

        handleAcknowledgement(bot, inputText);

        const replyCall = bot.reply.getCall(0);

        expect('Service:Puppet run result across all exchanges, Host:hostless-supply-side').to.equal(replyCall.args[1])
        expect(spy.calledOnce).to.be.true
    });

    it.only('should respond with a error if the input is not a real service', () => {
        const inputText = {'text': 'acknowledge Puppet run result across all exchanges on hostless-supply-side'};
        const bot = { reply: function() {}};
        var spy  = sinon.spy(bot, 'reply');
        
        handleAcknowledgement(bot, inputText);

        const replyCall = bot.reply.getCall(0);

        expect('I can\'t seem to find that service').to.equal(replyCall.args[1]);
        expect(spy.calledOnce).to.be.true
    });

    it('should respond with a error if the input is not a real host', () => {
        const inputText = {'text': 'acknowledge Puppet run result across all exchanges on hostless-supply-side'};
        const bot = { reply: function() {}};
        var spy  = sinon.spy(bot, 'reply');

        handleAcknowledgement(bot, inputText);

        const replyCall = bot.reply.getCall(0);

        expect('I can\'t seem to find that service').to.equal(replyCall.args[1]);
        expect(spy.calledOnce).to.be.true
    })
});

