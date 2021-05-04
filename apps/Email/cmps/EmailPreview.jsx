import { utilService } from '../../../services/util-service.js';

export function EmailPreview({ email }) {
  return (
    <div className="email-preview">
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
