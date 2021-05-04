const { Route, Switch } = ReactRouterDOM;
import { EmailMenu } from '../cmps/EmailMenu.jsx';
import { EmailList } from '../cmps/EmailList.jsx';
import { emailService } from '../services/email-service.js';

export class EmailApp extends React.Component {
  state = {
    emails: null,
  };

  componentDidMount() {
    this.loadEmails();
    console.log(this.state.emails);
  }

  loadEmails() {
    emailService.query().then((emails) => {
      this.setState({ emails: emails });
    });
  }
  render() {
    const { emails } = this.state;
    if (!emails) {
      return (
        <section>
          <h1>Loading you Emails...</h1>
        </section>
      );
    }
    return (
      <section>
        <div className="email-greet">
          <h1>Appsus</h1>
          <h2>Welcome to Email!</h2>
        </div>
        <div className="emails-main-display">
          <EmailMenu />
          <Switch>
            {/* <Route path="/email/:id" component={EmailDetails} /> */}
            <Route
              path="/email"
              render={(props) => <EmailList {...props} emails={emails} />}
            />
          </Switch>
        </div>
      </section>
    );
  }
}
