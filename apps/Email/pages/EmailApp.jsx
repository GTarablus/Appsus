const { Route, Switch } = ReactRouterDOM;
import { EmailMenu } from '../cmps/EmailMenu.jsx';
import { EmailList } from '../cmps/EmailList.jsx';
import { EmailDetails } from '../cmps/EmailDetails.jsx';
import { emailService } from '../services/email-service.js';
import { EmailFilter } from '../cmps/EmailFilter.jsx';
import { EmailComposer } from '../cmps/EmailComposer.jsx';

export class EmailApp extends React.Component {
  state = {
    emails: null,
    view: 'inbox',
    filterBy: null,
  };

  componentDidMount() {
    this.loadEmails();
  }

  loadEmails = () => {
    emailService.query(this.state.filterBy).then((emails) => {
      this.setState({ emails: emails });
    });
  };

  toggleRead = (emailId) => {
    emailService.setReadState(emailId).then(this.loadEmails);
  };

  onDeleteEmail = (emailId) => {
    emailService.deleteEmail(emailId).then(this.loadEmails);
  };

  onRestoreEmail = (emailId) => {
    emailService.restoreEmail(emailId).then(this.loadEmails);
  };

  onStarEmail = (emailId) => {
    emailService.starEmail(emailId).then(this.loadEmails);
  };
  onSetView = (view) => {
    this.setState({ view });
  };

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadEmails);
  };

  setEmailsForDisplay = () => {
    const { emails, view } = this.state;
    if (view === 'inbox')
      return emails.filter((email) => !email.isTrash && !email.isDraft);
    else if (view === 'trash')
      return emails.filter((email) => email.isTrash && !email.isDraft);
    else if (view === 'sent')
      return emails.filter((email) => email.from === 'me');
    else if (view === 'drafts') return emails.filter((email) => email.isDraft);
    else if (view === 'starred')
      return emails.filter((email) => email.isStarred);
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
        <div className="emails-main-container">
          <EmailFilter onSetFilter={this.onSetFilter} />
          <div className="email-display">
            <EmailMenu onSetView={this.onSetView} />
            <Switch>
              <Route
                path="/email/details/:id"
                render={(props) => (
                  <EmailDetails
                    {...props}
                    emails={this.state.emails}
                    toggleRead={this.toggleRead}
                    onDeleteEmail={this.onDeleteEmail}
                    onRestoreEmail={this.onRestoreEmail}
                    onStarEmail={this.onStarEmail}
                  />
                )}
              />
              <Route
                path="/email"
                render={(props) => (
                  <EmailList
                    {...props}
                    view={this.state.view}
                    emails={this.setEmailsForDisplay()}
                    toggleRead={this.toggleRead}
                    onDeleteEmail={this.onDeleteEmail}
                    onRestoreEmail={this.onRestoreEmail}
                    onStarEmail={this.onStarEmail}
                  />
                )}
              />
            </Switch>
            <Route
              path="/email/compose/:id?"
              render={(props) => (
                <EmailComposer {...props} onSetFilter={this.onSetFilter} />
              )}
            />
          </div>
        </div>
      </section>
    );
  }
}
