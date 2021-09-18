import React from 'react';
import './styles/style.css';
import addListIcon from './images/icons/addList.svg';

import Modal from './components/Modal';
import CardCost from './components/CardCost';

class App extends React.Component {

  async getCosts() {
    return await fetch('http://127.0.0.1:3001/costs-lists')
      .then(response => response.json())
      .then(data => {
        this.setState({products: data[0].costs})

        // Separate this onto a function
        let products = data[0].costs;
        var totalValue = 0;
    
        products.forEach((product) => {      
          totalValue = totalValue + product.value
        });
        // end
      
        this.setState({totalValue: totalValue});
      })
    .catch(console.error)
  }

  constructor(props) {
    super(props);

    this.state = {
      newProductName: '',
      newProductValue: '0.00',
      products: [],
      // products: [
      //   {
      //     name: "Graphics Card",
      //     value: 100000
      //   }, 
      //   {
      //     name: "Processor",
      //     value: 250000
      //   }, 
      //   {
      //     name: "SSD (Solid State Drive)",
      //     value: 100000
      //   }, 
      //   {
      //     name: "Motherboard",
      //     value: 120000
      //   }
      // ],
      totalValue: 0,
      modalIsVisible: false
    };
  
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleValueInput = this.handleValueInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.renderList = this.renderList.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.getCosts();
  }

  renderList() {
    let listItems = this.state.products.map((product, index) => 
      <CardCost index={index} name={product.name} price={product.value}/>
    );
    return listItems;
  }

  addItem(event) {
    event.preventDefault();

    // Removes the . (dot) from the string, then transform it into an INT
    let newProductValue = this.state.newProductValue.split('.');
    newProductValue = newProductValue.join('');
    newProductValue = parseInt(newProductValue);
    
    let listItems = [...this.state.products, {name: this.state.newProductName, value: newProductValue}];
    let totalValue = this.state.totalValue + newProductValue;

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
    if (foundDots !== null && foundDots.length > 1) {
      // If a dot has been found. 
      // It will re-render the value to not allow a second dot
      fullValue = this.state.newProductValue;
    } else {
      // Remove the dot to simplify the calculation
      fullValue = newValue.replace('.', '');

      if (fullValue.length >= 3) { // If the user isn't erasing the values...

        // Make the effect of Price mask.
        if (fullValue.substr(0, 1) === '0' && fullValue.substr(0, fullValue.length) !== '000') {
          fullValue = fullValue.substr(1, fullValue.length);
        }

        let firstPart = fullValue.substr(0, fullValue.length - 2);
        let centsPart = fullValue.substr(fullValue.length - 2, fullValue.length);

        fullValue = firstPart + "." + centsPart;
        
        this.setState({
          newProductValue: fullValue
        });
      } else { // If the user is erasing the values
        // Make the default value (0.00) again
        // or format the value. Examples: 0.32 and 0.01
        
        let abscentZeros = "";
        for (let index = 1; index <= 3 - fullValue.length; index++) {
          abscentZeros += '0';
        }

        let newValue = abscentZeros + fullValue;
        newValue = newValue.substr(0, (newValue.length - 2)) + "." + newValue.substr(1, 2);

        this.setState((state) => ({
          newProductValue: newValue
        }));
      } 
    }
  }

  openModal() {
    this.setState({
      modalIsVisible: true
    });
  }

  closeModal() {
    this.setState({
      modalIsVisible: false
    })
  }

  formatPrice(price) {
    price = price.toString();

    let reals = price.substr(0, (price.length - 2));
    let cents = price.substr((price.length - 2), 2);

    let formattedPrice = `${reals}.${cents}`;

    return formattedPrice;
  }

