export class EmailFilter extends React.Component {
  state = {
    filterBy: {
      sender: '',
      date: '',
      threads: '',
    },
  };
  handleChange = (ev) => {
    const field = ev.target.name;
    const value =
      ev.target.type === 'number' ? +ev.target.value : ev.target.value;
    this.setState(
      { filterBy: { ...this.state.filterBy, [field]: value } },
      () => {
        this.props.onSetFilter(this.state.filterBy);
      }
    );
  };
  render() {
    const { sender, date } = this.setState;
    return (
      <form className="email-filter" onSubmit={this.onFilter}>
        <label htmlFor="bySender">By Sender</label>
        <input
          type="text"
          id="bySender"
          name="sender"
          value={sender}
          onChange={this.handleChange}
        />

        <label htmlFor="byDate">By Date</label>
        <input
          type="date"
          id="byDate"
          name="date"
          value={date}
          onChange={this.handleChange}
        />

        <label htmlFor="byThreads">By Conversation</label>
        <select id="byThreads" name="threads" onChange={this.handleChange}>
          <option value="all">Show All</option>
          <option value="threads">Show Threads</option>
          <option value="threads">Show Unreplied</option>
        </select>
        <button>Filter</button>
      </form>
    );
  }
}
