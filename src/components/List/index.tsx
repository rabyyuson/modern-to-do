import React, { BaseSyntheticEvent } from 'react'

const List = ({
  handleListItemComplete,
  handleListItemRemove,
  handleListItemSelect,
  items
}: {
  handleListItemComplete: (event: BaseSyntheticEvent) => void;
  handleListItemRemove: (event: BaseSyntheticEvent) => void;
  handleListItemSelect: (event: BaseSyntheticEvent) => void;
  items: [string?]
}) => {
  return (
    <div className="List">
      <ul>
        {items.map((item, index) => {
          return (
            <li key={index}>
              <div
                data-index={index}
                className="List-item-complete"
                onClick={handleListItemComplete}
              >
                [Complete Icon]
              </div>
              <div
                data-index={index}
                className="List-item-select"
                onClick={handleListItemSelect}
              >
                {item}
              </div>
              <div
                data-index={index}
                className="List-item-remove"
                onClick={handleListItemRemove}
              >
                [Remove Icon]
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default List
