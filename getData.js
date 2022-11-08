const axios = require('axios');
const iconv = require('iconv-lite');
const { parse } = require('node-html-parser');
const XLSX = require('xlsx');
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
    let dataReplace = data.replace('charset=EUC-KR', '')
    // parseData = parse(data)

    // console.log(parseData.querySelector('html body table[border]').toString())
    let localFilePath = 'temp.xls';

    fs.writeFileSync(localFilePath, dataReplace, { encoding: 'utf8' });

    let workbook = XLSX.readFile(localFilePath, { cellDates: true });

    let sheetName = workbook.SheetNames[1];

    let worksheet = workbook.Sheets[sheetName];

    let range = XLSX.utils.decode_range(worksheet['!ref']);

    let isFoundKeys = false;

    // XLSX.utils.sheet_add_aoa(worksheet, [[1, 2], [2, 3], [3, 4]], { origin: "A2" });
    // XLSX.utils.sheet_add_json(worksheet, [
    //     { A: '년도', B: '회차', C: '추첨일' }
    // ], { skipHeader: true, origin: "A2" });

    while (true) {

        let firstRow = XLSX.utils.sheet_to_json(worksheet, { range: range, defval: null })[0];

        let cnt = 0;

        for (let v of Object.keys(firstRow)) {

            if (v === "1" || v === "2" || v === "3" || v === "4" || v === "5" || v === "6" || v === "보너스") {

                cnt++;

            }

        }

        if (cnt === 7) {

            isFoundKeys = true;

            break;

        }

        if (range.e.r === range.s.r + 1) break;

        range.s.r++;

    }

    worksheet["!merges"].map((merge) => {

        let range = XLSX.utils.encode_range(merge).split(':')[0];
        // let range = XLSX.utils.encode_range(merge);

        const value = worksheet[range];


        // console.log(merge)
        // console.log(range)
        // console.log(value)
        // console.log('-----')

        for (let i = merge.s.r; i <= merge.e.r; i++) {
            for (let j = merge.s.c; j <= merge.e.c; j++) {
                let cellPosition = XLSX.utils.encode_col(j) + XLSX.utils.encode_row(i);
                // console.log(cellPosition)
                // console.log(worksheet[cellPosition])
                worksheet[cellPosition] = value
                // console.log(worksheet[cellPosition])
                // console.log(worksheet[cellPosition] = value)

            }
        }
    })

    if (isFoundKeys || true) {

        const rows = XLSX.utils.sheet_to_json(worksheet, { range: range, defval: null });
        for (let row of rows) {
            console.log(row)

        }
    }

    fs.unlink(localFilePath, (reason) => {

        if (reason) {



        }

    });

})()
// axios.get('https://dhlottery.co.kr/gameResult.do?method=allWinExel&nowPage=1&drwNoStart=1&drwNoEnd=1040')

//#drwNoEnd option:selected