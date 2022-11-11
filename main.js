const getLotto = require('./getData');
const { getNumberCountArray, cutNeedData, getAddNumberCountArray, getAvgCount, sortObjectValue } = require('./calculation');

async function main() {

    let lottoData = await getLotto();

    let numberCountArray = getNumberCountArray(lottoData);

    let needArray = cutNeedData(lottoData);

    let addNumberCountArray = getAddNumberCountArray(lottoData, numberCountArray)

    let avg = getAvgCount(numberCountArray);

    let sortArray = sortObjectValue(addNumberCountArray);

    // console.log(avg)
    // array.reverse(); 역순 정렬
    for (let value of sortArray.reverse()) {
        console.log(value)
    }
    // array["로또번호"-1]


}

module.exports = main;