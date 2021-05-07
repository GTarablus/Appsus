const { Link } = ReactRouterDOM;
import { utilService } from '../../../services/util-service.js';

export function EmailPreview({
  email,
  onDeleteEmail,
  toggleRead,
  onRestoreEmail,
  onStarEmail,
}) {
  return (
    <div
      className={`email-preview ${email.isRead ? 'read' : 'unread'}`}
      onClick={() => (email.isRead ? null : toggleRead(email.id))}
    >
      <Link to={`/email/details/${email.id}`}>
        <div>
          <h2 className="sender">{email.sender}</h2>
          <h4 className="from">{email.isSent ? email.to : email.from}</h4>
          <h3>{email.subject}</h3>
        </div>
        <div>
          <p>{email.body}</p>
          <h3>
            {email.sentAt ? utilService.getTimeFromStamp(email.sentAt) : ''}
          </h3>
        </div>
      </Link>
      <div className="quick-actions">
        {!email.isDraft ? (
          <Link to="/email/compose/:id">
            <button>Reply</button>
          </Link>
        ) : null}

        {!email.isDraft ? <button>Forward</button> : null}
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
        {email.isTrash ? (
          <button
            onClick={(ev) => {
              ev.stopPropagation();
              onRestoreEmail(email.id);
            }}
          >
            {' '}
            Send to inbox
          </button>
        ) : null}
        <button
          className={email.isStarred ? 'starred' : ''}
          onClick={(ev) => {
            ev.stopPropagation();
            onStarEmail(email.id);
          }}
        >
          {' '}
          Star
        </button>
        {email.isDraft ? (
          <Link to={`/email/compose/${email.id}`}>
            <button>Edit</button>{' '}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
