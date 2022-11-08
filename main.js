const getLotto = require('./getData');
const getNumberCountArray = require('./calculation');

async function main() {

    let lottoData = await getLotto();
    // console.log(typeof (lottoData))
    console.log(getNumberCountArray(lottoData));
    // for (let lotto of lottoData) {
    //     console.log(lotto)
    // }

}

module.exports = main;