import { Sidebar } from "components/Sidebar";
import { Search } from "components/Search";
import heart from "img/icons/white-heart.svg";
import CardList from "components/CardList";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveFilters } from "redux/filters/selectors";
import { useHistory } from "react-router-dom";
import { Pagination } from "../../components/Pagination";
import { numberOfPages } from "../../functions/numberOfPages";
import { NUMBER_OF_PRODUCTS_ONE_PAGE } from "../../constants/index";
import { GO_TO_START, paginationAction } from "../../redux/pages/actions";
import { useEffect, useState } from "react";
import { getRequestUrl } from "../../functions/setRequestUrl";
import { getProducts } from "redux/products/actions.js";
import basket from "img/icons/bag.svg";
import { selectProducts } from "../../redux/products/selector";
import { selectSliders } from "../../redux/sliders/selectors";
import { selectCurrentPage } from "../../redux/pages/selectors";
import { URL_SEARCH } from "../../constants";
import classes from "./Home.module.scss"

export function Home() {
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const slidersState = useSelector(selectSliders);
  const filters = useSelector(selectActiveFilters);
  const currentPage = useSelector(selectCurrentPage);
  const sliders = Object.values(slidersState);
  const products = useSelector(selectProducts("all"));
  const numberOfProducts = useSelector(selectProducts("numberOfProducts"));
  const prodUrl = URL_SEARCH;
  const url = getRequestUrl({
    prodUrl,
    filters,
    searchValue,
    sliders,
    currentPage,
  });
  useEffect(() => {
    dispatch(getProducts(url));
  }, [url]);

  function goToWishlist() {
    history.push("/wishlist");
    dispatch(paginationAction(GO_TO_START));
  }

  function goToCartList() {
    history.push("/cart");
    dispatch(paginationAction(GO_TO_START));
  }

  const isNeededPagination =
    numberOfPages(numberOfProducts, NUMBER_OF_PRODUCTS_ONE_PAGE) > 1;
  return (
    <>
      <section className={`${classes["product-list"]}`}>
        <div className="container ">
          <div className="products-list__inner" data-element="mainWrapper">
            <Sidebar />
            <div className="products products-list__main">
              <Search setSearchValue={setSearchValue} />
              <div className="products__search-res">
                <p>Found {numberOfProducts} products</p>
                <div className="products__search-btns">
                  <button className="btn btn--only-img btn--green">
                    <img src={basket} alt={"basket"} onClick={goToCartList} />
                  </button>
                  <button className="btn btn--only-img btn--green">
                    <img src={heart} alt={"heart"} onClick={goToWishlist} />
                  </button>
                </div>
              </div>
              <CardList products={products} />
              {isNeededPagination ? (
                <Pagination
                  numberOfPages={numberOfPages(
                    numberOfProducts,
                    NUMBER_OF_PRODUCTS_ONE_PAGE
                  )}
                />
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
