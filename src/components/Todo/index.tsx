import React, { BaseSyntheticEvent } from 'react'
import { TodoState } from '../interfaces'
import Calendar from '../Calendar'
import List from '../List'
import NewItemInput from '../NewItemInput'

class Todo extends React.Component<{}, TodoState> {
  constructor(props: any) {
    super(props)

    this.handleOnBlur = this.handleOnBlur.bind(this)

    this.state = {
      items: []
    }
  }

  handleOnBlur(event: BaseSyntheticEvent) {
    const { value } = event.target
    const { items } = this.state
    items.push(value)

    event.target.value = ''

    this.setState({ items })
  }

  render() {
    const { items } = this.state

    return (
      <div className="Todo">
        <Calendar />
        <List
          items={items}
        />
        <NewItemInput
          handleOnBlur={this.handleOnBlur}
        />
      </div>
    )
  }
}

export default Todo