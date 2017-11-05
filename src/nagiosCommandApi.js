import { constructAcknowledgeCommand, constructScheduleDowntimeCommand } from './commandBuilder'
import { sendPost } from './nagiosRequest'

export const acknowledgeService = (host, service, cb) => {
    const sendAcknowledgeCommand = constructAcknowledgeCommand(sendPost);

    sendAcknowledgeCommand(host, service, cb)
};


export const scheduleDowntimeForService = (host, service, downtime, cb) => {
    const sendDowntimeCommand = constructScheduleDowntimeCommand(sendPost);

    sendDowntimeCommand(host, service, downtime, cb)
};