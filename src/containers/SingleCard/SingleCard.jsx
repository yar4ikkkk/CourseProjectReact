import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./SingleCard.scss";
import axios from "axios";
import { URL_PRODUCTS } from "constants/index";
import { useHistory } from "react-router-dom";

export function SingleCard() {
  let { id } = useParams();
  const [cardProps, setCardProps] = useState({
    images: [],
  });
  const history = useHistory();
  useEffect(() => {
    axios.get(`${URL_PRODUCTS}/${id}`).then((res) => setCardProps(res.data));
  }, []);
  return (
    <section className="single-product">
      <div className="container">
        <button
          className="btn btn--large btn--border-radius  clear-wishlist"
          onClick={() => history.push("/")}
        >
          back to home
        </button>
        <article className="product-card product-card--single">
          <div className="product-card__main">
            <div className="product-card__img">
              <img src={`${cardProps.images[0]}`} alt={"product"} />
            </div>
            <div className="single-card__info">
              <div className="single-card__wr">
                <h3>{cardProps.title}</h3>
                <div className="single-card__price">${cardProps.price}</div>
              </div>
              <div className="single-card__description">
                {cardProps.description}
              </div>
            </div>
          </div>
        </article>
      </div >
    </section >
  );
}

// import { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import "./SingleCard.scss";
// import axios from "axios";
// import { URL_PRODUCTS } from "constants/index";
// import { useHistory } from "react-router-dom";

// export function SingleCard() {
//   let { id } = useParams();
//   const [cardProps, setCardProps] = useState({
//     images: [],
//   });
//   const history = useHistory();
//   useEffect(() => {
//     axios.get(`${URL_PRODUCTS}/${id}`).then((res) => setCardProps(res.data));
//   }, []);
//   return (
//     <section className="single-product">
//       <div className="container">
//         <button
//           className="btn btn--large btn--border-radius  clear-wishlist"
//           onClick={() => history.push("/")}
//         >
//           back to home
//         </button>
//         <article className="product-card product-card--single">
//           <div className="product-card__main">
//             <div className="product-card__img">
//               <img src={`${cardProps.images[0]}`} alt={"product"} />
//             </div>
//             <div className="product-card__info">
//               <div className="product-card__wr">
//                 <h3>{cardProps.title}</h3>
//                 <div className="product-card__price">${cardProps.price}</div>
//               </div>
//               <div className="product-card__description">
//                 {/* <h3>{cardProps.title}</h3> */}
                
//                 {/* <p>Redesigned from scratch and completely revised.</p> */}

//                 {cardProps.description && <p>{cardProps.description}</p>}
//               </div>
//             </div>
//           </div>
//         </article>
//       </div >
//     </section >
//   );
// }
