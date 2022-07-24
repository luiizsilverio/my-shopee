import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: JSON.parse(localStorage.getItem('myshoppe.cart')) || [],
      size: "",
      sort: ""
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

  sortProducts = (event) => {
    const sort = event.target.value;

    this.setState(state => ({
      sort: sort,
      products: this.state.products.slice().sort((a, b) => (
        sort === "lowest"
          ? (a.price > b.price ? 1 : -1)
          : sort === "highest"
            ? (a.price < b.price ? 1 : -1)
            : (a._id > b._id ? 1 : -1)
      ))
    }))
  }

  createOrder = (order) => {
    alert("salvar o pedido de "+ order.name);
  }

  filterProducts = (event) => {
    if (event.target.value === "") {
      this.setState({size: "", products: data.products});
    }
    else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(prod => (
          prod.availableSizes.indexOf(event.target.value) >= 0
        ))
      })
    }
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
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              />
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
