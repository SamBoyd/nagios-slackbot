import { acknowledgmentBuilder } from './acknowledge'
import { sendPost } from './nagiosRequest'

export const acknowledgement = (host, service, cb) => {
    const acknowledgementSender = acknowledgmentBuilder(sendPost);

    acknowledgementSender(host, service, cb)
};
