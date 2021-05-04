const { Link } = ReactRouterDOM;

import { utilService } from '../../../services/util-service.js';

export function EmailPreview({ email }) {
  const timeSent = utilService.getTimeFromStamp(email.sentAt);
  return (
    <Link to={`/email/${email.id}`}>
      <div className="email-preview">
        <div>
          <h2>{email.sender}</h2>
          <h3>{email.subject}</h3>
        </div>
        <div>
          <p>{email.body}</p>
          <h3>{timeSent}</h3>
        </div>
      </div>
    </Link>
  );
}
