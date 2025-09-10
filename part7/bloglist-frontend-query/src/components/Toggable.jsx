import { useState, forwardRef, useImperativeHandle } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const Toggable = forwardRef(({ children }, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <Box sx={{ my: 4 }}>
      <Button variant={'contained'} onClick={toggleVisibility}>
        {visible === false ? 'Show form' : 'Hide form'}
      </Button>
      {visible === false ? null : <Box>{children}</Box>}
    </Box>
  )
})

Toggable.displayName = 'Toggable'

export default Toggable
