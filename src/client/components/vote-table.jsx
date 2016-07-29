import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Table, Checkbox} from 'react-bootstrap';

import {Bets} from '/src/game/bets.js';


class _VoteTable extends React.Component {
  render() {
    let isLoggedIn = !!this.props.user;
    return <div className="container">
      <Table bordered condensed hover style={{width: "auto"}}>
        <thead>
        <tr>
          <th>#votes</th>
          <th>Name</th>
          { isLoggedIn ? <th>You</th> : null }
          { this.props.players.map(player => <th key={player.name}>{player.name}</th>) }
        </tr>
        </thead>
        <tbody>
        { Object.keys(Bets).map(key => {
          let bet = Bets[key];
          return <tr key={key}>
            <td>{key}</td>
            <td>{bet.name}</td>
            { isLoggedIn ? <td><Checkbox /></td> : null }
            { this.props.players.map(player => <td key={player.name}>
              <Checkbox disabled checked={player.votes[key]}/>
            </td>)}
          </tr>;
        })}
        </tbody>
      </Table>
    </div>;
  }
}

_VoteTable.propTypes = {
  userId: React.PropTypes.string,
  players: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
    votes: React.PropTypes.object,
  })),
};

export const VoteTable = createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, _VoteTable);
