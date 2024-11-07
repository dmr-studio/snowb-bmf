import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'
import React, { FunctionComponent } from 'react'
import FormAdjustMetric from 'src/app/layout/common/FormAdjustMetric'
import { useProject } from 'src/store/hooks'

const GlobalMetric: FunctionComponent<unknown> = () => {
  const { globalAdjustMetric } = useProject()
  const {
    xAdvance,
    xOffset,
    yOffset,
    numberWidth,
    setXAdvance,
    setXOffset,
    setYOffset,
    setNumberWidth,
  } = globalAdjustMetric

  return (
    <>
      <Box sx={{ px: 2, my: 4 }}>
        <Typography>Global Metric Adjustments</Typography>
      </Box>
      <FormAdjustMetric
        xAdvance={xAdvance}
        xOffset={xOffset}
        yOffset={yOffset}
        numberWidth={numberWidth}
        setXAdvance={setXAdvance}
        setXOffset={setXOffset}
        setYOffset={setYOffset}
        setNumberWidth={setNumberWidth}
      />
    </>
  )
}

export default observer(GlobalMetric)
