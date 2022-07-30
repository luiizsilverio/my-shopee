import React from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: JSON.parse(localStorage.getItem('myshoppe.cart')) || []
    }
  }

  removeFromCart = (prod) => {
    const cartItems = this.state.cartItems.slice(); // retorna uma cópia

    const newCart = cartItems.filter(item => item._id !== prod._id)
    this.setState({
      cartItems: newCart
    })

    localStorage.setItem('myshoppe.cart', JSON.stringify(newCart));
  }

  addToCart = (prod) => {
    const cartItems = this.state.cartItems.slice(); // retorna uma cópia
    let alreadyInCart = false;

    cartItems.forEach(item => {
      if (item._id === prod._id) {
        item.count ++;
        alreadyInCart = true;
      }
    })

    if (!alreadyInCart) {
      cartItems.push({...prod, count: 1});
    }

    this.setState({ cartItems });
    localStorage.setItem('myshoppe.cart', JSON.stringify(cartItems));
  }

  createOrder = (order) => {
    alert("salvar o pedido de "+ order.name);
  }

  render() {
    return (
      <div className='grid-container'>
        <header>
          <div className="logo">
            <a href="/">
              <img src="logo.png" alt="Logotipo" width={32} />
              My-Shopee
            </a>
          </div>
        </header>

        <main>
          <div className="content">
            <div className="main">
              <Filter />
              <Products addToCart={this.addToCart} />
            </div>

            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>

        <footer>
          Todos os direitos reservados.
        </footer>
      </div>
    );
  }
}

export default App;
