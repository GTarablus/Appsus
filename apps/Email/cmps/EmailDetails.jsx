import { emailService } from '../services/email-service.js';
import { utilService } from '../../../services/util-service.js';
export class EmailDetails extends React.Component {
  state = {
    emailId: this.props.match.params.id,
    email: null,
  };

  componentDidMount() {
    this.getEmail();
  }
  getEmail() {
    const { emailId } = this.state;
    emailService
      .getEmailById(emailId)
      .then((email) => this.setState({ email }));
  }
  render() {
    const { email } = this.state;
    if (!email) {
      return (
        <section>
          <h1>Loading you Email...</h1>
        </section>
      );
    }
    return (
      <div className="email-details">
        <button onClick={() => this.props.history.push('/email')}>Back</button>
        <div>
          <h2>{email.sender}</h2>
          <h3>{email.subject}</h3>
        </div>
        <div>
          <p>{email.body}</p>
          <h3>{utilService.getTimeFromStamp(email.sentAt)}</h3>
        </div>
      </div>
    );
  }
}
