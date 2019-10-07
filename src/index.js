module.exports = function zeros(expression) {
  let factorials = {
    single: [],
    double: []
  };
  let stringFactorials = expression.split("*");

  function countAllNumberFactorial(numeral, number) {
    let quantityNumber = Math.floor(numeral / number);
    if (Math.floor(quantityNumber / number) >= 1) {
      quantityNumber += countAllNumberFactorial(quantityNumber, number);
    }
    return quantityNumber;
  }
  
  function countAllNumberOddFactorial(numeral, number) {    
    let quantityNumber = numeral / number;  
    if (quantityNumber / number >= 1) {     
      quantityNumber += countAllNumberOddFactorial(numeral, number * number) * 2;
    }    
    return Math.round(quantityNumber / 2);
  }

  
  for (f in stringFactorials) {
    if (stringFactorials[f].indexOf("!!") >= 0 ) {
      factorials.double.push(stringFactorials[f].replace("!!", ""));
    } else {
      factorials.single.push(stringFactorials[f].replace("!", "")) 
    }
  }

  let quantityTwo = 0, quantityFive = 0, quantityTen = 0;

  for (f in factorials.single) {
    quantityFive += countAllNumberFactorial(factorials.single[f], 5);
    quantityTwo += countAllNumberFactorial(factorials.single[f], 2);
  }

  for (f in factorials.double) {
    if (factorials.double[f] % 2 === 0) {
      quantityTwo += countAllNumberFactorial(factorials.double[f], 2);
      let currentQuantityTen = countAllNumberFactorial(factorials.double[f], 10);
      quantityTen += currentQuantityTen; 
      quantityFive += Math.round(currentQuantityTen / 10);
    } else {
      quantityFive += countAllNumberOddFactorial(factorials.double[f], 5);
    } 
  }
  res = quantityFive + quantityTen;
  if (res > quantityTwo) {
    res = quantityTwo;
  }
  return res;
}