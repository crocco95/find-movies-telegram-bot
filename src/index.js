const TelegramBot = require('node-telegram-bot-api');
const JustWatchService = require('./services/justWatch.js')
const ResponseController = require('./controllers/responseController.js')


// replace the value below with the Telegram token you receive from @BotFather
const token = 'abcd';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/movie (.+)/, async (msg, match) => {

  const chatId = msg.chat.id;
  let lang = 'en_US'

  switch(msg.from.language_code){
    case 'it':
      lang = 'it_IT'
    case 'es':
      lang = 'es_ES'
    case 'fr':
      lang = 'fr_FR'
      break;
  }

  const results = await JustWatchService.searchContent(match[1], msg.language_code, lang, 'movie')

  for(const result of results.items){
    
    const response = ResponseController.craftMovieResponse(result)

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, response,{
      parse_mode: "HTML"
    });
  }  
});


bot.onText(/\/actor (.+)/, async (msg, match) => {

  const chatId = msg.chat.id;
  const results = await JustWatchService.searchContent(match[1], msg.language_code, 'person')

  for(const result of results.items){
    
    const response = ResponseController.craftActorResponse(result)

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, response,{
      parse_mode: "HTML"
    });
  }  
});
