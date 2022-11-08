function getNumberCountArray(lottoData) { // 각 숫자번호 별로 나온 횟수 확인
    let array = [];

    for (let lotto of lottoData) {
        for (let col in lotto) {
            switch (col) {
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '보너스':
                    array[lotto[col] - 1] = array[lotto[col] - 1] ? array[lotto[col] - 1] + 1 : 1;
                    break;
                default:
                    break;
            }
        }
    }

    return array;
}

function cutNeedData(lottoData) {
    let array = lottoData.map((data) => {
        return {
            '회차': data["회차"],
            '1': data["1"],
            '2': data["2"],
            '3': data["3"],
            '4': data["4"],
            '5': data["5"],
            '6': data["6"],
            '보너스': data["보너스"],
        }
    })
    return array;
}

function getAddNumberCountArray(lottoData, countArray) {
    let array = lottoData.map((data) => {
        let avg = (countArray[data["1"] - 1] +
            countArray[data["2"] - 1] +
            countArray[data["3"] - 1] +
            countArray[data["4"] - 1] +
            countArray[data["5"] - 1] +
            countArray[data["6"] - 1] +
            countArray[data["보너스"] - 1]) / 7;
        return {
            '회차': data["회차"],
            '1': data["1"],
            '2': data["2"],
            '3': data["3"],
            '4': data["4"],
            '5': data["5"],
            '6': data["6"],
            ['count ' + data["1"]]: countArray[data["1"] - 1],
            ['count ' + data["2"]]: countArray[data["2"] - 1],
            ['count ' + data["3"]]: countArray[data["3"] - 1],
            ['count ' + data["4"]]: countArray[data["4"] - 1],
            ['count ' + data["5"]]: countArray[data["5"] - 1],
            ['count ' + data["6"]]: countArray[data["6"] - 1],
            ['count ' + data["보너스"]]: countArray[data["보너스"] - 1],
            '보너스': data["보너스"],
            'avg': avg,
        }
    })
    return array;
}

function getAvgCount(countArray) {

    let total = countArray.reduce((sum, currentValue) => {
        return sum + currentValue;
    });

    let avg = total / countArray.length;

    return avg;
}

module.exports = {
    getNumberCountArray,
    cutNeedData,
    getAddNumberCountArray,
    getAvgCount,
};