import { emailService } from '../services/email-service.js';
import { utilService } from '../../../services/util-service.js';
export class EmailDetails extends React.Component {
  state = {
    emailId: this.props.match.params.id,
    email: null,
    isRead: null,
  };

  componentDidMount() {
    this.getEmail().then(() => {
      this.getReadState();
    });
  }
  getEmail() {
    const { emailId } = this.state;
    emailService
      .getEmailById(emailId)
      .then((email) => this.setState({ email }));
    return Promise.resolve();
  }

  getReadState() {
    if (!this.state.email) return;
    this.setState({ isRead: this.state.email.isRead });
  }

  toggleRead() {
    const { isRead } = this.state;
    if (isRead) this.setState({ isRead: false });
    else this.setState({ isRead: true });
    emailService.setReadState(this.state.isRead, this.state.emailId);
  }

  render() {
    const { email, isRead } = this.state;
    if (!email) {
      return (
        <section>
          <h1>Loading your Email...</h1>
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
        <div className="email-actions">
          <button>Reply</button>
          <button>Forward</button>
          <button>Forward All</button>
          <button>Delete</button>
          <button onClick={() => this.toggleRead()}>{`Mark as ${
            isRead ? 'unread' : 'read'
          }`}</button>
        </div>
      </div>
    );
  }
}
