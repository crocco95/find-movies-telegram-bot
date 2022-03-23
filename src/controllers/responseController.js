const JustWatchService = require('../services/justWatch.js')

const craftMovieResponse = (result) => {
    let response = `${result.title}\nReleased in ${result.original_release_year}`
    if(result.offers){
      for(const offer of result.offers){

        if(offer.monetization_type && offer.retail_price && offer.currency){
            const prettyProviderName = JustWatchService.getPrettyProviderName(offer.package_short_name)
            response += `[${offer.monetization_type}] At ${offer.retail_price}${offer.currency} on <a href="${offer.urls.standard_web}">${prettyProviderName ?? 'Link'}</a>\n\n`    
          }
      }
    }

    return response
}

const craftActorResponse = (result) => {
  
  console.log(result)
  return "Hello!"
}

module.exports = {
    craftMovieResponse,
    craftActorResponse
}