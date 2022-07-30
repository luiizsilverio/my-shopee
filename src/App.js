import React from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {

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
              <Products />
            </div>

            <div className="sidebar">
              <Cart />
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
