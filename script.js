const { Telegraf } = require('telegraf');
const axios = require('axios');
const BOT_TOKEN = '1806807163:AAG-B1Em5dL2wzM_-C6c4vIX7-l1gAgtfYk';

const bot = new Telegraf('1806807163:AAG-B1Em5dL2wzM_-C6c4vIX7-l1gAgtfYk');
bot.start((ctx) => {
  ctx.reply('hi');
});
let DATA = {};
bot.command('invc', async (ctx) => {
  // Send a POST request

  let id = ctx.message.text.slice(6, 15);
  if (id.length !== 9) {
    return ctx.reply('There is no such an order ID');
  } else {
    ctx.reply('Got it, please wait...', {
      reply_to_message_id: ctx.message.message_id,
    });
    await axios({
      method: 'get',
      url: 'https://invoice-server-stax.herokuapp.com/invoice',
      data: {
        order_id: id,
      },
    })
      .then(function (res) {
        console.log(res.status, res.data);
        DATA = res.data;
      })
      .catch(function (error) {
        ctx.reply(error);
        console.log(error);
      });

    await axios({
      method: 'get',
      url: 'https://invoice-server-stax.herokuapp.com/getInv',
      data: {},
    })
      .then(function (res) {
        console.log(res.status, res.data);
        if (res.data == 'success') {
          ctx.reply('Invoice has been sent to customer`s phone and email', {
            reply_to_message_id: ctx.message.message_id,
          });
        }
      })
      .catch(function (error) {
        ctx.reply(error);
        console.log(error);
      });
  }
});

console.log('Server run');
bot.launch();
