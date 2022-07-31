import { useState } from "react";
import Modal from 'react-modal'
import { Fade, Zoom } from "react-reveal";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from "../store/Cart.store";
import { clearOrder, createOrder } from "../store/Order.store";

export default function Cart() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  const { cartItems } = useSelector(state => state.cart);
  const { order } = useSelector(state => state.order);
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

  function closeModal() {
    dispatch(clearOrder());
    dispatch(clearCart());
    setShowCheckout(false);
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

    {
      order && (
        <Modal
          isOpen={true}
          onRequestClose={closeModal}
        >
          <Zoom>
            <button className="close-modal" onClick={closeModal}>x</button>
            <div className="order-details">
              <h3 className="success-message">Seu pedido foi enviado.</h3>
              <h2>Pedido {order._id}</h2>
              <ul>
                <li>
                  <div>Nome:</div>
                  <div>{order.name}</div>
                </li>
                <li>
                  <div>E-mail:</div>
                  <div>{order.email}</div>
                </li>
                <li>
                  <div>Endereço:</div>
                  <div>{order.address}</div>
                </li>
                <li>
                  <div>Data:</div>
                  <div>{order.createdAt}</div>
                </li>
                <li>
                  <div>Total:</div>
                  <div>R$ {order.total.toFixed(2)}</div>
                </li>
                <li>
                  <div>Itens:</div>
                  <div>{
                    order.cartItems.map((item) => (
                      <div>
                        {item.count} x {item.title}
                      </div>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </Zoom>
        </Modal>
      )
    }
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