import { constructNagiosCommand } from './commandBuilder'
import { sendPost } from './nagiosRequest'

export const acknowledgement = (host, service, cb) => {
    const acknowledgeService = constructNagiosCommand(sendPost);

    acknowledgeService(host, service, cb)
};
