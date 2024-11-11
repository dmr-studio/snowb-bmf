import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { toJS } from 'mobx'
import { Project } from 'src/store'
import drawPackCanvas from 'src/utils/drawPackCanvas'

import { encode } from '../conversion'
import toBmfInfo from './toBmfInfo'
import { ConfigItem } from './type'

export default function exportFile(
  project: Project,
  wsProject: Project,
  config: ConfigItem,
  fontName: string,
  fileName: string,
): void {
  const zip = new JSZip()
  const { packCanvas, glyphList, name, layout, ui } = project
  const bmfont = toBmfInfo(project, fontName)
  let text = config.getString(bmfont)
  const saveFileName = fileName || name

  if (name !== saveFileName) {
    text = text.replace(`file="${name}.png"`, `file="${saveFileName}.png"`)
  }

  zip.file(`${saveFileName}.${config.ext}`, text)
  try {
    const buffer = encode(toJS(project))
    zip.file(`${saveFileName}.sbf`, new Blob([buffer]))
  } catch (e) {}

  const canvas = document.createElement('canvas')
  canvas.width = ui.width
  canvas.height = ui.height
  drawPackCanvas(canvas, packCanvas, glyphList, layout.padding)

  canvas.toBlob((blob) => {
    if (blob) zip.file(`${saveFileName}.png`, blob)
    zip
      .generateAsync({ type: 'blob' })
      .then((content) => saveAs(content, `${saveFileName}.zip`))
  })
}
