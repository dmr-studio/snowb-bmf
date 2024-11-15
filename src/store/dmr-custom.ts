import { Metric } from './base'

export class DmrCustom {
  public static inst: DmrCustom

  private _globalAdjustMetric: Metric

  private _changeCallback: (
    maxNumberWidthChanged?: boolean,
    autoSizeChanged?: boolean,
  ) => void

  private _onImageGlyphChanged: () => void

  private _numberSizeMap: Map<
    string,
    { letter: string; width: number; height: number }
  > = new Map()

  constructor(
    globalAdjustMetric: Metric,
    changeCallback: (
      maxNumberWidthChanged?: boolean,
      autoSizeChanged?: boolean,
    ) => void,
    onImageGlyphChanged: () => void,
  ) {
    DmrCustom.inst = this

    this._globalAdjustMetric = globalAdjustMetric
    this._changeCallback = changeCallback
    this._onImageGlyphChanged = onImageGlyphChanged
  }

  public setNumberSize(letter: string, width: number, height: number) {
    const isNumber = '0123456789'.includes(letter)
    if (!isNumber) return

    this._numberSizeMap.set(letter, {
      letter: letter,
      width: width,
      height: height,
    })
    const mapArr = Array.from(this._numberSizeMap.values())

    const numberWidth = mapArr.reduce(
      (accumulator, currentValue) => Math.max(accumulator, currentValue.width),
      0,
    )
    const numberHeight = mapArr.reduce(
      (accumulator, currentValue) => Math.max(accumulator, currentValue.height),
      0,
    )

    this._globalAdjustMetric.setNumberWidth(numberWidth)
    this._globalAdjustMetric.setNumberHeight(numberHeight)
  }

  public onGlobalMetricChanged(
    widthChanged?: boolean,
    autoSizeChanged?: boolean,
  ) {
    typeof this._changeCallback === 'function' &&
      this._changeCallback(widthChanged, autoSizeChanged)
  }

  public onGlyphChange() {
    typeof this._onImageGlyphChanged === 'function' &&
      this._onImageGlyphChanged()
  }
}
