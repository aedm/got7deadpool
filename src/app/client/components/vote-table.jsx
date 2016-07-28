import React from 'react';
import {Table, Checkbox} from 'react-bootstrap';

import {Bets} from 'app/game/bets.js';


export class VoteTable extends React.Component {
  static propTypes = {
    userId: React.PropTypes.string,
    players: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string,
      votes: React.PropTypes.object,
    })),
  };

  render() {
    return <div className="container">
      <Table bordered condensed hover style={{width: "auto"}}>
        <thead>
        <tr>
          <th>#votes</th>
          <th>Name</th>
          <th>You</th>
          { this.props.players.map(player => <th>{player.name}</th>) }
        </tr>
        </thead>
        <tbody>
        { Object.keys(Bets).map(key => {
          let bet = Bets[key];
          return <tr key={key}>
            <td>{key}</td>
            <td>{bet.name}</td>
            <td><Checkbox /></td>
            { this.props.players.map(player => <td>
              <Checkbox disabled checked={player.votes[key]}/>
            </td>)}
          </tr>;
        })}
        </tbody>
      </Table>
    </div>;
  }
}

