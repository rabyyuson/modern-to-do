import classNames from 'classnames'

import { BaseSyntheticEvent } from 'react'
import './index.scss'

const List = ({
  handleListItemEditOnChange,
  handleListItemComplete,
  handleListItemRemove,
  setListItemEditInputRef,
  items
}: {
  handleListItemEditOnChange: (event: BaseSyntheticEvent) => void;
  handleListItemComplete: (event: BaseSyntheticEvent) => void;
  handleListItemRemove: (event: BaseSyntheticEvent) => void;
  setListItemEditInputRef: (element: HTMLInputElement | null) => void;
  items: {
    completed: (string | undefined)[];
    inProgress: (string | undefined)[];
    removed: (string | undefined)[];
  }
}) => {
  const { completed, inProgress, removed } = items

  console.log('items',items)

  return (
    <div className="List">
      <ul className="List-in-progress">
        {inProgress.map((item, index) => (
          <li
            className={classNames(
              "List-in-progress-item",
              completed.includes(item) && "List-in-progress-completed",
              removed.includes(item) && "List-in-progress-removed"
            )}
            key={index}
          >
            <div
              data-index={index}
              className="List-in-progress-item-complete"
              onClick={handleListItemComplete}
            >
              ( o )
            </div>
            <div className="List-in-progress-item-edit">
              <input
                data-index={index}
                defaultValue={item}
                type="text"
                onChange={handleListItemEditOnChange}
                ref={setListItemEditInputRef}
              />
            </div>
            <div
              data-index={index}
              className="List-in-progress-item-remove"
              onClick={handleListItemRemove}
            >
              ( X )
            </div>
          </li>
        ))}
      </ul>
      <ul className="List-completed">
        {completed.map((item, index) => (
          <li
            className="List-completed-item"
            key={index}
          >
            <div className="List-completed-item-check">
              ( ✔ )
            </div>
            <div className="List-completed-item-label">
              {item}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List
