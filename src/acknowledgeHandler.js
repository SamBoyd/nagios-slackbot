import { stateOfCheckIsOK } from './nagiosServiceApi'
import { acknowledgement } from './nagiosApi'

export const parse = (m) => {
    const patternString = /acknowledge (.+(?=on))on (.+)/gi;
    let patt = new RegExp(patternString);

    let message = m;
    let bool =  patt.test(message);

    if (bool) {
        var matches = patternString.exec(message);

        if (matches.length == 0) {
            return {
                'error': 'Invalid acknowledgement'
            }
        }

        return {
            'service': matches[1].trim(),
            'host' : matches[2].trim()
        }
    } else {
        return {
            'error': 'Invalid acknowledgement'
        }
    }
};

export const handleAcknowledgement = (bot, message) => {

    let parsedAcknowledge = parse(message.text);

    if ('error' in parsedAcknowledge) {
        bot.reply(message, 'Invalid input for acknowledge.');
        return
    }

    if (stateOfCheckIsOK(parsedAcknowledge.service)) {
        bot.reply(message, 'The service seems to be in an OK state.');
        return
    }

    acknowledgement(parsedAcknowledge.host, parsedAcknowledge.service, (err, res) => {
        if (res) {
            bot.reply(message, "Service:" + parsedAcknowledge.service + ", Host:" + parsedAcknowledge.host)
        } else {
            bot.reply(message, 'I can\'t seem to find that service');
        }
    });
};
