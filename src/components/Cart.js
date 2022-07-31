import { useState } from "react";
import Fade from 'react-reveal/Fade';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from "../store/Cart.store";
import { createOrder } from "../store/Order.store";

export default function Cart() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  const { cartItems } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  function handleCreateOrder(e) {
    e.preventDefault();

    const order = {
      name,
      email,
      address,
      cartItems,
      total: cartItems.reduce((acc, i) => (acc + i.price * i.count), 0),
    }

    dispatch(createOrder(order));
  }

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
                      onClick={() => dispatch(removeFromCart(item))}
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
                onClick={() => setShowCheckout(true)}
              >
                Continuar
              </button>
            </div>
          </div>
          {
            showCheckout && (
              <Fade top cascade>
                <div className="cart">
                  <form onSubmit={handleCreateOrder}>
                    <ul className="form-container">
                      <li>
                        <label>E-mail</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </li>
                      <li>
                        <label>Nome</label>
                        <input
                          name="name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </li>
                      <li>
                        <label>Endereço</label>
                        <input
                          name="address"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </li>
                      <li>
                        <button type="submit" className="button primary">
                          Confirma
                        </button>
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