import React from 'react';
import {Jumbotron, Button} from 'react-bootstrap';

import {VoteTable} from 'app/client/components/vote-table.jsx';
import {Bets} from 'app/game/bets.js';

export class AppMain extends React.Component {
  constructor() {
    super();

    this.players = [];
    for (let i=0; i<10; i++) {
      let vote = {};
      for (let key of Object.keys(Bets)) {
        if (Math.random() > 0.5) vote[key] = true;
      }
      this.players.push({
        name: i.toString(),
        votes: vote,
      });
    }
  }

  render() {
    return <div>
      <Jumbotron style={{display: "none"}}>
        <div className="container">
          <h2>Game of Thrones Season 7 Death Lottery</h2>
          <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured
            content or information.</p>
          <p><Button bsStyle="primary">Learn more</Button></p>
        </div>
      </Jumbotron>

      <VoteTable players={this.players} />
    </div>;
  }
}
