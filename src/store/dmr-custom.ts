import { Metric } from './base'

export class DmrCustom {
  public static inst: DmrCustom

  private _globalAdjustMetric: Metric
  private _changeCallback: (
    maxNumberWidthChanged?: boolean,
    autoSizeChanged?: boolean,
  ) => void

  constructor(
    globalAdjustMetric: Metric,
    changeCallback: (
      maxNumberWidthChanged?: boolean,
      autoSizeChanged?: boolean,
    ) => void,
  ) {
    DmrCustom.inst = this

    this._globalAdjustMetric = globalAdjustMetric
    this._changeCallback = changeCallback
  }

  public setNumberSize(width: number, height: number) {
    if (this._globalAdjustMetric.numberWidth < width) {
      this._globalAdjustMetric.setNumberWidth(width)
    }

    if (this._globalAdjustMetric.numberHeight < height) {
      this._globalAdjustMetric.setNumberHeight(height)
    }

    return true
  }

  public onGlobalMetricChanged(
    widthChanged?: boolean,
    autoSizeChanged?: boolean,
  ) {
    typeof this._changeCallback === 'function' &&
      this._changeCallback(widthChanged, autoSizeChanged)
  }
}
