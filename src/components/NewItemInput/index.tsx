import React, { BaseSyntheticEvent } from 'react'

const NewItemInput = ({
  handleOnChange,
  handleOnBlur,
  setTextInputRef,
}: {
  handleOnChange: (event: BaseSyntheticEvent) => void;
  handleOnBlur: (event: BaseSyntheticEvent) => void;
  setTextInputRef: (element: HTMLInputElement) => void;
}) => {
  return (
    <div className="NewItemInput">
      <input
        ref={setTextInputRef}
        type="text"
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
    </div>
  )
}

export default NewItemInput