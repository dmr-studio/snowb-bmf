export class DmrCustom {
  public static inst: DmrCustom

  public maxNumberWidth: number = 0
  public maxNumberHeight: number = 0

  private _changeCallback: (
    maxNumberWidth: number,
    maxNumberHeight: number,
  ) => void
  constructor(
    changeCallback: (maxNumberWidth: number, maxNumberHeight: number) => void,
  ) {
    DmrCustom.inst = this

    this._changeCallback = changeCallback
  }

  public setNumberSize(width: number, height: number) {
    let changed = false

    if (this.maxNumberWidth < width) {
      this.maxNumberWidth = width
      changed = true
    }
    if (this.maxNumberHeight < height) {
      this.maxNumberHeight = height
      changed = true
    }

    if (changed) {
      this.onGlobalMetricChanged(this.maxNumberWidth, this.maxNumberHeight)
    }

    return true
  }

  public onGlobalMetricChanged(width: number, height: number) {
    typeof this._changeCallback === 'function' &&
      this._changeCallback(width, height)
  }
}
