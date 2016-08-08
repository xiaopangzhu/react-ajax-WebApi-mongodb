const App = React.createClass({
  getInitialState: function () {
    return {
      input: '',
      items: [],
      parms: []
    }
  },
  componentDidMount: function () {
    $.get('/items').then(data => {
      // console.log(data);
      this.setState({items: data});
      this.setState({parms: this.state.items});
    });
  },
  add: function (event) {
    if (event.keyCode === 13 && event.target.value !== '') {
      this.setState({input: ""});
      const items = this.state.items;
      const item = {};
      item.title = event.target.value;
      item.isChose = false;
      items.push(item);
      this.setState({items});
      this.setState({parms: this.state.items});
      // console.log(item);
      // $.post('/items',{data:JSON.stringify(item)}, function (data) {
      // },"json")
      $.ajax({
        type: "POST",
        url: "/items",
        contentType: 'application/json',
        data: JSON.stringify(item),
        success: function (data) {

        }
      })
    }
  },
  change: function (event) {
    this.setState({input: event.target.value});
  }
  ,
  remove: function (i) {
    this.state.items.splice(i, 1);
    this.setState({items: this.state.items});
    this.setState({parms: this.state.items});
  }
  ,
  exchange: function (i) {
    const item = this.state.items[i];
    item.isChose = !item.isChose;
    this.setState({items: this.state.items});
    this.setState({parms: this.state.items});
  }
  ,
  completed: function () {
    const parms = this.state.items.filter((item)=>item.isChose)
    this.setState({parms});
  }
  ,
  active: function () {
    const parms = this.state.items.filter((item)=>!item.isChose)
    this.setState({parms});
  }
  ,
  all: function () {
    this.setState({parms: this.state.items});
  }
  ,
  clearCompleted: function () {
    const items = this.state.items.filter((item)=>!item.isChose)
    this.setState({items});
    this.setState({parms: items});
  }
  ,
  chooseAll: function () {
    const items = this.state.items.map((item)=> {
      item.isChose = !item.isChose
      return item;
    })
    this.setState({items});
  }
  ,
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

    return <div className="col-md-4 col-md-offset-4 wrap">
      <div className="header">
        <h1>todos</h1>
        <span onClick={this.chooseAll} className="glyphicon glyphicon-chevron-down"></span>
        <input className="form-control"
               placeholder="What needs to be done?"
               type="text"
               value={this.state.input}
               onKeyDown={this.add}
               onChange={this.change}/>
      </div>
      <div className="items-footer">
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
      return <div className="item" key={index}>
        <input type="checkbox" checked={item.isChose} onClick={this.exchange.bind(this, index)}/>
        <span className="itemTitle">{item.title}</span>
        <span className="glyphicon glyphicon-remove delete" onClick={this.remove.bind(this, index)}></span>
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
    return <div className="footer">
      <a className="leftItem" s>{leftCount}left items</a>
      <span onClick={this.props.onAll}>All</span>
      <span onClick={this.props.onActive}>Active</span>
      <span onClick={this.props.onCompleted}>Completed</span>
      <a className="clearCompleted" onClick={this.props.onClearCompleted}>clear completed</a>
    </div>
  }
})

ReactDOM.render(<App />, document.getElementById('content'))