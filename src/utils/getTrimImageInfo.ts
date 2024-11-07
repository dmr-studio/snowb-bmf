import { Metric } from '../store'
import trimImageData, { TrimImageInfo } from './trimImageData'

interface TrimInfo extends TrimImageInfo {
  canvas: HTMLCanvasElement
}

export default function getTrimImageInfo(
  image: HTMLImageElement,
  threshold = 0,
  metric?: Metric,
): TrimInfo {
  const width = image.naturalWidth
  const height = image.naturalHeight

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  ctx.drawImage(image, 0, 0)
  const imageData = ctx.getImageData(0, 0, width, height)
  const trimInfo = trimImageData(imageData, threshold)

  if (metric) {
    canvas.width = metric.numberWidth
    canvas.height = trimInfo.height
    ctx.translate(Math.round((metric.numberWidth - image.naturalWidth) / 2), 0)
    ctx.drawImage(image, trimInfo.trimOffsetLeft, trimInfo.trimOffsetTop)
  } else {
    canvas.width = trimInfo.width
    canvas.height = trimInfo.height
    ctx.drawImage(image, trimInfo.trimOffsetLeft, trimInfo.trimOffsetTop)
  }

  return {
    canvas,
    ...trimInfo,
  }
}
