class NumberOfUnusualSize{
  constructor(initialValue) {
    // console.log('iv is ', initialValue)
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
    let padding=1
    let msd = ''
    let lsd = ''
    if (padding*2 <= this.numberStore.length) {
      for (let k = 0; k < this.numberStore.length && k < padding; k++){
        msd += (this.numberStore[k])
      }
      for (let m = this.numberStore.length-padding; m < this.numberStore.length; m++) {
        lsd += (this.numberStore[m])
      }
      console.log(msd + "..." + lsd)
      return msd + "..." + lsd
    } else {
      console.error("number is too small for given padding (consider a regular variable??)");
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
        console.error('Must compare against an int or another NumberOfUnusualSize')
        console.error("type of ", compareNum, "is ", typeof(compareNum))
        return false
      }
    }
  }

  compare = function(compareNum) {
    //compareNum MUST be a NumberOfUnusualSize
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
      console.log('Add function called with ', compareNum, thisNum)
      if (compareNum.length > this.numberStore.length) {
        const zeroPads = compareNum.length - thisNum.length
        for (let k = 0; k < zeroPads; k++) {
          thisNum.unshift(0)
        }
        console.log('this Num is now ', thisNum)
        console.log('compareNum is still ', compareNum)
      } else if (compareNum.length < this.numberStore.length) {
        const zeroPads = thisNum.length - compareNum.length
        for (let k = 0; k < zeroPads; k++) {
          compareNum.unshift(0)
        }
        console.log('this Num is still ', thisNum)
        console.log('compareNum is now ', compareNum)
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
      let k = 0;
      while (sum[k] === 0 && k < sum.length) {
        sum.shift()
        k++
      }
      console.log (`sum is ${sum}`)
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
          lsdIndex = compareNum.length-1-multiplicand1
          let curProd = this.multiplyDigit(thisNum[multiplicand1], compareNum[multiplicand2], prevProd.carry)
            //m1[0][1][7]
            //m2[0][1][3]
            //-----------
            //m3[0][3+2][1]
            // [0][1][7][0]
          productRow.unshift(curProd.product)
          prevProd = curProd
        }
        if (prevProd.carry) {
          productRow.unshift(prevProd.carry)
        }
        for (let k = 0; k < lsdIndex; k++) {
          console.log('pushing 0 now')
          productRow.push(0)

        }
        console.log('Product Row is', productRow)
        totals.push(productRow)
        //console.log('Product Row is', productRow, 'x (10 x', lsdIndex, ')')
      }
      console.log("totals is", totals)
      if (totals.length > 1) {
        let sum = new NumberOfUnusualSize(totals[0])
        for (let k = 1; k < totals.length; k++) {
          let addend = new NumberOfUnusualSize(totals[k])
          sum = sum.add(addend)
        }
        let k = 0;
        while (sum[k] === 0 && k < sum.length) {
          sum.shift()
          k++
        }
        console.log('product is', sum)
      }

    }
  }

}
module.exports = NumberOfUnusualSize