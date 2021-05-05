const { Link } = ReactRouterDOM;

import { utilService } from '../../../services/util-service.js';
import { emailService } from '../services/email-service.js';

export class EmailPreview extends React.Component {
  state = {
    email: this.props.email,
    timeSent: utilService.getTimeFromStamp(this.props.email.sentAt),
    isRead: this.props.email.isRead,
  };

  toggleRead() {
    const { isRead } = this.state;
    if (isRead) this.setState({ isRead: false });
    else this.setState({ isRead: true });
    emailService.setReadState(this.state.isRead, this.state.email.id);
  }
  render() {
    const { email, timeSent, isRead } = this.state;
    return (
      <div
        className={`email-preview ${isRead ? 'read' : 'unread'}`}
        onClick={() => (email.isRead = true)}
      >
        <Link to={`/email/${email.id}`}>
          <div>
            <h2>{email.sender}</h2>
            <h3>{email.subject}</h3>
          </div>
          <div>
            <p>{email.body}</p>
            <h3>{timeSent}</h3>
          </div>
        </Link>
        <div className="quick-actions">
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
