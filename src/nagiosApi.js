import { constructNagiosCommand } from './commandBuilder'
import { sendPost } from './nagiosRequest'

export const acknowledgeService = (host, service, cb) => {
    const sendAcknowledgeComment = constructNagiosCommand(sendPost);

    sendAcknowledgeComment(host, service, cb)
};
