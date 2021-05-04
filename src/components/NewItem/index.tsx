import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent
} from 'react'

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
        <div className="NewItem-create-icon">
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12.5" cy="12.5" r="11.5" stroke="#3D82EB" strokeWidth="2"/>
            <rect x="11.6666" y="6.66667" width="1.66667" height="11.6667" rx="0.833333" fill="#3D82EB"/>
            <rect x="6.66663" y="13.3333" width="1.66667" height="11.6667" rx="0.833333" transform="rotate(-90 6.66663 13.3333)" fill="#3D82EB"/>
          </svg>
        </div>
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
