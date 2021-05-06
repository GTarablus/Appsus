const { Link } = ReactRouterDOM;
import { utilService } from '../../../services/util-service.js';
import { emailService } from '../services/email-service.js';
export class EmailComposer extends React.Component {
  state = {
    sentEmail: {
      id: utilService.makeId(),
      sender: 'me',
      to: '',
      subject: '',
      body: '',
      isDraft: false,
    },
  };

  handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    this.setState({ sentEmail: { ...this.state.sentEmail, [field]: value } });
  };

  saveAsDraft = () => {
    var draft = { ...this.state.sentEmail, isDraft: true };
    emailService.saveToEmails(draft);
  };

  render() {
    const { sender, to, subject, body } = this.state.sentEmail;
    return (
      <div className="email-composer-container">
        <div className="compose-header">
          <h4>Compose Message</h4>
          <Link to="/email">
            <button onClick={() => this.saveAsDraft()}>X</button>
          </Link>
        </div>
        <form className="composer">
          <label htmlFor="sender">From:</label>
          <input
            type="text"
            id="sender"
            name="sender"
            value={sender}
            onChange={this.handleChange}
          />
          <label htmlFor="to">To:</label>
          <input
            type="text"
            id="to"
            name="to"
            value={to}
            onChange={this.handleChange}
          />
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={subject}
            onChange={this.handleChange}
          />
          <textarea
            name="body"
            id="body"
            cols="30"
            rows="10"
            value={body}
            onChange={this.handleChange}
          ></textarea>
          <button>Send</button>
        </form>
      </div>
    );
  }
}
