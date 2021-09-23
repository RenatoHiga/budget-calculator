import React from 'react';
import './styles/style.css';
import addListIcon from './images/icons/addList.svg';
import closeNavbarMenu from './images/icons/close.svg'

import Modal from './components/Modal';
import CostsList from './components/CostsList';

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
      newListName: "",
      newListDescription: "",
      newCostName: '',
      newCostValue: '0.00',
      costsLists: [
        {
          id: 1,
          name: "Gamer PC",
          description: "A very powerful Gaming PC capable of running games like... Show more",
          costs: [
            {
              name: "Graphics Card",
              value: 100000
            },
            {
              name: "Processor",
              value: 250000
            }
          ]
        },
        {
          id: 2,
          name: "Chocolate Cake",
          description: "Recipe for a simple, but delicious chocolate cake for the... Show more",
          costs: [
            {
              name: "Eggs",
              value: 30
            },
            {
              name: "Flour",
              value: 1
            }
          ]
        }
      ],
      totalValue: 0,
      modalIsVisible: false,
      navbarMenuIsVisible: false,
      modalType: "newList",
      selectedCostList: null
    };
  
    this.handleNewListName = this.handleNewListName.bind(this);
    this.handleNewListDescription = this.handleNewListDescription.bind(this);
    this.addNewList = this.addNewList.bind(this);
    this.emptyNewListInputs = this.emptyNewListInputs.bind(this);
    this.handleNewCostName = this.handleNewCostName.bind(this);
    this.handleNewCostValue = this.handleNewCostValue.bind(this);
    this.emptyNewCostInputs = this.emptyNewCostInputs.bind(this);
    this.addNewCost = this.addNewCost.bind(this);
    this.renderCostsLists = this.renderCostsLists.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openNewCostCardModal = this.openNewCostCardModal.bind(this);
    this.openNewListModal = this.openNewListModal.bind(this);
  }

  componentDidMount() {
    // this.getCosts();
  }

  renderCostsLists() {
    let listItems = this.state.costsLists.map((list, index) => 
      <CostsList
        index={index}
        id={list.id}
        name={list.name}
        description={list.description}
        costs={list.costs}
        openModalHandler={this.openNewCostCardModal}
      />
    );

    return listItems;
  }

  formatPrice(price) {
    price = price.toString();
    let formattedPrice;

    if (price.length < 3) {
        while (price.length < 3) {
            price = `0${price}`;
        }
    }
    
    let reals = price.substr(0, (price.length - 2));
    let cents = price.substr((price.length - 2), 2);

    formattedPrice = `${reals}.${cents}`;

    return formattedPrice;
  }

  addNewList(event) {
    event.preventDefault();
    let currentCostsLists, currentCostsListsAreEmpty, newCostsList, lastCostsListID, newCostsListID;

    currentCostsLists = [...this.state.costsLists];
    currentCostsListsAreEmpty = currentCostsLists.length === 0;
    
    if (currentCostsListsAreEmpty) {
      newCostsListID = 1;
    } else {
      lastCostsListID = currentCostsLists[currentCostsLists.length - 1].id;
      newCostsListID = lastCostsListID + 1;
    }

    newCostsList = {
      id: newCostsListID,
      name: this.state.newListName,
      description: this.state.newListDescription,
      costs: []
    };

    currentCostsLists.push(newCostsList);

    this.setState({
      costsLists: currentCostsLists
    });

    this.emptyNewListInputs();
    this.closeModal();
  }

  emptyNewListInputs() {
    this.setState({
      newListName: "",
      newListDescription: ""
    })
  }

  handleNewListName(event) {
    this.setState({
      newListName: event.target.value
    })
  }

  handleNewListDescription(event) {
    this.setState({
      newListDescription: event.target.value
    })
  }

  emptyNewCostInputs() {
    this.setState({
      newCostName: "",
      newCostValue: "0.00"
    });
  }

  addNewCost(id) {
    // search the list by ID
    let currentCostsLists, currentCostsListsIndex, costList, newCost, newCostValue;
    
    currentCostsLists = this.state.costsLists;
    currentCostsListsIndex = 0;

    while (id !== currentCostsLists[currentCostsListsIndex].id) {
      
      currentCostsListsIndex = currentCostsListsIndex + 1;
    }

    // update costs cards
    costList = currentCostsLists[currentCostsListsIndex];
    
    // format string to INT
    newCostValue = this.state.newCostValue.split('.');
    newCostValue = newCostValue.join('');
    newCostValue = parseInt(newCostValue);

    newCost = {name: this.state.newCostName, value: newCostValue};
    costList.costs.push(newCost);

    this.emptyNewCostInputs();
    this.closeModal();
  }

  handleNewCostName(event) {
    this.setState({
      newCostName: event.target.value
    });
  }

  handleNewCostValue(event) {
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
      fullValue = this.state.newCostValue;
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
          newCostValue: fullValue
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
          newCostValue: newValue
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

  openNewListModal() {
    this.setState({
      modalType: 'newList'
    });
    this.openModal(); 
  }

  openNewCostCardModal(id) {
    this.setState({
      modalType: 'newCostCard',
      selectedCostList: id
    });
    this.openModal();
  }

  render() {
    let modal, navbarMenu;

    if (this.state.modalIsVisible) {

      if (this.state.modalType === 'newCostCard') {

        modal = <Modal 
          title="Add new cost"
          inputs={[
            {title: "Cost name", value: this.state.newCostName, type: "text", handler: this.handleNewCostName},
            {title: "Cost value", value: this.state.newCostValue, type: "text", handler: this.handleNewCostValue}
          ]}
          close={this.closeModal}
          button={{ name: "ADD COST", handler: (event) => {
            event.preventDefault();
            this.addNewCost(this.state.selectedCostList);
          }}}
        />
      } else if (this.state.modalType === 'newList') {
        modal = <Modal 
          title="Add new list"
          inputs={[
            {title: "List name", value: this.state.newListName, type: "text", handler: this.handleNewListName},
            {title: "List description", value: this.state.newListDescription, type: "textarea", handler: this.handleNewListDescription}
          ]}
          close={this.closeModal}
          button={{name: "ADD LIST", handler: this.addNewList}}
        />
      }
      
    } else {
      modal = ""
    }

    if (this.state.navbarMenuIsVisible) {
      navbarMenu = (
        <div className="navbarMenu">
          
          <div className="navbarMenu__overlay">

            <ul className="navbarMenu__optionsList">
              <li className="navbarMenu__closeButton"> <img src={closeNavbarMenu} onClick={() => this.setState({navbarMenuIsVisible: false})} /></li>
              <li className="navbarMenu__option">Add new list</li>
              <li className="navbarMenu__option">Update list</li>
              <li className="navbarMenu__option">Delete list</li>
            </ul>

          </div>
        </div>
      );        
    } else {
      navbarMenu = "";
    }

    return (
      <div className="rootBody">

        {modal}

        <nav className="navbar">

          <div className="menuButton" onClick={() => {
            this.setState({navbarMenuIsVisible: true})
          }}>
            <div className="menuButton__bar"></div>
            <div className="menuButton__bar"></div>
            <div className="menuButton__bar"></div>
          </div>

          <div className="navbar__titleWrapper">
            <h1 className="navbar__title lightText">Budget Calculator</h1>
          </div>
          
        </nav>

        {navbarMenu}

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

            {this.renderCostsLists()}

            <div className="costsListWrapper costsListWrapper--last">
              <a className="costsList--addNewList" href="#" onClick={this.openNewListModal}>
                <img src={addListIcon} className="costsList__iconNewList" />
                <h1 className="textAlignCenter">Add new list</h1>
              </a>
            </div>

          </div>
          
        </div>
  
      </div>
    );
  }
}

export default App;