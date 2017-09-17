var webdriverio = require('webdriverio');
var assert = require('assert');
var chai = require('chai');
var chaiWebdriver = require('chai-webdriverio').default;
var options = {defaultWait: 2000};
chai.use(chaiWebdriver(browser, options));

import { navToLogin, enterLogin, login } from '../../src/thrukLogin'

describe('thrukLogin', function() {
    it('should have the right title - the fancy generator way', () => {

        navToLogin();

        var title = browser.getTitle();
        assert.equal(title, '');

        assert.equal(browser.getValue('//*[@id="loginuser"]'), '')
    });

    it('should enter the correct login info', () => {
        navToLogin();

        var username = 'sam';
        var pswd = 'blah';

        enterLogin(username, pswd);

        assert.equal(browser.getValue('//*[@id="loginuser"]'), username);
        assert.equal(browser.getValue('//*[@id="splashpage"]/div/div[2]/form/table/tbody/tr/td/table/tbody/tr[2]/td/input'), pswd)
    });
    
    it('should be able to login', () => {
        login();
        assert.equal(browser.getUrl(), 'http://monitor.unrulymedia.com/thruk/#main.html')
    });
    
    it('if already logged in then return', () => {
        login();
        assert.equal(browser.getUrl(), 'http://monitor.unrulymedia.com/thruk/#main.html')
    })
});