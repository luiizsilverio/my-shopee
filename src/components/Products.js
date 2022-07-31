import { useEffect, useState } from "react";
import { Fade, Zoom } from 'react-reveal';
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from "../store/Products.store";
import { addToCart } from "../store/Cart.store";

Modal.setAppElement('#root')

export default function Products(props) {
  const [product, setProduct] = useState(null);

  const { filteredItems: products, status } = useSelector(state => state.products);
  const dispatch = useDispatch();

  function openModal(product) {
    setProduct(product);
  }

  function closeModal() {
    setProduct(null);
  }

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <Fade bottom cascade={true}>
        {!products ? (
            <div>Nenhum produto disponível.</div>
          ) :
          status === "aguarde" ? (
            <div>Aguarde...</div>
          ) :
          (
            <ul className="products">
              {products.map(prod => (
                <li key={prod._id}>
                  <div className="product">
                    <a href={"#" + prod._id} onClick={() => openModal(prod)}>
                      <img src={prod.image} alt={prod.title} />
                      <p>{prod.title}</p>
                    </a>
                    <div className="product-price">
                      <div>R$ {prod.price.toFixed(2)}</div>
                      <button
                        className="button primary"
                        onClick={() => dispatch(addToCart(prod))}
                      >Adicionar
                      </button>
                    </div>
                  </div>
                </li>
                ))}
            </ul>
          )
        }
      </Fade>

      {
        product && (
          <Modal isOpen={true} onRequestClose={closeModal}>
            <Zoom>
              <button
                onClick={closeModal}
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
                        dispatch(addToCart(product));
                        closeModal();
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
