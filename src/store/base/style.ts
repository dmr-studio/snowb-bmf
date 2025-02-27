import { action, makeObservable, observable } from 'mobx'

import Fill from './fill'
import Font from './font'
import Shadow from './shadow'
import Stroke from './stroke'

class Style {
  readonly font: Font

  readonly fill: Fill

  useStroke: boolean

  readonly stroke: Stroke

  useShadow: boolean

  readonly shadow: Shadow

  bgColor = 'rgba(0,0,0,0)'
  bgPreviewColor = 'rgba(0,0,0,0)'

  constructor(style: Partial<Style> = {}) {
    makeObservable(this, {
      font: observable,
      fill: observable,
      useStroke: observable,
      stroke: observable,
      useShadow: observable,
      shadow: observable,
      bgColor: observable,
      bgPreviewColor: observable,
      setUseStroke: action.bound,
      setUseShadow: action.bound,
      setBgColor: action.bound,
      setBgPreviewColor: action.bound,
    })
    this.font = new Font(style.font)
    this.fill = new Fill(style.fill)
    this.stroke = new Stroke(style.stroke)
    this.shadow = new Shadow(style.shadow)
    this.useShadow = !!style.useShadow
    this.useStroke = !!style.useStroke
  }

  setUseStroke(useStroke: boolean): void {
    this.useStroke = useStroke
  }

  setUseShadow(useShadow: boolean): void {
    this.useShadow = useShadow
  }

  setBgColor(bgColor: string): void {
    this.bgColor = bgColor
  }

  setBgPreviewColor(bgColor: string): void {
    this.bgPreviewColor = bgColor
  }
}

export default Style
