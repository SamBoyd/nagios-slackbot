import { describe, it } from 'mocha'
import { expect, should } from 'chai'

import nock from 'nock'

var sinon = require('sinon');

import { handleAcknowledgement } from '../src/acknowledgeHandler'
import { serviceLocator } from '../src/thrukServiceLocator'

describe.only('Acknowledging', () => {
    it('should reply when successfully acknowledged', done => {
        const inputText = {'text': 'acknowledge Puppet run result across all exchanges on hostless-supply-side'};
        const bot = {
            reply: function (message, reply) {
                expect(reply).to.equal('Service:Puppet run result across all exchanges, Host:hostless-supply-side');
                done()
            }
        };

        const expectedData = {
            host: 'hostless-supply-side',
            service: 'Puppet run result across all exchanges',
            comment: "Service Puppet run result across all exchanges acknowledged from slack",
            sticky: true,
            notify: false,
            persistent: true,
            author: "nagios-slack-bot"
        };

        nock('http://monitor.unrulymediwa.com')
            .post('/api', expectedData)
            .reply(200, { ok: true });

        handleAcknowledgement(bot, inputText);
    })
});