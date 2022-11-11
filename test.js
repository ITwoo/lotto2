let array = [{ a: { p: 1 } }]

let array2 = array
let array3 = array.map((a) => a)

array[0].a.p = 2
console.log(array[0] === array3[0])

console.log(array)
console.log(array2)
console.log(array3)