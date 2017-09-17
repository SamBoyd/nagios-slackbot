var webdriverio = require('webdriverio');

const elements  = {
    usernameField: {
        selector: '//*[@id="loginuser"]'
    },
    passwordField: {
        selector: '//*[@id="splashpage"]/div/div[2]/form/table/tbody/tr/td/table/tbody/tr[2]/td/input'
    },
    submit: {
        selector: 'input.loginbutton'
        // selector: '#splashpage > div:nth-child(7) > div.loginmask > form > table > tbody > tr > td > table > tbody > tr:nth-child(3) > td:nth-child(2) > input'
    }
};

const url = function() {
    return 'http://monitor.unrulymedia.com/thruk/';
};

export const navToLogin = () => {
    return browser.url(url());
};

export const enterLogin = (username, password) => {
    browser.addValue(elements.usernameField.selector, username);
    browser.addValue(elements.passwordField.selector, password);
};

export const login = (username = 'nagios-admin', password = 'OMGpleasedontbetoobad!') => {
    navToLogin();

    if (browser.isExisting('frame[id="side"]')) {
        return
    }

    enterLogin(username, password);
    browser.click(elements.submit.selector)
};