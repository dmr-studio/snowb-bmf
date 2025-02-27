import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'
import React, { FunctionComponent } from 'react'
import { useStyle } from 'src/store/hooks'

import FormColor from '../../../common/FormColor'

const BackgroundPreviewColor: FunctionComponent<unknown> = () => {
  const { bgPreviewColor, setBgPreviewColor } = useStyle()

  return (
    <>
      <Box
        component='label'
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          my: 4,
        }}
      >
        <Typography>Background Preview Color</Typography>
      </Box>
      <Box
        sx={{
          px: 2,
          my: 4,
        }}
      >
        <FormColor color={bgPreviewColor || ''} onChange={setBgPreviewColor} />
      </Box>
    </>
  )
}

export default observer(BackgroundPreviewColor)
