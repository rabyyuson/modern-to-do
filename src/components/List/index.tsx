import classNames from 'classnames'
import { KeyboardEvent, MouseEvent } from 'react'
import './index.scss'

const List = ({
  handleListItemEditOnKeyUp,
  handleListItemComplete,
  handleListItemRemove,
  handleListItemRemovedRestore,
  setListItemEditInputRef,
  items
}: {
  handleListItemEditOnKeyUp: (event: KeyboardEvent<HTMLInputElement>) => void;
  handleListItemComplete: (event: MouseEvent<HTMLDivElement>) => void;
  handleListItemRemove: (event: MouseEvent<HTMLDivElement>) => void;
  handleListItemRemovedRestore: (event: MouseEvent<HTMLDivElement>) => void;
  setListItemEditInputRef: (element: HTMLInputElement | null) => void;
  items: {
    completed: (string | undefined)[];
    inProgress: (string | undefined)[];
    removed: (string | undefined)[];
  }
}) => {
  const { completed, inProgress, removed } = items

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
                onKeyUp={handleListItemEditOnKeyUp}
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
      <ul className="List-removed">
        {removed.map((item, index) => (
          <li
            className="List-removed-item"
            key={index}
          >
            <div
              data-index={index}
              className="List-removed-item-trash"
              onClick={handleListItemRemovedRestore}
            >
              ( + )
            </div>
            <div className="List-removed-item-label">
              {item}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List
