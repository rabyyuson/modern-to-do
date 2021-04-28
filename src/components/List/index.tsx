import React, { BaseSyntheticEvent } from 'react'

const List = ({
  handleListItemComplete,
  handleListItemRemove,
  handleListItemSelect,
  setListItemEditInputRef,
  items
}: {
  handleListItemComplete: (event: BaseSyntheticEvent) => void;
  handleListItemRemove: (event: BaseSyntheticEvent) => void;
  handleListItemSelect: (event: BaseSyntheticEvent) => void;
  setListItemEditInputRef: (element: HTMLInputElement | null) => void;
  items: {
    completed: [string?];
    inProgress: [string?];
  }
}) => {
  const {
    completed,
    inProgress,
  } = items

  return (
    <div className="List">
      <ul className="List-in-progress">
        {inProgress.map((item, index) => {
          return (
            <li key={index}>
              <div
                data-index={index}
                className="List-in-progress-item-complete"
                onClick={handleListItemComplete}
              >
                ( ✔ )
              </div>
              <div
                data-index={index}
                className="List-in-progress-item-select"
                onClick={handleListItemSelect}
              >
                {item}
              </div>
              <div
                data-index={index}
                className="List-in-progress-item-edit"
              >
                <input
                  ref={setListItemEditInputRef}
                  type="text"
                ></input>
              </div>
              <div
                data-index={index}
                className="List-in-progress-item-remove"
                onClick={handleListItemRemove}
              >
                ( X )
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default List
