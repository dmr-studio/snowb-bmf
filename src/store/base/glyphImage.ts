import { action, makeObservable, observable, runInAction } from 'mobx'
import getTrimImageInfo from 'src/utils/getTrimImageInfo'

import { DmrCustom } from '../dmr-custom'
import GlyphBase, { GlyphType } from './glyphBase'
import Metric from './metric'

export interface FileInfo {
  letter?: string
  fileName: string
  fileType: string
  buffer: ArrayBuffer
}

class GlyphImage extends GlyphBase {
  readonly type: GlyphType = 'image'

  src = ''

  source: HTMLImageElement | HTMLCanvasElement | null = null

  buffer: ArrayBuffer | null = null

  fileName = ''

  fileType = ''

  selected = true

  constructor(glyphImage: Partial<GlyphImage>, newLoad: boolean = true) {
    super(glyphImage)
    makeObservable(this, {
      src: observable,
      fileName: observable,
      fileType: observable,
      selected: observable,
      buffer: observable.ref,
      initImage: action.bound,
      setGlyph: action.bound,
      changeSelect: action.bound,
    })
    this.letter = glyphImage.letter || ''
    this.fileName = glyphImage.fileName || ''
    this.fileType = glyphImage.fileType || ''
    this.buffer = glyphImage.buffer || null

    if (glyphImage.buffer) {
      this.src = URL.createObjectURL(new Blob([glyphImage.buffer]))
      this.initImage(newLoad)
    }
  }

  initImage(newLoad: boolean = true): Promise<void> {
    return new Promise((resolve) => {
      const image = new Image()
      image.onload = () => {
        runInAction(() => {
          const { naturalWidth, naturalHeight } = image
          const isNumber = '0123456789'.includes(this.letter)
          if (isNumber && newLoad) {
            DmrCustom.inst.setNumberSize(
              this.letter,
              naturalWidth,
              naturalHeight,
            )
          }

          if (isNumber && this.adjustMetric.autoNumberSize) {
            this.fontWidth = this.adjustMetric.numberWidth
            this.fontHeight = naturalHeight

            const trimInfo = getTrimImageInfo(image, 0, this.adjustMetric)
            this.width = this.adjustMetric.numberWidth
            this.height = trimInfo.height
            this.trimOffsetLeft = trimInfo.trimOffsetLeft
            this.trimOffsetTop = trimInfo.trimOffsetTop

            this.source = trimInfo.canvas
          } else {
            this.fontWidth = naturalWidth
            this.fontHeight = naturalHeight

            const trimInfo = getTrimImageInfo(image)
            this.width = trimInfo.width
            this.height = trimInfo.height
            this.trimOffsetLeft = trimInfo.trimOffsetLeft
            this.trimOffsetTop = trimInfo.trimOffsetTop

            this.source = trimInfo.canvas
          }
          resolve()
        })
      }
      image.src = this.src
    })
  }

  setGlyph(text: string): void {
    this.letter = text[0] || ''
    DmrCustom.inst.onGlyphChange()
  }

  changeSelect(isSelect: boolean): void {
    this.selected = isSelect
  }

  setAdjustmentMatrix(adjustmentMatrix: Metric): void {
    this.adjustMetric.numberWidth = adjustmentMatrix.numberWidth
    this.adjustMetric.autoNumberSize = adjustmentMatrix.autoNumberSize
  }
}

export default GlyphImage
