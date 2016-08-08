import React from 'react';
import {Jumbotron} from 'react-bootstrap';

import {GamePage} from '/src/client/components/game-page.jsx';

export class App extends React.Component {
  render() {
    return <div>
      <Jumbotron style={{display: ""}}>
        <div className="container text-center">
          <h1>Game of Thrones Season 7 Death Lottery</h1>
          <p>This is a non-public alpha version.<br/>
            Database might get wiped.<br/>
            Spoilers everywhere.</p>
        </div>
      </Jumbotron>

      <GamePage />
    </div>;
  }
}
