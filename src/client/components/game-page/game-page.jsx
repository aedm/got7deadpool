import React from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
import {Button, Table} from 'react-bootstrap';
import {Accounts} from 'meteor/accounts-base';

import {VoteTable} from '/src/client/components/vote-table/vote-table.jsx';
import {Bets} from '/src/game/bets.js';


export class _GamePage extends React.Component {
  constructor() {
    super();
    this.players = [];
    for (let i = 0; i < 10; i++) {
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

  handleLogin(event) {
    event.preventDefault();
    let username = ReactDOM.findDOMNode(this.refs["username"]).value;
    Accounts.createUser({username, password: "almafa123"}, (err) => {
      Meteor.loginWithPassword(username, "almafa123");
    });
  }

  // Detects mobile browsers (http://stackoverflow.com/questions/11381673/detecting-a-mobile-browser)
  isMobile() {
    let check = false;
    (function (a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  }

  facebookLogin() {
    Meteor.loginWithFacebook({
      requestPermissions: ["user_friends"],

      // Mobile browsers don't seem to like "popup" login, use "redirect" instead
      loginStyle: this.isMobile() ? "redirect" : "popup",
    });
  }


  renderLoginButton() {
    if (this.props.isLoggingIn) {
      return <Button disabled>
        Logging in...
      </Button>;
    }
    else if (!this.props.user) {
      return <div className="login-button text-center">
        <Button bsStyle="primary" onClick={() => this.facebookLogin()}>
          Log in with Facebook to participate
        </Button>
      </div>;
    }
  }

  renderRules() {
    return <div className="container">
      <h1 className="text-center">Season 7 Death Pool</h1>
      <div className="row rules row-eq-height">
        <div className="text-center col-md-5 col-md-offset-1">
          <div>
            <h2>What's this game about?</h2>
            <p>Predict who dies in season 7 of Game of Thrones
              and compete against others.</p>
            <p>Voting is closed right before the season starts. Scores get updated after each
              episode. Your predictions are public.</p>
            <p>It's for free and you can't win anything.</p>
            <p>This is a fan-made website, I have no affiliation with HBO, everything here is the
              property of their respective owners.</p>
          </div>
        </div>
        <div className="text-center col-md-5">
          <div>
            <h2>Scoring</h2>
            <p>Scores in this chart will get multiplied by the value of each character.</p>
            <Table className="rule-table">
              <tbody>
              <tr>
                <td className="rules-empty"/>
                <td colSpan="2">Your prediction</td>
              </tr>
              <tr>
                <td className="rules-empty"/>
                <td>Dies</td>
                <td>Survives</td>
              </tr>
              <tr>
                <td>Dies in the show</td>
                <td>2</td>
                <td>-1</td>
              </tr>
              <tr>
                <td>Survives in the show</td>
                <td>0</td>
                <td>1</td>
              </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>;
  }

  render() {
    return <div>
      { this.renderRules() }
      <div className="login">
        { this.renderLoginButton() }
      </div>
      <VoteTable players={this.players}/>
    </div>;
  }
}

_GamePage.propTypes = {
  user: React.PropTypes.object,
};

export const GamePage = createContainer(() => {
  return {
    user: Meteor.user(),
    isLoggingIn: Meteor.loggingIn(),
  };
}, _GamePage);
