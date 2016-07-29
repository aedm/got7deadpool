import React from 'react';
import {Jumbotron, Button} from 'react-bootstrap';

import {GamePage} from '/src/client/components/game-page.jsx';

export class App extends React.Component {
  constructor() {
    super();
  }


  render() {
    return <div>
      <Jumbotron style={{display: "none"}}>
        <div className="container">
          <h2>Game of Thrones Season 7 Death Lottery</h2>
          <p>This is a simple hero unit, a simple jumbotron-style component for calling extra
            attention to featured
            content or information.</p>
          <p><Button bsStyle="primary">Learn more</Button></p>
        </div>
      </Jumbotron>

      <GamePage />
    </div>;
  }
}
