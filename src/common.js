/**
 * created by Leetao
 */

'use strict'

class Common {

}

Common.DEBUG_MODE = true

Common.WINDOW_SIZE = {
    width: 1036,
    height: 556
};

Common.WINDOW_SIZE_LOGIN = {
    width: 800,
    height: 600
}

if (Common.DEBUG_MODE) {
    Common.DOMAIN = 'https://sandbox.evernote.com'
    Common.SANDBOX = true
} else {
    Common.DOMAIN = 'https://app.yinxiang.com'
    Common.SANDBOX = false
}

Common.ELECTRONIC_EVERNOTE = 'Electronic Evernote'

Common.CONSUMER_KEY = '501257367-1380'

Common.CONSUMER_SECRET = 'b56c3ebafa1d0848'

Common.CHINA = true

Common.CALL_BACK_URL = 'http://localhost'

Common.CALL_BACK_URL_REGXP = /http:\/\/localhost/

/**
 * 提取 <en-note> </en-note> 中的内容
 * 
 * @param {*} content 
 */
Common.getNote = function (Enmlcontent) {

    // 贪婪匹配 忽略大小写
    var pattern = /<en-note>([\r\n\s\S]+)<\/en-note>/i
    var matches = pattern.exec(Enmlcontent);
    return matches[1]
};

/**
 * 生成符合格式的 evernote 的 笔记内容
 * 
 * @param {*} content 
 */
Common.makeNote = function (content) {
    // 提取有用部分代码
    var nBody = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    nBody += "<!DOCTYPE en-note SYSTEM \"http://xml.evernote.com/pub/enml2.dtd\">";
    nBody += "<en-note>" + content + "</en-note>";

    return nBody
};

module.exports = Common