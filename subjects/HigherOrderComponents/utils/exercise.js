////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make `withMouse` a "higher-order component" that sends the mouse position
// to the component as props.
//
// Hint: use `event.clientX` and `event.clientY`
//
// Got extra time?
//
// Make a `withCat` HOC that shows a cat chasing the mouse around the screen!
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import * as styles from './styles'

const withMouse = (Component) => {
  return class extends React.Component {
    state = {
      x: 0,
      y: 0
    }

    handleMouseMove = (event) => {
      this.setState({ x: event.clientX, y: event.clientY })
    }

    render() {
      return (
        <Component {...this.props} mouse={this.state} onMouseMove={this.handleMouseMove}/>
      )
    }
  }
}

const withCat = (Component) => {
  return class extends React.Component {
    state = {
      x: this.props.mouse.x,
      y: this.props.mouse.y
    }

    componentWillReceiveProps(nextProps) {
      setTimeout(() => {
        this.setState(nextProps.mouse)
      }, 200)
    }

    render() {
      return (
        <div>
          <img
            src="https://i.pinimg.com/736x/d6/a3/90/d6a3905abdb3e1359cfa1519769c0d44--cat-cartoons-cartoon-cats.jpg"
            style={{
              position: 'absolute',
              width: 100,
              top: this.state.y,
              left: this.state.x
            }}
          />
          <Component {...this.props}/>
        </div>
      )
    }
  }
}

class App extends React.Component {
  static propTypes = {
    mouse: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired,
    onMouseMove: PropTypes.func.isRequired
  }

  render() {
    const { mouse, onMouseMove, message } = this.props

    return (
      <div style={styles.container} onMouseMove={onMouseMove}>
        {mouse ? (
          <h1>The mouse position is ({mouse.x}, {mouse.y}), the message is {message}</h1>
        ) : (
          <h1>We don't know the mouse position yet :(</h1>
        )}
      </div>
    )
  }
}

const AppWithMouse = withMouse(withCat(App))

ReactDOM.render(<AppWithMouse message="hello"/>, document.getElementById('app'))



//
