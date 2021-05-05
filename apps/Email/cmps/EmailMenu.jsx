const { Link } = ReactRouterDOM;
import { emailService } from '../services/email-service.js';

export class EmailMenu extends React.Component {
  render() {
    return (
      <div className="email-menu">
        <ul className="menu-actions clean-list">
          <li>Inbox</li>
          <Link to="/email">
            <li onClick={emailService.setEmailBox('outbox')}>Outbox</li>{' '}
          </Link>
          <li>Drafts</li>
          <li>Spam</li>
          <li>Trash</li>
        </ul>
      </div>
    );
  }
}
