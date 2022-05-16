class NumberOfUnusualSize{
  constructor(initialValue) {
    const strInitialValue = initialValue.toString()
    this.numberStore = []
    for (let k = 0; k < strInitialValue.length; k++) {
      this.numberStore.push(parseInt(strInitialValue[k]))
    }
  }

  toString() {
    let padding=4
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

  // toString(padding) {
  //   let msd = ''
  //   let lsd = ''
  //   if (padding*2 <= this.numberStore.length) {
  //     for (let k = 0; k < this.numberStore.length && k < padding; k++){
  //       msd += (this.numberStore[k])
  //     }
  //     for (let m = this.numberStore.length-padding; m < this.numberStore.length; m++) {
  //       lsd += (this.numberStore[m])
  //     }
  //     console.log(msd + "..." + lsd)
  //     return msd + "..." + lsd
  //   } else {
  //     console.error("number is much too small for given padding (consider a regular variable??)");
  //   }
  // }

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

}
module.exports = NumberOfUnusualSize