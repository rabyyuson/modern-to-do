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
            className={[
              "List-in-progress-item",
              completed.includes(item) && "List-in-progress--completed",
              removed.includes(item) && "List-in-progress--removed",
            ]
              .filter(className => Boolean(className))
              .join(" ")}
            key={index}
          >
            <div
              data-index={index}
              className="List-in-progress-item-complete"
              onClick={handleListItemComplete}
            >
              <div className="List-in-progress-item-complete--default">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12.5" cy="12.5" r="11.5" stroke="#CBCBCB" strokeWidth="2"/>
                </svg>
              </div>
              <div className="List-in-progress-item-complete--hovered">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12.5" cy="12.5" r="11.5" fill="#7C7C7C" stroke="#CBCBCB" strokeWidth="2"/>
                </svg>
              </div>
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
              <div className="List-in-progress-item-remove--default">
                <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18.4852" cy="17.6777" r="11.5" transform="rotate(45 18.4852 17.6777)" stroke="#EB3D3D" strokeWidth="2"/>
                  <rect x="22.0208" y="12.9636" width="1.66667" height="11.6667" rx="0.5" transform="rotate(45 22.0208 12.9636)" fill="#EB3D3D"/>
                  <rect x="13.7712" y="14.1422" width="1.66667" height="11.6667" rx="0.5" transform="rotate(-45 13.7712 14.1422)" fill="#EB3D3D"/>
                </svg>
              </div>
              <div className="List-in-progress-item-remove--hovered">
                <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18.4852" cy="17.6777" r="11.5" transform="rotate(45 18.4852 17.6777)" fill="#EB3D3D" stroke="#EB3D3D" strokeWidth="2"/>
                  <rect x="22.0208" y="12.9636" width="1.66667" height="11.6667" rx="0.5" transform="rotate(45 22.0208 12.9636)" fill="white"/>
                  <rect x="13.7712" y="14.1422" width="1.66667" height="11.6667" rx="0.5" transform="rotate(-45 13.7712 14.1422)" fill="white"/>
                </svg>
              </div>
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
              className="List-removed-item-restore"
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
