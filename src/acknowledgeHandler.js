import { stateOfServiceIsOK, isAService } from './nagiosServiceApi'
import { acknowledgeService } from './nagiosCommandApi'
import { parseInputForAcknowledge } from './inputParser'

export const handleAcknowledgement = (bot, message) => {

    let parsedAcknowledge = parseInputForAcknowledge(message.text);

    if ('error' in parsedAcknowledge) {
        bot.reply(message, 'Invalid input for acknowledge.');
        return
    }

    isAService(parsedAcknowledge.service, parsedAcknowledge.host, (err, res) => {
        if (res === false) {
            bot.reply(message, 'I can\'t seem to find that service');
            return
        }

        // if (stateOfServiceIsOK(parsedAcknowledge.service)) {
        //     bot.reply(message, 'The service seems to be in an OK state.');
        //     return
        // }

        acknowledgeService(parsedAcknowledge.host, parsedAcknowledge.service, (err, res) => {
            if (res) {
                bot.reply(message, "Service:" + parsedAcknowledge.service + ", Host:" + parsedAcknowledge.host)
            } else {
                bot.reply(message, 'Unable to acknowledge that service');
            }
        });
    });
};
