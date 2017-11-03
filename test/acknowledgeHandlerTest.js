import { describe, beforeEach, it } from 'mocha'
import { expect, should } from 'chai'
import nock from 'nock'

import { parse, handleAcknowledgement } from '../src/acknowledgeHandler'

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
        beforeEach(() => {
            nock('http://monitor.unrulymedia.com')
                .get('/status')
                .reply(200, sampleStatusReponse);

            const acknowledgeRequestData = {
                host: 'unrulyx-sg-018',
                service: 'Upload Auction Logs to S3',
                comment: "Service Upload Auction Logs to S3 acknowledged from slack",
                sticky: true,
                notify: false,
                persistent: true,
                author: "nagios-slack-bot"
            };

            const successfulResponse = {
                content: "acknowledge",
                result: true
            };

            nock('http://monitor.unrulymedia.com')
                .post('/api', acknowledgeRequestData)
                .reply(200, successfulResponse);

        });

        it('should respond to a with the correct msg', done => {
            const inputText = {'text': 'acknowledge Upload Auction Logs to S3 on unrulyx-sg-018'};
            const bot = {
                reply: function (orginalMessage, message) {
                    expect(message).to.equal('Service:Upload Auction Logs to S3, Host:unrulyx-sg-018');
                    done();
                 }
            };

            handleAcknowledgement(bot, inputText);
        });

        it('should respond with a error if the input is not a real service', done => {
            const inputText = {'text': 'acknowledge This is not a service on hostless-supply-side'};
            const bot = {
                reply: function (originalMessage, message) {
                    expect(message).to.equal('I can\'t seem to find that service');
                    done()
                }
            };

            handleAcknowledgement(bot, inputText);
        });

        it('should respond with a error if the input is not a real host', () => {
            const inputText = {'text': 'acknowledge Puppet run result across all exchanges on not-a-host'};
            const bot = {
                reply: function (originalMessage, message) {
                    expect(message).to.equal('I can\'t seem to find that service');
                }
            };

            handleAcknowledgement(bot, inputText);
        });

        it('should respond with an error if the inputted service is in an OK state', () => {
            const inputText = {'text': 'acknowledge A check in an OK state on some host'};
            const bot = {
                reply: function (originalMessage, message) {
                    expect(message).to.equal('The service seems to be in an OK state.')
                }
            };

            handleAcknowledgement(bot, inputText);
        })
    })
});

var sampleStatusReponse = "{\n" +
    "  \"content\": {\n" +
    "    \"unrulyx-sg-018\": {\n" +
    "      \"active_checks_enabled\": \"1\",\n" +
    "      \"current_attempt\": \"1\",\n" +
    "      \"performance_data\": {},\n" +
    "      \"last_hard_state\": \"0\",\n" +
    "      \"notifications_enabled\": \"1\",\n" +
    "      \"current_state\": \"0\",\n" +
    "      \"downtimes\": {},\n" +
    "      \"plugin_output\": \"NRPE v2.14\",\n" +
    "      \"last_check\": \"1509459063\",\n" +
    "      \"problem_has_been_acknowledged\": \"0\",\n" +
    "      \"last_state_change\": \"1509451221\",\n" +
    "      \"scheduled_downtime_depth\": \"0\",\n" +
    "      \"services\": {\n" +
    "        \"Upload Auction Logs to S3\": {\n" +
    "          \"active_checks_enabled\": \"0\",\n" +
    "          \"current_attempt\": \"1\",\n" +
    "          \"performance_data\": {},\n" +
    "          \"last_hard_state\": \"0\",\n" +
    "          \"notifications_enabled\": \"1\",\n" +
    "          \"current_state\": \"0\",\n" +
    "          \"downtimes\": {},\n" +
    "          \"plugin_output\": \"Successfully uploaded auction logs to S3\",\n" +
    "          \"last_check\": \"1509458447\",\n" +
    "          \"problem_has_been_acknowledged\": \"0\",\n" +
    "          \"last_state_change\": \"1509451243\",\n" +
    "          \"scheduled_downtime_depth\": \"0\",\n" +
    "          \"comments\": {},\n" +
    "          \"last_notification\": \"0\",\n" +
    "          \"max_attempts\": \"4\"\n" +
    "        },\n" +
    "        \"Check auction log archiving on S3\": {\n" +
    "          \"active_checks_enabled\": \"1\",\n" +
    "          \"current_attempt\": \"1\",\n" +
    "          \"performance_data\": {},\n" +
    "          \"last_hard_state\": \"0\",\n" +
    "          \"notifications_enabled\": \"1\",\n" +
    "          \"current_state\": \"0\",\n" +
    "          \"downtimes\": {},\n" +
    "          \"plugin_output\": \"Log file is valid: s3://archive.unrulymedia.com/unruly-exchange/auction/2017-10-31/11/2017-10-31_11-unrulyx-sg-018-auction.gz\",\n" +
    "          \"last_check\": \"1509458997\",\n" +
    "          \"problem_has_been_acknowledged\": \"0\",\n" +
    "          \"last_state_change\": \"1509451797\",\n" +
    "          \"scheduled_downtime_depth\": \"0\",\n" +
    "          \"comments\": {},\n" +
    "          \"last_notification\": \"0\",\n" +
    "          \"max_attempts\": \"4\"\n" +
    "        }\n" +
    "      },\n" +
    "      \"comments\": {},\n" +
    "      \"last_notification\": \"0\",\n" +
    "      \"max_attempts\": \"4\"\n" +
    "    }\n" +
    "  },\n" +
    "  \"success\": true\n" +
    "}";