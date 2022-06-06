class NumberOfUnusualSize{
  //accepts arrays, numbers, and strings as initial values
  constructor(initialValue) {
    this.numberStore = []
    if (Array.isArray(initialValue)) {
      this.numberStore = initialValue
    } else {
      const strInitialValue = initialValue.toString()

      for (let k = 0; k < strInitialValue.length; k++) {
        this.numberStore.push(parseInt(strInitialValue[k]))
      }
    }

  }

  toString() {
    let msd = ''
    // if (this.numberStore.length < 400) {
    if (true) {
      for (let k = 0; k < this.numberStore.length; k++){
        msd += (this.numberStore[k])
      }
      return msd
    } else { //breaking tests
      let padding=100
      let lsd = ''
      if (padding*2 <= this.numberStore.length) {
        for (let k = 0; k < this.numberStore.length && k < padding; k++){
          msd += (this.numberStore[k])
        }
        for (let m = this.numberStore.length-padding; m < this.numberStore.length; m++) {
          lsd += (this.numberStore[m])
        }
        return msd + "..." + lsd
      } else {
        console.error("number is too small for given padding (consider a regular variable??)");
      }
    }
  }

  equals = function(compareNum) {
    if (compareNum instanceof NumberOfUnusualSize) {
      return this.compare(compareNum)
    } else {
      if (typeof(compareNum) === "number"){
        const cn = new NumberOfUnusualSize(compareNum)
        return this.equals(cn)
      } else {
        console.error('Must compare against a number or another NumberOfUnusualSize')
        console.error("type of ", compareNum, " is ", typeof(compareNum))
        return false
      }
    }
  }

  compare = function(compareNum) {
    //compareNum MUST be a NumberOfUnusualSize
    while (compareNum.numberStore[0] === 0 && compareNum.numberStore.length > 1) {
      compareNum.numberStore.shift()
    }
    while (this.numberStore[0] === 0 && this.numberStore.length > 1) {
      this.numberStore.shift()
    }
    if (compareNum.numberStore.length !== this.numberStore.length) {
      return false
    } else {
      for (let k = 0; k < this.numberStore.length; k++) {
        if(this.numberStore[k] !== compareNum.numberStore[k]) {
          return false
        }
      }
    }
    return true
  }

  addDigit = function(top, bottom, carry) {
    let sum = top + bottom + carry;
    let charSum = sum.toString();
    let returnCarry = 0;
    if (sum > 9) {
      returnCarry = 1;
    }

    return {
      sum: parseInt(charSum[charSum.length-1]),
      carry: returnCarry
    }
  }

  add = function(addend) {
    if (addend instanceof NumberOfUnusualSize) {
      let compareNum = addend.numberStore;
      let thisNum = this.numberStore;
      if (compareNum.length > this.numberStore.length) {
        const zeroPads = compareNum.length - thisNum.length
        for (let k = 0; k < zeroPads; k++) {
          thisNum.unshift(0)
        }
      } else if (compareNum.length < this.numberStore.length) {
        const zeroPads = thisNum.length - compareNum.length
        for (let k = 0; k < zeroPads; k++) {
          compareNum.unshift(0)
        }
      }
      let prevState = {sum: 0, carry: 0}
      let sum = []
      for (let k = thisNum.length-1; k >= 0; k--) {
        let curState = this.addDigit(thisNum[k], compareNum[k], prevState.carry)
        sum.unshift(curState.sum)
        prevState = curState;
      }
      if (prevState.carry > 0){
        sum.unshift(1)
      }
      while (sum[0] === 0 && sum.length > 1) {
        sum.shift()
      }
      return new NumberOfUnusualSize(sum)
    }
  }

  multiplyDigit = function(bottom, top, carry) {
    let sum = (top * bottom) + carry;
    let charSum = sum.toString();
    let returnCarry = 0;
    if (sum > 9) {
      returnCarry = parseInt(charSum.substr(0, charSum.length-1));
    }

    return {
      product: parseInt(charSum[charSum.length-1]),
      carry: returnCarry
    }
  }

  multiply = function(multiplicand) {
    if (multiplicand instanceof NumberOfUnusualSize) {
      let compareNum = multiplicand.numberStore;
      let thisNum = this.numberStore;
      let totals = []
      for (let multiplicand1 = this.numberStore.length-1; multiplicand1 >= 0; multiplicand1--) {
        let prevProd = {product: 1, carry: 0}
        let productRow = []
        let lsdIndex = undefined
        for (let multiplicand2 = compareNum.length-1; multiplicand2 >=0; multiplicand2--) {
          lsdIndex = this.numberStore.length-1-multiplicand1
          let curProd = this.multiplyDigit(thisNum[multiplicand1], compareNum[multiplicand2], prevProd.carry)
          productRow.unshift(curProd.product)
          prevProd = curProd
        }
        if (prevProd.carry) {
          productRow.unshift(prevProd.carry)
        }
        for (let k = 0; k < lsdIndex; k++) {
          productRow.push(0)
        }
        totals.push(productRow)
      }

      if (totals.length > 0) {
        let sum = new NumberOfUnusualSize(totals[0])
        for (let k = 1; k < totals.length; k++) {
          let addend = new NumberOfUnusualSize(totals[k])
          sum = sum.add(addend)
        }
        while (sum.numberStore[0] === 0 && sum.numberStore.length > 1) {
          sum.numberStore.shift()
        }
        return sum
      }
    } else {
      console.error("ERROR: can only multiply by another NOUS")
    }
  }

  pow = function(exp) {
    let multiplicand = new NumberOfUnusualSize(this.numberStore)
    let product = new NumberOfUnusualSize(this.numberStore)
    let exponent = new NumberOfUnusualSize(exp)

    if (exponent instanceof NumberOfUnusualSize) {
      while (exponent.getValue() > 1) {
        product = product.multiply(multiplicand)
        exponent.decrement()
      }
    } else {
      for (let k = 1; k < exponent; k++) {
        product = product.multiply(multiplicand)
      }
    }


    while (product.numberStore[0] === 0 && product.numberStore.length > 1) {
      product.numberStore.shift()
    }
    return product
  }

  getValue = function() {
    if (this.numberStore.length > 22) {
      return Infinity
    } else {
      let value = '';
      this.numberStore.forEach(digit => {
        value += digit
      })
      return parseInt(value)
    }
  }

  subtractDigit = function(minuend, subtrahend, carry) {
    let difference = minuend - subtrahend - carry;
    let returnCarry = 0;
    if (difference < 0) {
      difference += 10
      returnCarry = 1
    }
    return {
      difference: difference,
      carry: returnCarry
    }
  }

  decrement = function() {
    let isZero = true;
    for (let k = 0; k < this.numberStore.length; k++) {
      if (this.numberStore[k] != 0) {
        isZero = false
      }
    }
    if (!isZero) {
      let compareNum = [1];
      let thisNum = this.numberStore;

      const zeroPads = thisNum.length - compareNum.length
      for (let k = 0; k < zeroPads; k++) {
        compareNum.unshift(0)
      }

      let prevState = {difference: 0, carry: 0}
      let difference = []
      for (let k = thisNum.length-1; k >= 0; k--) {
        let curState = this.subtractDigit(thisNum[k], compareNum[k], prevState.carry)
        difference.unshift(curState.difference)
        prevState = curState;
      }
      if (prevState.carry > 0){
        console.error('this should never happen since we are not decrementing from zero')
      }
      while (difference[0] === 0 && difference.length > 1) {
        difference.shift()
      }

      this.numberStore = difference
    }
  }
}
module.exports = NumberOfUnusualSize