import React from 'react';


export class CustomCheckbox extends React.Component {
  render() {
    let checkedClass = !this.props.checked ? "unchecked" : "checked";
    return <div className="custom-checkbox" onClick={() => this.props.onChange() }>
      <span className={`glyphicon glyphicon-tint ${checkedClass}`}/>
    </div>;
  }
}
