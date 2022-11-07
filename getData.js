const axios = require('axios');
const iconv = require('iconv-lite');
const HtmlTableToJson = require('html-table-to-json');
const {parse} = require('node-html-parser');
const xlsx = require('xlsx');
const fs = require('fs');

const headers = {
    'responseType': 'arraybuffer',
};
    
(async () => {
    
    let response = await axios.get('https://dhlottery.co.kr/gameResult.do?method=allWin');
    let responseData = response.data;

    let parseData = parse(responseData)

    let lastNumber = parseData.querySelector('#drwNoEnd option:selected').text;

    response = await axios.get(`https://dhlottery.co.kr/gameResult.do?method=allWinExel&nowPage=1&drwNoStart=1&drwNoEnd=${lastNumber}`, headers);
    responseData = response.data;

    let contentType = response.headers['content-type']

    let charset = contentType.includes('charset=')
        ? contentType.split('charset=')[1]
        : 'UTF-8';
    
    let data = iconv.decode(responseData, charset);
    parseData = parse(data)

    console.log(parseData.querySelector('html body table[border]').toString())

})()
// axios.get('https://dhlottery.co.kr/gameResult.do?method=allWinExel&nowPage=1&drwNoStart=1&drwNoEnd=1040')

//#drwNoEnd option:selected