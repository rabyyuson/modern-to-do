import React from 'react'
import PropTypes from 'prop-types'

const List = ({
  items
}: {
  items: [string?]
}) => {
  return (
    <div className="List">
      <ul>
        {items.map((item, index) => {
          return (
            <li key={index}>{item}</li>
          )
        })}
      </ul>
    </div>
  )
}

List.propTypes = {
  items: PropTypes.array.isRequired,
}

export default List