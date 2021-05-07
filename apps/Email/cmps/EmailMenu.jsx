const { Link } = ReactRouterDOM;

export function EmailMenu({ onSetView, unreadCount }) {
  return (
    <div className="email-menu">
      <Link to="/email/compose">
        <button className="compose-button">Compose</button>
      </Link>
      <ul className="menu-actions clean-list">
        <li onClick={() => onSetView('inbox')}>{`Inbox (${unreadCount})`}</li>
        <li onClick={() => onSetView('sent')}>Outbox</li>
        <li onClick={() => onSetView('drafts')}>Drafts</li>
        <li onClick={() => onSetView('starred')}>Starred</li>
        <li onClick={() => onSetView('trash')}>Trash</li>
      </ul>
    </div>
  );
}
