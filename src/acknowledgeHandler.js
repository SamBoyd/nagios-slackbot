import { isServiceReal, isHostReal } from './thrukServiceLocator'
import { stateOfCheckIsOK } from './serviceStatusGetter'

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

    if (!isServiceReal(parsedAcknowledge.service)) {
        bot.reply(message, 'I can\'t seem to find that service');
        return
    }

    if (!isHostReal(parsedAcknowledge.host)) {
        bot.reply(message, 'I can\'t seem to find that host');
        return
    }

    if (stateOfCheckIsOK(parsedAcknowledge.service)) {
        bot.reply(message, 'The service seems to be in an OK state.');
        return
    }

    bot.reply(message, "Service:" + parsedAcknowledge.service + ", Host:" + parsedAcknowledge.host)

    // controller.storage.users.get(message.user, function(err, user) {
    //     var regex = new Regex(/acknowledge (.+(?=on))on (.+)/g);
    //     console.log(message)
    //     console.log(regex.test(message.text))
    //     if (regex.test(message.text) ) {
    //         bot.reply("Acknowledging");
    //     }
    // });
};