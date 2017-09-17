import { describe, it } from 'mocha'
import { expect, should } from 'chai'

import { parse, acknowledgement } from '../src/acknowledgeHandler'

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

        const bot =  {};

        bot.reply = (message, text) => {
                expect(text).to.equal('Service:Puppet run result across all exchanges, Host:hostless-supply-side')
        };

        acknowledgement(bot, inputText)
    });
    
});

