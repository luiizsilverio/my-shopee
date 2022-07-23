import { Component } from "react";

export default class Products extends Component {
  render() {
    return (
      <div>
        <ul className="products">
          {this.props.products.map(prod => (
            <li key={prod._id}>
              <div className="product">
                <a href={"#" + prod._id}>
                  <img src={prod.image} alt={prod.title} />
                  <p>{prod.title}</p>
                </a>
                <div className="product-price">
                  <div>R$ {prod.price.toFixed(2)}</div>
                  <button className="button primary">
                    Adicionar
                  </button>
                </div>
              </div>
            </li>
            ))}
        </ul>
      </div>
    )
  }
}