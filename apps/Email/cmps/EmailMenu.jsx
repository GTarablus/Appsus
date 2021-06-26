const { Link } = ReactRouterDOM;
import { IconStar } from '../cmps/icon-cmps/IconStar.jsx';
import { IconTrash } from '../cmps/icon-cmps/IconTrash.jsx';
import { IconInbox } from '../cmps/icon-cmps/IconInbox.jsx';
import { IconEditEmail } from './icon-cmps/IconEditEmail.jsx';
import { IconOutbox } from './icon-cmps/IconOutbox.jsx';

export function EmailMenu({ onSetView, unreadCount }) {
  return (
    <div className="email-menu">
      <div className="menu-actions">
        <div className="email-menu-button" onClick={() => onSetView('inbox')}>
          <Link to="/email">
            <IconInbox />
            {`Inbox (${unreadCount})`}
          </Link>
        </div>
        <div className="email-menu-button" onClick={() => onSetView('sent')}>
          <IconOutbox />
          {'  '}Outbox
        </div>
        <div className="email-menu-button" onClick={() => onSetView('drafts')}>
          <IconEditEmail />
          {'  '}Drafts
        </div>
        <div className="email-menu-button" onClick={() => onSetView('starred')}>
          <IconStar />
          {'  '}Starred
        </div>
        <div className="email-menu-button" onClick={() => onSetView('trash')}>
          <IconTrash />
          {'  '}Trash
        </div>
      </div>
    </div>
  );
}
