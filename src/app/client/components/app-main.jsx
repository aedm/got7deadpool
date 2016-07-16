import React from 'react';
import { NavigationBar } from 'app/client/components/navbar.jsx';

export class AppMain extends React.Component {
  render() {
    return <div>
      <NavigationBar/>
      <div className="container">
        Hello.
      </div>
    </div>;
  }
}