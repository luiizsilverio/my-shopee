import { Component } from "react";
import Fade from 'react-reveal/Fade';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false
    };
  }

  handleInput = (ev) => {
    this.setState({[ev.target.name]: ev.target.value});
  }

  createOrder = (e) => {
    e.preventDefault();

    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems
    }

    this.props.createOrder(order);
  }

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
          <Fade left cascade>
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
          </Fade>
        </div>
        {
          cartItems.length > 0 &&
            <>
            <div className="cart">
              <div className="total">
                <div>
                  Total: R$ {cartItems.reduce((acc, item) => (
                    acc + item.price * item.count
                  ), 0).toFixed(2)}
                </div>
                <button
                  className="button primary"
                  onClick={() => this.setState({ showCheckout: true })}
                >
                  Continuar
                </button>
              </div>
            </div>
            {
              this.state.showCheckout && (
                <Fade top cascade>
                  <div className="cart">
                    <form onSubmit={this.createOrder}>
                      <ul className="form-container">
                        <li>
                          <label>E-mail</label>
                          <input
                            type="email"
                            name="email"
                            required
                            onChange={this.handleInput}
                          />
                        </li>
                        <li>
                          <label>Nome</label>
                          <input
                            name="name"
                            required
                            onChange={this.handleInput}
                          />
                        </li>
                        <li>
                          <label>Endereço</label>
                          <input
                            name="address"
                            required
                            onChange={this.handleInput}
                          />
                        </li>
                        <li>
                          <button type="submit" className="button primary">Confirma</button>
                        </li>
                      </ul>
                    </form>
                  </div>
                </Fade>
              )
            }
          </>
        }
      </div>
    </>
    )
  }
}