const { Markup } = require('telegraf');
const Scene = require('telegraf/scenes/base');

const getAlbum = new Scene('getAlbum');

const replyWithAlbum = async (ctx, date = '2020-08-28') => {
  const photos = [
    `https://source.unsplash.com/1600x900/?resort,people&sig=1-${date}`,
    `https://source.unsplash.com/1600x900/?resort,people&sig=2-${date}`,
    `https://source.unsplash.com/1600x900/?resort,people&sig=3-${date}`,
  ].map((url) => ({
    media: url,
    type: 'photo',
  }));
  await ctx.reply(`Вот фотографии которые были сделаны ${date}`, Markup
    .keyboard(['Изменить роль'])
    .resize()
    .extra());
  await ctx.replyWithMediaGroup(photos);
};

getAlbum.enter(async (ctx) => {
  await ctx.reply('Сейчас найдём альбом с вашими фотографиями 📸');
  const isUserHaveSomeAlbums = true;

  if (isUserHaveSomeAlbums) {
    return ctx.reply('Ого! Похоже что у вас несколько альбомов. За какую дату вы хотите получить альбом?',
      Markup.inlineKeyboard([
        Markup.callbackButton('2020-06-19', '2020-06-19'),
        Markup.callbackButton('2020-08-28', '2020-08-28'),
      ])
        .resize()
        .oneTime()
        .extra());
  }

  const date = '2020-08-28';
  return replyWithAlbum(ctx, date);
});

getAlbum.action(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, async (ctx) => {
  const date = ctx.match[0];
  return replyWithAlbum(ctx, date);
});

getAlbum.hears('Изменить роль', async (ctx) => {
  await ctx.scene.enter('setUserRole');
});

export default getAlbum;
