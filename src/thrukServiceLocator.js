
export const enterSearch = (text) => {
    const searchParam = text.replace(/\s/g, '+');
    const searchURL = 'http://monitor.unrulymedia.com/thruk/#cgi-bin/status.cgi?hidesearch=2&s0_op=%7E&s0_type=search&add_default_service_filter=1&s0_value=';
    browser.url(searchURL + searchParam)
};

export const goToService = (serviceQuery) => {
    isRightPage(serviceQuery);

    var my_frame = $('frame[id="main"]').value;
    browser.frame(my_frame);

    // chai.expect('//*[@id="s0_value"]').to.be.visible()
    browser.waitForVisible('//*[@id="dfl_r0"]')
    browser.click('//*[@id="dfl_r0"]/td[2]/table/tbody/tr/td[1]/a')


};

const isRightPage = (serviceQuery) => {
    enterSearch(serviceQuery)
    browser.waitForExist('frame[id="main"]',2000)
    if (!browser.isExisting('frame[id="main"')) {
        isRightPage()
    }
};

export const isServiceReal = (service) => {
    return (service != 'Puppet run result across all exchanges')
};

export const isHostReal = (host) => {
    return (host != 'hostless-supply-side')
};