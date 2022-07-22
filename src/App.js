import React from "react";
import data from "./data.json";
import Products from "./components/Products";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: ""
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
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">Itens do Carrinho</div>
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
