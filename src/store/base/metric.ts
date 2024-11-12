import { action, makeObservable, observable } from 'mobx'

import { DmrCustom } from '../dmr-custom'

class Metric {
  xAdvance = 0

  xOffset = 0

  yOffset = 0

  autoNumberSize = false
  numberWidth = 0
  numberHeight = 0

  constructor(metric: Partial<Metric> = {}) {
    makeObservable(this, {
      xAdvance: observable,
      xOffset: observable,
      yOffset: observable,
      autoNumberSize: observable,
      numberWidth: observable,
      numberHeight: observable,
      setXAdvance: action.bound,
      setXOffset: action.bound,
      setYOffset: action.bound,
      setAutoNumberSize: action.bound,
      setNumberWidth: action.bound,
      setNumberHeight: action.bound,
    })
    this.xAdvance = metric.xAdvance || 0
    this.xOffset = metric.xOffset || 0
    this.yOffset = metric.yOffset || 0
    this.autoNumberSize = metric.autoNumberSize || false
    this.numberWidth = metric.numberWidth || 0
    this.numberHeight = metric.numberHeight || 0
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

  setAutoNumberSize(auto: boolean): void {
    if (this.autoNumberSize === auto) return

    this.autoNumberSize = auto
    DmrCustom.inst.onGlobalMetricChanged(false, true)
  }

  setNumberWidth(numberWidth: number): void {
    if (this.numberWidth === numberWidth) return

    this.numberWidth = numberWidth
    DmrCustom.inst.onGlobalMetricChanged(true)
  }

  setNumberHeight(numberHeight: number): void {
    if (this.numberHeight === numberHeight) return

    this.numberHeight = numberHeight
  }
}

export default Metric
