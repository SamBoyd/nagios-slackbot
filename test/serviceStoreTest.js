import { describe, it } from 'mocha'
import { expect } from 'chai'
import nock from 'nock'


import { getAllServices, isAService} from '../src/serviceStore'

describe('ServiceStore', () => {

    beforeEach(() => {
        nock('http://monitor.unrulymedia.com')
            .get('/status')
            .reply(200, sampleStatusReponse);
    });

    it('getAllServices should return the correct object', done => {
        const callback= (err, res) => {
            expect(res).to.deep.equal(JSON.parse(sampleStatusReponse).content);
            done()
        };

        getAllServices(callback);
    });


    it('should identify a service', done => {
        const callback= (err, res) => {
            expect(res).to.be.true;
            done()
        };

        isAService(callback, 'unrulyx-sg-018', 'Check auction log archiving on S3');
    });

    it('should return false when not a service', done => {
        const callback= (err, res) => {
            expect(res).to.be.false;
            done()
        };

        isAService(callback, 'unrulyx-sg-018', 'Definitely not a service');
    });

    it('should return false when not a host', done => {
        const callback= (err, res) => {
            expect(res).to.be.false;
            done()
        };

        isAService(callback, 'probably-not-a-host', 'Check auction log archiving on S3');
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