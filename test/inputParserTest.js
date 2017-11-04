import { describe, it } from 'mocha'
import { expect, should } from 'chai'

import { parseInputForAcknowledge } from '../src/inputParser'

describe('parse', () => {
    it('should fail to parse with an error', () => {
        let parsed = parseInputForAcknowledge('acknowledge not a valid anything');

        expect(parsed).to.have.property('error');
    });

    it('should correctly parse an acknowledgement', () => {
        let parsed = parseInputForAcknowledge('acknowledge Puppet run result across all exchanges on hostless-supply-side');

        expect(parsed).to.have.property('service');
        expect(parsed).to.have.property('host');

        expect(parsed.service).to.equal('Puppet run result across all exchanges');
        expect(parsed.host).to.equal('hostless-supply-side')
    });
});