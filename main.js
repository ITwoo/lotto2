const getLotto = require('./getData');
const { getNumberCountArray, cutNeedData, getAddNumberCountArray, getAvgCount, sortObjectValue, writeCountMap, writeSortArray } = require('./calculation');
const fs = require('fs')

async function main() {

    let lottoData = await getLotto();

    let numberCountArray = getNumberCountArray(lottoData);

    let needArray = cutNeedData(lottoData);

    let addNumberCountArray = getAddNumberCountArray(lottoData, numberCountArray)

    let avg = getAvgCount(numberCountArray);

    let sortArray = sortObjectValue(addNumberCountArray);

    // writeCountMap("countMap.txt", sortArray);
    writeSortArray("sortArray.txt", numberCountArray);
    console.log(numberCountArray)
}

module.exports = main;