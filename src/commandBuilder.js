
export const constructAcknowledgeCommand = sendPost => (host, service, cb) => {
        const data = {
            host: host,
            service: service,
            comment: "Service " + service + " acknowledged from slack",
            sticky: true,
            notify: false,
            persistent: true,
            author: "nagios-slack-bot"
        };

        const aknowledgementEndpoint = 'acknowledge';

        sendPost(aknowledgementEndpoint, data, cb)
};

export const constructScheduleDowntimeCommand = sendPost => (host, service, duration, cb) => {
    const data = {
        host: host,
        service: service,
        duration: duration,
        comment: "Service " + service + " acknowledged from slack",
        author: "nagios-slack-bot"
    };

    const scheduleDowntimeEndpoint = 'schedule_downtime';
    sendPost(scheduleDowntimeEndpoint, data, cb)
};