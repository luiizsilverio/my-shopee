import { Component } from "react";
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal'
import { Zoom } from "react-reveal";

// Modal.setAppElement('#root')  // se for React

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
  }

  openModal = (product) => {
    this.setState({ product });
  }

  closeModal = () => {
    this.setState({ product: null });
  }

  render() {
    const { product } = this.state;

    return (
      <div>
        <Fade bottom cascade={true}>
          <ul className="products">
            {this.props.products.map(prod => (
              <li key={prod._id}>
                <div className="product">
                  <a href={"#" + prod._id} onClick={() => this.openModal(prod)}>
                    <img src={prod.image} alt={prod.title} />
                    <p>{prod.title}</p>
                  </a>
                  <div className="product-price">
                    <div>R$ {prod.price.toFixed(2)}</div>
                    <button
                      className="button primary"
                      onClick={() => this.props.addToCart(prod)}
                    >Adicionar
                    </button>
                  </div>
                </div>
              </li>
              ))}
          </ul>
        </Fade>

        {
          product && (
            <Modal isOpen={true} onRequestClose={this.closeModal}>
              <Zoom>
                <button
                  onClick={this.closeModal}
                  className="close-modal"
                >x
                </button>
                <div className="product-details">
                  <img src={product.image} alt={product.title} />
                  <div className="product-details-description">
                    <p>
                      <strong>{product.title}</strong>
                    </p>
                    <p>
                      {product.description}
                    </p>
                    <p>
                      Tamanhos disponíveis: &nbsp;
                      {product.availableSizes.map((x) => (
                        <span>
                          &nbsp; <button className="button">{ x }</button>
                        </span>
                      ))}
                    </p>
                    <div className="product-price">
                      <div>R$ {product.price.toFixed(2)}</div>
                      <button
                        className="button primary"
                        onClick={() => {
                          this.props.addToCart(product);
                          this.closeModal();
                        }}
                      >
                        Adicionar
                      </button>
                    </div>
                  </div>
                </div>
              </Zoom>
            </Modal>
          )
        }
      </div>
    )
  }
}