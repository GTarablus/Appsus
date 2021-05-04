import { EmailPreview } from './EmailPreview.jsx';

export function EmailList({ emails }) {
  if (emails.length > 0) {
    return (
      <div className="email-list">
        {emails.map((email) => (
          <EmailPreview email={email} key={email.id} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="email-list">
        <h1>Your inbox is empty!</h1>
      </div>
    );
  }
}
