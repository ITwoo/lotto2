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

module.exports = {
    getNumberCountArray,
};