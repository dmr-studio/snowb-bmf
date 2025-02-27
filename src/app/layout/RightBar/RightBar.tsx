import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import React, { FunctionComponent } from 'react'

import BackgroundColor from './modules/BackgroundColor'
import BackgroundPreviewColor from './modules/BackgroundPreviewColor'
import Fill from './modules/Fill'
import Shadow from './modules/Shadow'
import Stroke from './modules/Stroke'

const RightBar: FunctionComponent<unknown> = () => {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        width: '300px',
        bgcolor: 'background.sidebar',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ bgcolor: 'background.sidebar', boxShadow: 2, p: 2 }}>
        <Typography variant='subtitle2'>Style Config</Typography>
      </Box>
      <Box flex={1} height={0} overflow='hidden auto'>
        <Fill />
        <Divider />
        <Stroke />
        <Divider />
        <Shadow />
        <Divider />
        <BackgroundColor />
        <BackgroundPreviewColor />
      </Box>
    </Box>
  )
}

export default RightBar
