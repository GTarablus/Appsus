const { Link } = ReactRouterDOM;

import { EmailMenu } from '../cmps/EmailMenu.jsx';
import { EmailList } from '../cmps/EmailList.jsx';

export function EmailApp() {
  return (
    <section>
      <div className="email-greet">
        <h1>Appsus</h1>
        <h2>Welcome to Email!</h2>
      </div>
      <div className="emails-main-display">
        <EmailMenu />
        <EmailList />
      </div>
    </section>
  );
}
