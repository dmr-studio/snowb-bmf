import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useProject, useProjectUi } from 'src/store/hooks'

const Glyphs: FunctionComponent<unknown> = () => {
  const { text, setText } = useProject()
  const [isIME, setIsIME] = useState(false)
  const [inputText, setInputText] = useState(text)
  const { previewText, setPreviewText } = useProjectUi()

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target
    const str = Array.from(new Set(Array.from(value))).join('')
    if (isIME) {
      setInputText(value)
    } else {
      setInputText(str)
      if (str !== text) {
        setPreviewText(str)
        setText(str)
      }
    }
  }

  const handleCompositionStart = useCallback((): void => {
    setInputText(text)
    setIsIME(true)
  }, [text])

  const handleCompositionEnd = (): void => {
    setIsIME(false)
    const str = Array.from(new Set(Array.from(inputText))).join('')
    setInputText(str)
    if (str !== text) {
      setPreviewText(str)
      setText(str)
    }
  }

  useEffect(() => {
    setInputText(text)
  }, [text])

  return (
    <>
      <Box sx={{ px: 2, my: 4 }}>
        <Typography>Glyphs</Typography>
      </Box>
      <Box sx={{ px: 2, my: 4 }}>
        <TextField
          margin='none'
          value={isIME ? inputText : text}
          fullWidth
          multiline
          rows={4}
          variant='outlined'
          inputProps={{ spellCheck: false }}
          size='small'
          onChange={handleInput}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
        />
      </Box>
    </>
  )
}

export default observer(Glyphs)
