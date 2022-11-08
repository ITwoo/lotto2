const getLotto = require('./getData');
const { getNumberCountArray, cutNeedData, getAddNumberCountArray, getAvgCount } = require('./calculation');

async function main() {

    let lottoData = await getLotto();

    let numberCountArray = getNumberCountArray(lottoData);

    let needArray = cutNeedData(lottoData);

    let addNumberCountArray = getAddNumberCountArray(lottoData, numberCountArray)

    let avg = getAvgCount(numberCountArray);

    // console.log(avg)

    for (let value of addNumberCountArray) {
        console.log(value)
    }
    // array["로또번호"]


}

module.exports = main;