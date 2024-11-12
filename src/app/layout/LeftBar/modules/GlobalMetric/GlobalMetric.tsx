import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react-lite'
import { FunctionComponent } from 'react'
import FormAdjustGlobalMetric from 'src/app/layout/common/FormAdjustGlobalMetric'
import { useProject } from 'src/store/hooks'

const GlobalMetric: FunctionComponent<unknown> = () => {
  const { globalAdjustMetric } = useProject()

  const {
    xAdvance,
    xOffset,
    yOffset,
    autoNumberSize,
    numberWidth,
    numberHeight,
    setXAdvance,
    setXOffset,
    setYOffset,
    setAutoNumberSize,
    setNumberWidth,
    setNumberHeight,
  } = globalAdjustMetric

  return (
    <>
      <Box sx={{ px: 2, my: 4 }}>
        <Typography>Global Metric Adjustments</Typography>
      </Box>
      <FormAdjustGlobalMetric
        xAdvance={xAdvance}
        xOffset={xOffset}
        yOffset={yOffset}
        numberWidth={numberWidth}
        autoNumberSize={autoNumberSize}
        numberHeight={numberHeight}
        setXAdvance={setXAdvance}
        setXOffset={setXOffset}
        setYOffset={setYOffset}
        setAutoNumberSize={setAutoNumberSize}
        setNumberWidth={setNumberWidth}
        setNumberHeight={setNumberHeight}
      />
    </>
  )
}

export default observer(GlobalMetric)
