import { constructAcknowledgeCommand } from './commandBuilder'
import { sendPost } from './nagiosRequest'

export const acknowledgeService = (host, service, cb) => {
    const sendAcknowledgeComment = constructAcknowledgeCommand(sendPost);

    sendAcknowledgeComment(host, service, cb)
};
