

export const parse = (m) => {
    const patternString = /acknowledge (.+(?=on))on (.+)/gi;
    let patt = new RegExp(patternString);

    let message = m;
    let bool =  patt.test(message);

    if (bool) {
        console.log('patternString', patternString);
        var matches = patternString.exec(message);
        console.log('matches', matches);

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

export const acknowledgement = (bot, message) => {

    let parsedAcknowledge = parse(message.text);

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
