export class EmailFilter extends React.Component {
  state = {
    filterBy: {
      sender: '',
      date: '',
      threads: '',
      showRead: 'showAll',
    },
    filterOn: false,
  };
  handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    this.setState(
      { filterBy: { ...this.state.filterBy, [field]: value } },
      () => {
        this.props.onSetFilter(this.state.filterBy);
      }
    );
  };
  clearFilter = (ev) => {
    ev.stopPropagation();
    this.setState({ filterOn: false }, () => {
      this.props.onSetFilter(this.state.filterOn);
    });
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

        <label htmlFor="showRead">By Read/ unread</label>
        <select id="showRead" name="showRead" onChange={this.handleChange}>
          <option value={'showAll'}>Show All</option>
          <option value="unread">Show Unread</option>
          <option value="read">Show read</option>
        </select>

        <label htmlFor="byThreads">By Conversation</label>
        <select id="byThreads" name="threads" onChange={this.handleChange}>
          <option value="all">Show All</option>
          <option value="threads">Show Threads</option>
          <option value="unreplied">Show Unreplied</option>
        </select>
        <button
          type="button"
          className="clear-filter"
          onClick={this.clearFilter}
        >
          Clear Filter
        </button>
      </form>
    );
  }
}
