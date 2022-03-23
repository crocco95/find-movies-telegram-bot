const axios = require('axios')

const getPrettyProviderName = (code) => {

    const providers = {
        'vdu': 'Vudu',
        'itu':'Apple TV',
        'amz':'Amazon Video',
        'msf':'Microsoft Store',
        'ply': 'Google Play'
    }

    return providers[code]
}

const searchContent = async (query, language, language_4, type) => {
    console.log(`https://apis.justwatch.com/content/titles/${language_4}/popular`)
    const response = await axios.get(`https://apis.justwatch.com/content/titles/${language_4}/popular`,{
        params: {
            language,
            body: JSON.stringify({
                page_size:1,
                page:1,
                query,
                content_types:[type]
            })
        }
    })

    return response.data
}

const searchActor = async (id, language_4) => {
    const response = await axios.get(`https://apis.justwatch.com/content/titles/person/${id}/locale/${language_4}`)
    return response.data
}

module.exports = {
    getPrettyProviderName,
    searchContent
}