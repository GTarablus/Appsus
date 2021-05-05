export function EmailMenu({ onSetView }) {
  return (
    <div className="email-menu">
      <ul className="menu-actions clean-list">
        <li onClick={() => onSetView('inbox')}>Inbox</li>
        <li onClick={() => onSetView('sent')}>Outbox</li>
        <li onClick={() => onSetView('drafts')}>Drafts</li>
        <li onClick={() => onSetView('starred')}>Starred</li>
        <li onClick={() => onSetView('trash')}>Trash</li>
      </ul>
    </div>
  );
}
