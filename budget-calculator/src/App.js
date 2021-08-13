import './App.css';
import Input from './components/Input'
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newProductName: '',
      newProductValue: '0.00',
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

    let products = [...this.state.products];
    var totalValue = 0;


    products.forEach((product) => {      
      totalValue = totalValue + product.value
    });
  
    this.state.totalValue = totalValue

    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleValueInput = this.handleValueInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  renderList() {
    let listItems = this.state.products.map((product, index) => 
      <li key={index}>{product.name} - R$ {product.value}</li> 
    );
    return listItems
  }

  addItem(event) {
    event.preventDefault();

    let listItems = [...this.state.products, {name: this.state.newProductName, value: this.state.newProductValue}];
    let totalValue = this.state.totalValue + parseInt(this.state.newProductValue);

    // console.log(listItems);
    this.setState({
      products: listItems,
      totalValue: totalValue
    });
    
    
  }

  handleNameInput(event) {
    this.setState({
      newProductName: event.target.value
    });
  }

  handleValueInput(event) {
    // Allow only numbers and dot
    const filterNumbers = /[^0-9\.]/g;
    let newValue = event.target.value.replace(filterNumbers, '');

    // Allow only a single dot.
    const filterDots = /[\.]/g;
    let foundDots = event.target.value.match(filterDots);

    let fullValue;
    if (foundDots.length > 1) {
      // If a dot has been found. 
      // It will re-render the value to not allow a second dot
      fullValue = this.state.newProductValue;
    } else {
      // Remove the dot to simplify the calculation
      fullValue = newValue.replace('.', '');

      if (fullValue.length >= 3) { // If the user isn't erasing the values...

        // Make the effect of Price mask.
        if (fullValue.substr(0, 1) === '0') {
          fullValue = fullValue.substr(1, fullValue.length);
        }

        let firstPart = fullValue.substr(0, fullValue.length - 2);
        let centsPart = fullValue.substr(fullValue.length - 2, fullValue.length);

        fullValue = firstPart + "." + centsPart;
        
        this.setState({
          newProductValue: fullValue
        });
      } else { // If the user is erasing the values
        // Make the value 0.00 again
        // or format to the correct way like: 0.32 and 0.01

        let newValue = "";
        for (let index = 1; index <= 3 - fullValue.length; index++) {
          newValue += '0';
        }

        this.setState((state) => ({
          newProductValue: newValue + "." + fullValue
        }));
      } 
    }
  }

  render() {
    return (
      <div>
        <h1>
          Budget Calculator
        </h1>

        <form>
          
          <Input
            title="Nome do Custo"
            value={this.state.newProductName}
            onChange={this.handleNameInput}
            
          />

          <Input
            title="Valor do Custo"
            value={this.state.newProductValue}
            onChange={this.handleValueInput}
          />

          <button onClick={this.addItem}>Add new item</button>
        
        </form>

        <div>
          <h2>Items list from list "Dream Gaming Setup"</h2>
          <ul>
            {this.renderList()}
            Total Value: R$ {this.state.totalValue}
          </ul>
        </div>
        
      </div>
    );
  }
}

export default App;