var webdriverio = require('webdriverio');
var assert = require('assert');
var chai = require('chai');
var chaiWebdriver = require('chai-webdriverio').default;
var options = {defaultWait: 2000};
chai.use(chaiWebdriver(browser, options));

import { enterSearch, goToService } from '../../src/thrukServiceLocator'
import { login } from '../../src/thrukLogin'

describe('thrukServiceLocator', () => {

   beforeEach(() => login());

   it('should be able to enter a search query', () => {
      const searchQuery = 'puppet run result';
      enterSearch(searchQuery);

      const expectedURL = 'http://monitor.unrulymedia.com/thruk/#cgi-bin/status.cgi?hidesearch=2&s0_op=%7E&s0_type=search&add_default_service_filter=1&s0_value=puppet+run+result';
      assert.equal(browser.getUrl(), expectedURL);

      // var my_frame = $('frame[id="side"]').value;
      //
      // browser.frame(my_frame);
      //
      // chai.expect('//*[@id="s0_value"]').to.be.visible()
   });
    
    it('should load the first service on the search result page', () => {
        const searchQuery = 'puppet run result';
        goToService(searchQuery);

        const expectedUrl = 'http://monitor.unrulymedia.com/thruk/#cgi-bin/extinfo.cgi?type=2&host=activate-pg-replica-1&service=Puppet%20run%20result&backend=68831';

        assert.equal(browser.getUrl(), expectedUrl)
    });

});
