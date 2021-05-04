import { MouseEvent } from 'react'
import './index.scss'

const ListNavigation = ({
  items,
  view,
  handleListNavigationEllipsisClick,
  handleListNavigationItemClick,
}:{
  items: {
    completed: (string | undefined)[];
    inProgress: (string | undefined)[];
    removed: (string | undefined)[];
  };
  view: {
    open: boolean;
    selected: string;
  };
  handleListNavigationEllipsisClick: (event: MouseEvent<HTMLDivElement>) => void;
  handleListNavigationItemClick: (event: MouseEvent<HTMLLIElement>) => void;
}) => {
  const { open, selected } = view

  return (
    <div className={[
      "ListNavigation",
      open && "ListNavigation--open",
    ]
      .filter(className => Boolean(className))
      .join(" ")}
    >
      <div
        className="ListNavigation-ellipsis"
        onClick={handleListNavigationEllipsisClick}
      >
        <div className="ListNavigation-ellipsis--default">
          <svg width="19" height="5" viewBox="0 0 19 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="2.83337" cy="2.5" r="2.5" fill="#C4C4C4"/>
            <circle cx="9.5" cy="2.5" r="2.5" fill="#C4C4C4"/>
            <circle cx="16.1667" cy="2.5" r="2.5" fill="#C4C4C4"/>
          </svg>
        </div>
        <div className="ListNavigation-ellipsis--hovered">
          <svg width="19" height="5" viewBox="0 0 19 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="2.83337" cy="2.5" r="2.5" fill="#4E4E4E"/>
            <circle cx="9.5" cy="2.5" r="2.5" fill="#4E4E4E"/>
            <circle cx="16.1667" cy="2.5" r="2.5" fill="#4E4E4E"/>
          </svg>
        </div>
      </div>
      <ul className="ListNavigation-items">
        {Object.getOwnPropertyNames(items).map(viewName => 
          <li
            data-viewname={viewName}
            key={viewName}
            className={[
              "ListNavigation-items-name",
              (selected === viewName) && "ListNavigation-items-name--selected"
            ]
              .filter(className => Boolean(className))
              .join(" ")}
            onClick={handleListNavigationItemClick}
          >{viewName === 'inProgress' ? 'in progress' : viewName}</li>
        )}
      </ul>
    </div>
  )
}

export default ListNavigation