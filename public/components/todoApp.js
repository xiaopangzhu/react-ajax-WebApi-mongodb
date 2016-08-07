const App = React.createClass({
  getInitialState: function () {
    return {
      input: '',
      items: [],
      parms: []
    }
  },
  // componentDidMount: function () {
  //   $.get('/a').then(data => {
  //     this.setState({data: data});
  //   });
  // },
  add: function (event) {
    if (event.keyCode === 13) {
      this.setState({input: ""});
      const items = this.state.items;
      const item = {};
      item.title = event.target.value;
      item.isChose = false;
      items.push(item);
      this.setState({items});
      this.setState({parms: this.state.items});
    }
  },
  change: function (event) {
    this.setState({input: event.target.value});
  },
  remove: function (i) {
    this.state.items.splice(i, 1);
    this.setState({items: this.state.items});
    // this.setState({parms: this.state.items});
  },
  exchange: function (i) {
    const item = this.state.items[i];
    item.isChose = !item.isChose;
    this.setState({items: this.state.items});
    // this.setState({parms: this.state.items});
  },
  completed: function () {
    const parms = this.state.items.filter((item)=>item.isChose)
    this.setState({parms});
  },
  active: function () {
    const parms = this.state.items.filter((item)=>!item.isChose)
    this.setState({parms});
  },
  all: function () {
    this.setState({parms: this.state.items});
  },
  clearCompleted: function () {
    const items = this.state.items.filter((item)=>!item.isChose)
    this.setState({items});
    this.setState({parms: items});
  },
  chooseAll: function () {
    const items = this.state.items.map((item)=> {
      item.isChose = item.isChose ? false : true;
      return item;
    })
    this.setState({items});
  },
  render: function () {
    let footer;
    if (this.state.items.length > 0) {
      footer =
        <Footer items={this.state.parms}
                onCompleted={this.completed}
                onActive={this.active}
                onAll={this.all}
                onClearCompleted={this.clearCompleted}/>
    }


    return <div>
      <div>
        <button onClick={this.chooseAll}>all</button>
        <input type="text" value={this.state.input}
               onKeyDown={this.add}
               onChange={this.change}/>
      </div>
      <div>
        <Items items={this.state.parms} onRemove={this.remove} onExchange={this.exchange}/>
        {footer}
      </div>
    </div>
  }
})

const Items = React.createClass({
  remove: function (i) {
    this.props.onRemove(i);
  },
  exchange: function (i) {
    this.props.onExchange(i);
  },
  render: function () {
    const itemsText = this.props.items.map((item, index)=> {
      return <div key={index}>
        <input type="checkbox" checked={item.isChose} onClick={this.exchange.bind(this, index)}/>
        <span>{item.title}</span>
        <button onClick={this.remove.bind(this, index)}>-</button>
      </div>

    });
    return <div>
      {itemsText}
    </div>
  }
})

const Footer = React.createClass({
  render: function () {
    const leftCount = this.props.items.filter((item)=>!item.isChose).length;
    return <div>
      <button>{leftCount}left items</button>
      <button onClick={this.props.onAll}>All</button>
      <button onClick={this.props.onActive}>Active</button>
      <button onClick={this.props.onCompleted}>Completed</button>
      <button onClick={this.props.onClearCompleted}>clear completed</button>
    </div>
  }
})

ReactDOM.render(<App />, document.getElementById('content'))