  render() {
    let modal;

    if (this.state.modalIsVisible) {
      modal = <Modal 
        close={this.closeModal}
        inputs={[
          {title: "Nome do Custo", value: this.state.newProductName, handler: this.handleNameInput},
          {title: "Valor do Custo", value: this.state.newProductValue, handler: this.handleValueInput}
        ]}
        buttonHandler={this.addItem}
      />
    } else {
      modal = ""
    }

    return (
      <div className="rootBody">

        <Modal 
          close={this.closeModal}
          inputs={[
            {title: "Nome do Custo", value: this.state.newProductName, handler: this.handleNameInput},
            {title: "Valor do Custo", value: this.state.newProductValue, handler: this.handleValueInput}
          ]}
          buttonHandler={this.addItem}
        />

        {modal}

        <nav className="navbar">

          <div className="menuButton">
            <div className="menuButton__bar"></div>
            <div className="menuButton__bar"></div>
            <div className="menuButton__bar"></div>
          </div>

          <div className="navbar__titleWrapper">
            <h1 className="navbar__title lightText">Budget Calculator</h1>
          </div>
          
        </nav>


        <div className="navbarMenu hidden">
          
          <div className="navbarMenu__overlay">

            <ul className="navbarMenu__optionsList">
              <li className="navbarMenu__option"> {/*Close*/}</li>
              <li className="navbarMenu__option">Add new list</li>
              <li className="navbarMenu__option">Update list</li>
              <li className="navbarMenu__option">Delete list</li>
            </ul>


          </div>
        
        </div>        


        <div className="mainContent">
          
          <div className="listsNotFoundWarning listsNotFoundWarning--hidden">
            <div className="listsNotFoundWarning__wrapper">
              <h1 className="listsNotFoundWarning__title">Whoops! 😅</h1>
              <p className="listsNotFoundWarning__description">
                You don't have any created lists yet.<br />
                To create a new costs list,<br />
                you need to press the button below or<br />
                press the button the left of your screen!<br />
              </p>

              <button className="listsNotFoundWarning__addListButton">
                ADD CARD
              </button>
            </div>
          </div>
          

          <div className="listsContainer">

            <div className="costsListWrapper costsListWrapper--first">
              <div className="costsList--addNewList">
                <img src={addListIcon} className="costsList__iconNewList" />
                <h1 className="textAlignCenter">Add new list</h1>
              </div>
            </div>

            <div className="costsListWrapper">

              <div className="costsList">

                <div className="costsList__headers">
                  <h1 className="textAlignCenter">Gaming PC</h1>
                  <p className="">A very powerful Gaming PC capable of running games like... Show more</p>
                </div>

                <div className="cardsCostsList">
                  <ul className="cardsCostsList__cardsList">
                    <li className="emptyCardsCostsListWarning emptyCardsCostsListWarning--hidden">
                      <h1>Your list is empty!</h1>
                      <p>To add a cost, you must press the button "ADD COST" below this list</p>
                    </li>
  
                    <li className="cardCost">
                      <h2 className="cardCost__title">RTX 3060 TI</h2>
                      <h3 className="cardCost__value">R$ 6500.00</h3>
                    </li>

                    <li className="cardCost">
                      <h2 className="cardCost__title">RTX 3060 TI</h2>
                      <h3 className="cardCost__value">R$ 6500.00</h3>
                    </li>
                    <li className="cardCost">
                      <h2 className="cardCost__title">RTX 3060 TI</h2>
                      <h3 className="cardCost__value">R$ 6500.00</h3>
                    </li>
                    <li className="cardCost">
                      <h2 className="cardCost__title">RTX 3060 TI</h2>
                      <h3 className="cardCost__value">R$ 6500.00</h3>
                    </li>
                    <li className="cardCost">
                      <h2 className="cardCost__title">RTX 3060 TI</h2>
                      <h3 className="cardCost__value">R$ 6500.00</h3>
                    </li>
                    <li className="cardCost">
                      <h2 className="cardCost__title">RTX 3060 TI</h2>
                      <h3 className="cardCost__value">R$ 6500.00</h3>
                    </li>
                    <li className="cardCost">
                      <h2 className="cardCost__title">RTX 3060 TI</h2>
                      <h3 className="cardCost__value">R$ 6500.00</h3>
                    </li>

                    
                    
                  </ul>
                </div>

                <span className="totalCost">
                  <p className="totalCost__title">Total Cost:</p>
                  <p className="totalCost__value">R$ 45000.00</p>
                </span>

                <button className="costsList__addCostButton">ADD COST</button>

              </div>

            </div>

            <div className="costsListWrapper costsListWrapper--last">

              <div className="costsList">

                <div className="costsList__headers">
                  <h1 className="textAlignCenter">Gaming PC</h1>
                  <p className="">A very powerful Gaming PC capable of running games like... Show more</p>
                </div>

                <div className="cardsCostsList">
                  <ul className="cardsCostsList__cardsList">
                    <li className="emptyCardsCostsListWarning emptyCardsCostsListWarning--visible">
                      <h1>Your list is empty!</h1>
                      <p>To add a cost, you must press the button "ADD COST" below this list</p>
                    </li>
                  </ul>
                </div>

                <span className="totalCost">
                  <p className="totalCost__title">Total Cost:</p>
                  <p className="totalCost__value">R$ 0.00</p>
                </span>

                <button className="costsList__addCostButton">ADD COST</button>

              </div>

            </div>


          </div>
          
          {/* <ul className="costsList marginTop15">

            <div className="totalCost textAlignCenter">
              <span className="totalCost__title">Custo Total:</span><br/>
              <span className="totalCost__value">R$ {this.formatPrice(this.state.totalValue)}</span>
            </div>

            <div className="costsList__row">
              
              {this.renderList()}

            </div>

          </ul>
          
          <button className="addCostButton marginTop15" onClick={this.openModal}>Adicionar custo</button> */}
        </div>
  
      </div>
    );
  }
}

export default App;