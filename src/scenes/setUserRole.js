const { Markup } = require('telegraf');
const Scene = require('telegraf/scenes/base');

// Сцена выбора роли
const setUserRole = new Scene('setUserRole');
setUserRole.enter((ctx) => {
  ctx.session.user = {
    phone: null,
    role: null,
  };

  return ctx.reply('Выберите свою роль', Markup.inlineKeyboard([
    Markup.callbackButton('Фотограф', 'photograph'),
    Markup.callbackButton('Клиент', 'customer'),
  ]).extra());
});

setUserRole.action('photograph', (ctx) => {
  ctx.session.user.role = 'photograph';
  return ctx.scene.enter('addAlbum');
});

setUserRole.action('customer', (ctx) => {
  ctx.session.user.role = 'customer';
  return ctx.scene.enter('getAlbum');
});

setUserRole.on('message', async (ctx) => ctx.reply('Такой роли нет =('));

export default setUserRole;
