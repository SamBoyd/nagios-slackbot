
export const sendAcknowledgment = sendPost => (service, host, cb) => {
        const data = {
            host: host,
            service: service,
            comment: "Service " + service + " acknowledged from slack",
            sticky: true,
            notify: false,
            persistent: true,
            author: "nagios-slack-bot"
        };

        sendPost(data, cb)
};
