import { useState, forwardRef, useImperativeHandle } from 'react'

const Toggable = forwardRef(({ children }, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return visible === false ? (
    <div>
      <button onClick={toggleVisibility}>show</button>
    </div>
  ) : (
    <div>
      <div>{children}</div>
      <button onClick={toggleVisibility}>hide</button>
    </div>
  )
})

export default Toggable
