import { action, makeObservable, observable } from 'mobx'

class Metric {
  xAdvance = 0

  xOffset = 0

  yOffset = 0

  numberWidth = 32

  constructor(metric: Partial<Metric> = {}) {
    makeObservable(this, {
      xAdvance: observable,
      xOffset: observable,
      yOffset: observable,
      numberWidth: observable,
      setXAdvance: action.bound,
      setXOffset: action.bound,
      setYOffset: action.bound,
      setNumberWidth: action.bound,
    })
    this.xAdvance = metric.xAdvance || 0
    this.xOffset = metric.xOffset || 0
    this.yOffset = metric.yOffset || 0
    this.numberWidth = metric.numberWidth || 32
  }

  setXAdvance(xAdvance: number): void {
    this.xAdvance = xAdvance
  }

  setXOffset(xOffset: number): void {
    this.xOffset = xOffset
  }

  setYOffset(yOffset: number): void {
    this.yOffset = yOffset
  }

  setNumberWidth(numberWidth: number): void {
    this.numberWidth = numberWidth
  }
}

export default Metric
