import React from 'react';
import {Jumbotron} from 'react-bootstrap';

import {GamePage} from '/src/client/components/game-page.jsx';

export class App extends React.Component {
  render() {
    return <div>
      <Jumbotron style={{display: ""}}>
        <div className="container">
          <h2>Game of Thrones Season 7 Death Lottery</h2>
          <p>This is non-public and pre-alpha. Database will be wiped like the Baratheons. Don't get attached.</p>
        </div>
      </Jumbotron>

      <GamePage />
    </div>;
  }
}
