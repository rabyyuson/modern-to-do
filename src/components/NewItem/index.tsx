import { ChangeEvent, FocusEvent, KeyboardEvent } from 'react'

const NewItem = ({
  handleNewItemInputOnChange,
  handleNewItemInputOnBlur,
  handleNewItemInputOnKeyUp,
  setNewItemInputRef,
}: {
  handleNewItemInputOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleNewItemInputOnBlur: (event: FocusEvent<HTMLInputElement>) => void;
  handleNewItemInputOnKeyUp: (event: KeyboardEvent<HTMLInputElement>) => void;
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
          onKeyUp={handleNewItemInputOnKeyUp}
          onChange={handleNewItemInputOnChange}
          onBlur={handleNewItemInputOnBlur}
        />
      </div>
    </div>
  )
}

export default NewItem
