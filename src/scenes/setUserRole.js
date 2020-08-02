const { Markup } = require('telegraf');
const Scene = require('telegraf/scenes/base');

// Сцена выбора роли
const setUserRole = new Scene('setUserRole');
setUserRole.enter((ctx) => {
  ctx.reply('Выберите свою роль', Markup.inlineKeyboard([
    Markup.callbackButton('Фотограф', 'photograph'),
    Markup.callbackButton('Клиент', 'client'),
  ]).extra());
});

setUserRole.action('photograph', (ctx) => ctx.reply('Добро пожаловать, фотограф!'));
setUserRole.action('client', (ctx) => ctx.reply('Добро пожаловать, клиент!'));

setUserRole.on('message', async (ctx) => ctx.reply('Такой роли нет =('));

export default setUserRole;
