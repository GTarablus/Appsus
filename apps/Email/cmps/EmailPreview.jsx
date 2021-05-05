const { Link } = ReactRouterDOM;

import { utilService } from '../../../services/util-service.js';

export function EmailPreview({ email, onDeleteEmail, toggleRead }) {
  return (
    <div
      className={`email-preview ${email.isRead ? 'read' : 'unread'}`}
      onClick={() => toggleRead(email.id)}
    >
      <Link to={`/email/${email.id}`}>
        <div>
          <h2>{email.sender}</h2>
          <h3>{email.subject}</h3>
        </div>
        <div>
          <p>{email.body}</p>
          <h3>{utilService.getTimeFromStamp(email.sentAt)}</h3>
        </div>
      </Link>
      <div className="quick-actions">
        <button>Reply</button>
        <button>Forward</button>
        <button>Forward All</button>
        <button
          onClick={(ev) => {
            ev.stopPropagation();
            onDeleteEmail(email.id);
          }}
        >
          Delete
        </button>
        <button
          onClick={(ev) => {
            ev.stopPropagation();
            toggleRead(email.id);
          }}
        >{`Mark as ${email.isRead ? 'unread' : 'read'}`}</button>
      </div>
    </div>
  );
}
