const { Markup } = require('telegraf');
const Scene = require('telegraf/scenes/base');

// Сцена авторизации
const auth = new Scene('auth');

auth.enter((ctx) => {
  ctx.reply('Привет! Пришли свой номер телефона чтобы авторизироваться=)', Markup.keyboard([
    Markup.contactRequestButton('Отправить номер телефона'),
  ]).resize().oneTime().extra());
});

auth.on('contact', async (ctx) => {
  if (ctx.session.user && ctx.session.user.role === 'customer') {
    await ctx.reply('Вы успешно авторизировались', Markup.removeKeyboard().extra());
    await ctx.scene.enter('getAlbum');
  }
});

export default auth;
