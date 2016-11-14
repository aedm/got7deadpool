import React from 'react';

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    };
  }

  render() {
    let insideClasses = ["nav-insidebar"];
    if (!this.state.opened) insideClasses.push("nav-hidden");

    return <nav className="nav-bar">
      <div className="nav-opensidebar" onClick={() => this.setState({opened: !this.state.opened})}>
        <span className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"/>
      </div>
      <div className={insideClasses.join(" ")}>
        <div className="nav-closesidebar" onClick={() => this.setState({opened: false})}>
          <span className="glyphicon glyphicon-remove" aria-hidden="true"/>
        </div>
        {this.props.children.map((child, index) => React.cloneElement(child, {
          key: index,
          onItemClicked: () => this.setState({opened: false})
        }))}
      </div>
    </nav>
  }
}

export class NavGroup extends React.Component {
  render() {
    let classNames = ["nav-group"];
    if (this.props.left) classNames.push("nav-group-left");
    if (this.props.right) classNames.push("nav-group-right");

    return <div className={classNames.join(" ")}>
      {React.Children.map(this.props.children, (child, index) => child == null ? null :
          React.cloneElement(child, {
            key: index,
            onItemClicked: this.props.onItemClicked,
          }))}
    </div>
  }
}

NavGroup.propTypes = {
  left: React.PropTypes.bool,
  right: React.PropTypes.bool,
};


export class NavItem extends React.Component {
  handleClick(ev) {
    ev.preventDefault();
    if (this.props.onClick) this.props.onClick();
    this.props.onItemClicked();
  }

  render() {
    if (this.props.href) {
      return <a className="nav-item" href={this.props.href} onClick={ev => this.handleClick(ev)}>
        {this.props.children}
      </a>;
    }
    return <div className="nav-item" onClick={ev => this.handleClick(ev)}>
      {this.props.children}
    </div>;
  }
}


NavGroup.propTypes = {
  href: React.PropTypes.string,
  onClick: React.PropTypes.func,
};
