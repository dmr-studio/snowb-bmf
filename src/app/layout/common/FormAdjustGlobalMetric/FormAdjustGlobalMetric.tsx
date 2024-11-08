import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import React, { FunctionComponent } from 'react'
import GridInput from 'src/app/components/GridInput'

interface SetHandle {
  (value: number): void
}

interface FormAdjustGlobalMetricProps {
  xAdvance: number
  xOffset: number
  yOffset: number
  numberWidth: number
  numberHeight: number
  setXAdvance: SetHandle
  setXOffset: SetHandle
  setYOffset: SetHandle
  setNumberWidth: SetHandle
  setNumberHeight: SetHandle
}

const FormAdjustGlobalMetric: FunctionComponent<FormAdjustGlobalMetricProps> = (
  props: FormAdjustGlobalMetricProps,
) => {
  const {
    xAdvance,
    xOffset,
    yOffset,
    numberWidth,
    numberHeight,
    setXAdvance,
    setXOffset,
    setYOffset,
    setNumberWidth,
    setNumberHeight,
  } = props

  const getHandle =
    (handleSet: SetHandle) => (e: React.ChangeEvent<HTMLInputElement>) =>
      handleSet(Number(e.target.value))

  return (
    <>
      <Box paddingX={2} marginY={4}>
        <GridInput before='xAdvance:' after='px'>
          <Input
            value={xAdvance}
            fullWidth
            type='number'
            onChange={getHandle(setXAdvance)}
          />
        </GridInput>
      </Box>
      <Box paddingX={2} marginY={4}>
        <GridInput before='xOffset:' after='px'>
          <Input
            value={xOffset}
            fullWidth
            type='number'
            onChange={getHandle(setXOffset)}
          />
        </GridInput>
      </Box>
      <Box paddingX={2} marginY={4}>
        <GridInput before='yOffset:' after='px'>
          <Input
            value={yOffset}
            fullWidth
            type='number'
            onChange={getHandle(setYOffset)}
          />
        </GridInput>
      </Box>
      <Box paddingX={2} marginY={4}>
        <GridInput before='numberWidth:' after='px'>
          <Input
            value={numberWidth}
            fullWidth
            type='number'
            onChange={getHandle(setNumberWidth)}
          />
        </GridInput>
      </Box>
      <Box paddingX={2} marginY={4}>
        <GridInput before='numberHeight:' after='px'>
          <Input
            value={numberHeight}
            fullWidth
            type='number'
            onChange={getHandle(setNumberHeight)}
          />
        </GridInput>
      </Box>
    </>
  )
}

export default FormAdjustGlobalMetric
