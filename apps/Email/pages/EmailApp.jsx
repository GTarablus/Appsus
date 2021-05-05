const { Route, Switch } = ReactRouterDOM;
import { EmailMenu } from '../cmps/EmailMenu.jsx';
import { EmailList } from '../cmps/EmailList.jsx';
import { EmailDetails } from '../cmps/EmailDetails.jsx';
import { emailService } from '../services/email-service.js';

export class EmailApp extends React.Component {
  state = {
    emails: null,
    view: 'inbox',
  };

  componentDidMount() {
    this.loadEmails();
    console.log(this.state.emails);
  }

  loadEmails = () => {
    emailService.query().then((emails) => {
      this.setState({ emails: emails });
    });
  };

  toggleRead = (emailId) => {
    emailService.setReadState(emailId).then(this.loadEmails);
  };

  onDeleteEmail = (emailId) => {
    emailService.deleteEmail(emailId).then(this.loadEmails);
  };

  onSetView = (view) => {
    this.setState({ view });
  };

  setEmailsForDisplay = () => {
    const { emails, view } = this.state;
    if (view === 'inbox') return emails.filter((email) => !email.isTrash);
    else if (view === 'trash') return emails.filter((email) => email.isTrash);
  };

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
          <EmailMenu onSetView={this.onSetView} />
          <Switch>
            <Route path="/email/:id" component={EmailDetails} />
            <Route
              path="/email"
              render={(props) => (
                <EmailList
                  {...props}
                  emails={this.setEmailsForDisplay()}
                  toggleRead={this.toggleRead}
                  onDeleteEmail={this.onDeleteEmail}
                />
              )}
            />
          </Switch>
        </div>
      </section>
    );
  }
}
