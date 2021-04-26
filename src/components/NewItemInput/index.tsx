import React, { BaseSyntheticEvent } from 'react'

const NewItemInput = ({
  handleOnBlur
}: {
  handleOnBlur: (event: BaseSyntheticEvent) => void
}) => {
  return (
    <div className="NewItemInput">
      <input
        type="text"
        onBlur={handleOnBlur}
      />
    </div>
  )
}

export default NewItemInput