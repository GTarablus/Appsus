import { emailService } from '../services/email-service.js';
import { utilService } from '../../../services/util-service.js';
import { IconBack } from '../cmps/icon-cmps/IconBack.jsx';
export function EmailDetails(props) {
  const emailId = props.match.params.id;
  const email = props.emails.find((email) => {
    return email.id === emailId;
  });
  return (
    <div className="email-details">
      <button onClick={() => props.history.push('/email')}>
        <IconBack />
      </button>
      <div>
        <h2>{email.sender}</h2>
        <h3>{email.subject}</h3>
        <h4>{`To: ${email.to}`}</h4>
      </div>
      <div>
        <p>{email.body}</p>
        <h3>
          {email.sentAt ? utilService.getTimeFromStamp(email.sentAt) : ''}
        </h3>
      </div>
      <div className="email-actions">
        <button>Reply</button>
        <button>Forward</button>
        <button
          onClick={(ev) => {
            ev.stopPropagation();
            props.onDeleteEmail(email.id);
            props.history.push('/email');
          }}
        >
          Delete
        </button>
        <button onClick={() => props.toggleRead(emailId)}>{`Mark as ${
          email.isRead ? 'unread' : 'read'
        }`}</button>
      </div>
    </div>
  );
}
