import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Telegraf } from 'telegraf';

require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Hello world!'));
bot.help((ctx) => ctx.reply('Напиши /start'));

bot.startPolling();

// Запуск бота
bot.launch().then(() => {
  console.log('Bot is running 🚀');
});
