import React from 'react';

export class ResultsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="container">
      <div className="game-page">
        <h2>Results</h2>
        <p>A girl has no points yet.</p>
        <p>A girl must check back after the first episode has aired.</p>
      </div>
    </div>;
  }
}