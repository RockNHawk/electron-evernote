const Common = require('./common')
let Evernote = require('evernote')

function oauthClient () {
    var clienOptions = {
        consumerKey: Common.CONSUMER_KEY,
        consumerSecret: Common.CONSUMER_SECRET,
        sandbox: Common.SANDBOX,
        china: Common.CHINA
    }
    return new Evernote.Client(clienOptions)
}

function noteClient (token) {
    return new Evernote.Client({
        token: token,
        sandbox: Common.SANDBOX,
        china: Common.CHINA
    })
}

module.exports =  {
    oauthClient,
    noteClient
}