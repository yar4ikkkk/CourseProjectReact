import CardList from "components/CardList";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "redux/products/selector";
import { numberOfPages } from "functions/numberOfPages";
import { NUMBER_OF_PRODUCTS_ONE_PAGE } from "../../constants/index";
import { Pagination } from "components/Pagination";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getProducts } from "redux/products/actions.js";
import { URL_WISHLIST } from "../../constants/index";
import axios from "axios";
import { selectCurrentPage } from "../../redux/pages/selectors";
import { getRequestUrl } from "functions/setRequestUrl";
import "./WishList.scss";

const START_PAGE = 1;

export function WishList() {
  let currentPage = useSelector(selectCurrentPage);
  let products = useSelector(selectProducts("all"));
  const wishlist = products.filter(({ isWished }) => isWished);
  let numberOfProducts = useSelector(selectProducts("numberOfProducts"));

  const prodUrl = URL_WISHLIST;
  const url = getRequestUrl({ prodUrl, currentPage });
  useEffect(() => {
    if (numberOfProducts <= 9) {
      dispatch(getProducts(`${prodUrl}?page=1&limit=9`));
    } else {
      dispatch(getProducts(`${url}`));
    }
  }, [url, wishlist.length, numberOfProducts]);
  const history = useHistory();
  const dispatch = useDispatch();
  const onClearWishList = () => {
    axios.delete(URL_WISHLIST);
    history.push("/");
  };

  const isNeededPagination =
    numberOfPages(numberOfProducts, NUMBER_OF_PRODUCTS_ONE_PAGE) > 1;

  return (
    <>
      <section className={"products-list"}>
        <div className="container ">
          <button
            className="btn btn--large btn--border-radius btn--green  clear-wishlist"
            onClick={() => history.push("/cart")}
          >
            go to cart
          </button>
          <button
            className="btn btn--large btn--border-radius  clear-wishlist"
            onClick={() => history.push("/")}
          >
            back to home
          </button>
          <button
            className={
              "btn btn--green btn--border-radius btn--large clear-wishlist"
            }
            onClick={onClearWishList}
          >
            Clear all items
          </button>
          <div className="products products-list__main">
            <CardList products={wishlist} startPage={START_PAGE} />
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
      </section>
    </>
  );
}
