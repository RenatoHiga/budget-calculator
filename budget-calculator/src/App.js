import './App.css';
import React from 'react';

import Input from './components/Input';

let cards = [
  {
    name: "Graphics Card",
    value: 1000
  }, 
  {
    name: "Processor",
    value: 2500
  }, 
  {
    name: "SSD (Solid State Drive)",
    value: 1000
  }, 
  {
    name: "Motherboard",
    value: 1200
  }
];

let totalValue = 0;
cards.map((card) => totalValue += card.value)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newProductName: '',
      newProductValue: '',
      products: [
        {
          name: "Graphics Card",
          value: 1000
        }, 
        {
          name: "Processor",
          value: 2500
        }, 
        {
          name: "SSD (Solid State Drive)",
          value: 1000
        }, 
        {
          name: "Motherboard",
          value: 1200
        }
      ],
      totalValue: 0
    };

    this.setState({
      totalValue: totalValue
    });

    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleValueInput = this.handleValueInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  renderList() {
    console.log(this.state);
    // console.log(listItems);
    let listItems = this.state.products.map((product, index) => 
      <li key={index}>{product.name} - R$ {product.value}</li> 
    );
    return listItems
  }

  addItem() {
    let listItems = [...this.state.products, {name: this.state.newProductName, value: this.state.newProductValue}];
    
    console.log(listItems);
    this.setState({
      products: listItems
    });
    
    
  }

  handleNameInput(event) {
    this.setState({
      newProductName: event.target.value
    });
  }

  handleValueInput(event) {
    this.setState({
      newProductValue: event.target.value
    })
  }

  render() {
    return (
      <div>
        <h1>
          Hello there! I'll render a list of items and the value of each item
        </h1>

        <Input type="text" title="Nome do Produto"/>
        <Input type="text" title="Preço do Produto"/><br/><br/>
        <input type="text" value={this.state.newProductName} onChange={this.handleNameInput} placeholder="Digite NOME do produto" /><br/>
        <input type="text" value={this.state.newProductValue} onChange={this.handleValueInput} placeholder="Digite PREÇO do produto" /><br/>
        <button onClick={this.addItem}>Add new item</button>

        <ul>
          {this.renderList()}
          Total Value: R$ {totalValue}
        </ul>
      </div>
    );
  }
}

export default App;


// class Clock extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {date: new Date()};
//   }

//   componentDidMount() {
//     this.timerID = setInterval(
//       () => this.tick(),
//       1000
//     );
//   }

//   componentWillUnmount() {
//     clearInterval(this.timerID)
//   }

//   tick() {
//     this.setState(() => ({
//       date: new Date()
//     }));
//   }

//   render() {
//     return (
//       <div>
//         <h1>Hello, world!</h1>
//         <h2>The current time is {this.state.date.toLocaleTimeString()}</h2>
//       </div>
//     );
//   }
// }

// function tick() {
//   ReactDOM.render(
//     <Clock date={new Date()} />
//   )
// }

// class Welcome extends React.Component {
//   render() {
//     return <p>Hello, {this.props.name}</p>
//   }
// }