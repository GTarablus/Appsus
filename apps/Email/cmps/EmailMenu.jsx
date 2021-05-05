const { Link } = ReactRouterDOM;
import { emailService } from '../services/email-service.js';

export function EmailMenu({ onSetView }) {
  return (
    <div className="email-menu">
      <ul className="menu-actions clean-list">
        <li onClick={() => onSetView('inbox')}>Inbox</li>
        <Link to="/email">
          <li onClick={() => onSetView('sent')}>Outbox</li>
        </Link>
        <li>Drafts</li>
        <li>Spam</li>
        <li onClick={() => onSetView('trash')}>Trash</li>
      </ul>
    </div>
  );
}
