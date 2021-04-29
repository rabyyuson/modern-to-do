import { BaseSyntheticEvent } from 'react'

const NewItem = ({
  handleNewItemInputOnChange,
  handleNewItemInputOnBlur,
  setNewItemInputRef,
}: {
  handleNewItemInputOnChange: (event: BaseSyntheticEvent) => void;
  handleNewItemInputOnBlur: (event: BaseSyntheticEvent) => void;
  setNewItemInputRef: (element: HTMLInputElement | null) => void;
}) => {
  return (
    <div className="NewItem">
      <div className="NewItem-create">
        <div className="NewItem-create-icon">( + )</div>
        <div className="NewItem-create-label">Create New Item</div>
      </div>
      <div className="NewItem-input">
        <input
          ref={setNewItemInputRef}
          type="text"
          onChange={handleNewItemInputOnChange}
          onBlur={handleNewItemInputOnBlur}
        />
      </div>
    </div>
  )
}

export default NewItem
