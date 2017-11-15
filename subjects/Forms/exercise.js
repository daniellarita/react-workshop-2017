////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - If the user types something into shipping, then checks the checkbox, then
//   unchecks the checkbox, ensure the field has the information from
//   before clicking the checkbox the first time
import React from 'react'
import ReactDOM from 'react-dom'
import serializeForm from 'form-serialize'

const defaultName = "Name";
const defaultState = "NY";
class CheckoutForm extends React.Component {
  constructor(){
    super();
    this.state = {
      billingName: defaultName,
      billingState: defaultState,
      shippingName: '',
      shippingState: '',
      checked: false,
    };
  }
  handleNameChange = (e) => {
    console.log(e.target.value);
    this.setState({billingName: e.target.value});
  }

  handleStateChange = (e) => {
    console.log(e.target.value);
    this.setState({billingState: e.target.value});
  }

  onCheck = (e) => {
    console.log(e.target.checked);
    this.setState({checked:e.target.checked});
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
  }
  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>Billing Name: <input
                defaultValue={this.state.billingName}
                type="text"
                onChange={this.handleNameChange}/></label>
            </p>
            <p>
              <label>Billing State: <input type="text" size="2"
                defaultValue={this.state.billingState}
                onChange={this.handleStateChange}/></label>
            </p>
          </fieldset>

          <br/>

          <fieldset>
            <label><input
              type="checkbox"
              onChange={this.onCheck}
              defaultValue={this.state.checked}
              /> Same as billing</label>
            <legend>Shipping Address</legend>
            <p>
              <label>Shipping Name: <input type="text"
                value={this.state.checked ? this.state.billingName : this.state.shippingName}
                onChange={event => this.setState({shippingName: event.target.value})}
                readOnly={this.state.checked}
                /></label>
            </p>
            <p>
              <label>Shipping State: <input type="text" size="2"
                value={this.state.checked ? this.state.billingState : this.state.shippingState}
                onChange={event => this.setState({shippingState: event.target.value})}
                readOnly={this.state.checked}
                /></label>
            </p>
          </fieldset>

          <p>
            <button>Submit
            </button>
          </p>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<CheckoutForm/>, document.getElementById('app'))
