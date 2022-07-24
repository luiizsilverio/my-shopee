import { Component } from "react";

export default class Cart extends Component {
  render() {
    const {cartItems} = this.props;

    return (
    <>
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">
            O carrinho está vazio
          </div>
        ) : (
          <div className="cart cart-header">
            Você adicionou {cartItems.length} no carrinho{" "}
          </div>
        )}
      </div>
      <div>
        <div className="cart">
          <ul className="cart-items">
            {cartItems.map(item => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title} />
                </div>
                <div>
                  <div className="cart-title">{item.title}</div>
                  <div className="right">
                    R$ {item.price.toFixed(2)} x {item.count} {" "}
                    <button
                      className="button"
                      onClick={() => this.props.removeFromCart(item)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {
          cartItems.length > 0 &&
            <div className="cart">
              <div className="total">
                <div>
                  Total: R$ {cartItems.reduce((acc, item) => (
                    acc + item.price * item.count
                  ), 0).toFixed(2)}
                </div>
                <button className="button primary">Continuar</button>
              </div>
            </div>
        }
      </div>
    </>
    )
  }
}