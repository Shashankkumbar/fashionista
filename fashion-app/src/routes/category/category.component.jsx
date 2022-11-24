//Individual category component like mens,shoes..etc (wrt route after clicking on hats,mens..etc on shop page like shop/mens...etc )with all items in it
import "./category.styles.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../product-card/product-card.component";

import { useSelector } from "react-redux";
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.component";

const Category = () => {
  const { category } = useParams();
  console.log("rendering/re-rendering category component ");
  const isLoading = useSelector(selectCategoriesIsLoading);

  const categoriesMap = useSelector(selectCategoriesMap);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    console.log("effect fired calling setProducts");
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <div>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Category;
