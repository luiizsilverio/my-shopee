import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortProducts, filterProducts } from "../store/Products.store";

export default function Filter() {
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

  const { filteredItems } = useSelector(state => state.products)
  const dispatch = useDispatch()

  function handleSort(sort) {
    dispatch(sortProducts(sort));
    setSort(sort);
  }

  function handleFilter(size) {
    dispatch(filterProducts(size));
    setSize(size);
  }

  return (
    <div className="filter">
      <div className="filter-result">
        {filteredItems.length} Produtos
      </div>
      <div className="filter-sort">
        Ordenar {" "}
        <select
          value={sort}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option>+ Recentes</option>
          <option value="lowestprice">Menor Preço</option>
          <option value="highestprice">Maior Preço</option>
        </select>
      </div>
      <div className="filter-size">
        Filtrar {" "}
        <select
          value={size}
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="XS">XS</option>
          <option value="X">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
    </div>
  )
}