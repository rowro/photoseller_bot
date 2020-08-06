import { Markup } from 'telegraf';
import Scene from 'telegraf/scenes/base';

const addAlbum = new Scene('addAlbum');

addAlbum.enter(async (ctx) => {
  ctx.session.newAlbum = {
    clientPhone: '',
    photos: [],
  };
  return ctx.reply('Введите номер телефона клиента для которого вы хотите добавить альбом');
});
addAlbum.hears(/^((\+7|7|8)+([0-9]){10})$/, async (ctx) => {
  ctx.session.newAlbum.clientPhone = ctx.match[0];
  await ctx.reply('Загрузите фотографии которые вы хотите добавить в альбом 📸', Markup
    .keyboard([
      'Готово',
    ])
    .resize()
    .extra());
  await ctx.reply('Когда закончите нажмите "Готово"');
});

addAlbum.hears('Готово', async (ctx) => {
  console.log(ctx.session.newAlbum);
  await ctx.reply('Альбом готов 🎉 \nМы отправим клиенту SMS со ссылкой на бота 🤖', Markup
    .keyboard([
      'Добавить альбом',
      'Изменить роль',
    ])
    .resize()
    .extra());
});

addAlbum.hears('Добавить альбом', async (ctx) => {
  await ctx.scene.reenter();
});

addAlbum.hears('Изменить роль', async (ctx) => {
  await ctx.scene.enter('setUserRole');
});

addAlbum.on('message', async (ctx) => {
  if (ctx.update.message && ctx.update.message.photo) {
    const photos = ctx.update.message.photo;
    ctx.session.newAlbum.photos.push(photos[photos.length - 1]);
  }
});

export default addAlbum;
