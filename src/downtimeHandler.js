import { parseInputForDowntime } from './inputParser'
import { scheduleDowntimeForService } from './nagiosCommandApi'
export const handleDowntime = (bot, message) => {

  const parsedInput = parseInputForDowntime(message.text);

  if ('error' in parsedInput) {
      bot.reply(message, 'Invalid input for scheduling downtime.');
      return
  }

  scheduleDowntimeForService(parsedInput.host, parsedInput.service, parsedInput.duration, (err, res) => {
      if (err) {
          console.log('', err);
          bot.reply(message, 'I can\'t seem to find that service')
      } else {
          bot.reply(message, "Service:" + parsedInput.service + ", Host:" + parsedInput.host);
      }
  });

};