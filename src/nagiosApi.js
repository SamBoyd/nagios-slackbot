import { buildAcknowledgementRequest } from './requestBuilder'
import { sendPost } from './nagiosRequest'

export const acknowledgement = (host, service, cb) => {
    const acknowledgementSender = buildAcknowledgementRequest(sendPost);

    acknowledgementSender(host, service, cb)
};
