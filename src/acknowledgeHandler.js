import { stateOfServiceIsOK } from './nagiosServiceApi'
import { acknowledgeService } from './nagiosApi'
import { parseInputForAcknowledge } from './inputParser'

export const handleAcknowledgement = (bot, message) => {

    let parsedAcknowledge = parseInputForAcknowledge(message.text);

    if ('error' in parsedAcknowledge) {
        bot.reply(message, 'Invalid input for acknowledge.');
        return
    }

    if (stateOfServiceIsOK(parsedAcknowledge.service)) {
        bot.reply(message, 'The service seems to be in an OK state.');
        return
    }

    acknowledgeService(parsedAcknowledge.host, parsedAcknowledge.service, (err, res) => {
        if (res) {
            bot.reply(message, "Service:" + parsedAcknowledge.service + ", Host:" + parsedAcknowledge.host)
        } else {
            bot.reply(message, 'I can\'t seem to find that service');
        }
    });
};
