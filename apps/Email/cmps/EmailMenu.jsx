export class EmailMenu extends React.Component {
  render() {
    return (
      <div className="email-menu">
        <ul className="clean-list">
          <li>Inbox</li>
          <li>Outbox</li>
          <li>Drafts</li>
          <li>Spam</li>
          <li>Trash</li>
        </ul>
      </div>
    );
  }
}
