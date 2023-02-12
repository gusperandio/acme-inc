/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from "react";
import "./card.css";
import { Link } from "react-router-dom";
import { saveFav } from "../configs/storage";

export default function Card(props) {
  // let nameLength = 2;
  // let descrLength = props.desc.length;
  // let price = 10 + nameLength * ((500 - descrLength) / (3 - nameLength));
  const like = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-heart"
      viewBox="0 0 16 16"
    >
      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
    </svg>
  );

  const fullLike = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-heart-fill"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
      />
    </svg>
  );

  const cart = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-cart"
      viewBox="0 0 16 16"
    >
      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  );

  const BtnLike = () => {
    return <button className="btn btn-sm btn-danger"  onClick={favClick}>{fullLike}</button>;
  };

  const BtnDislike = () => {
    return <button className="btn btn-sm btn-outline-danger" onClick={favClick}>{like}</button>;
  };

  const favClick = () =>{
    saveFav(props.id)

    liked ? setLike(false) : setLike(true)
  }

  const [liked, setLike] = useState(props.liked)

  return (
    <>
      <article className="card">
        <Link
          to={"/products/" + props.id}
          style={{ textDecoration: "none", color: "#222" }}
        >
          <div className="temporary_text">
            <img src={props.image} />
          </div>
        </Link>
        <div className="card_content">
          <span className="card_title">{props.name}</span>
          <span className="card_subtitle">
            R$ {props.price}
            <span>
              .<small>00</small>
            </span>
          </span>
          <div className="divOptions">
            <Link to={"/products/" + props.id}>
              <button
                className="btn btn-sm btn-primary"
                style={{ marginRight: "1rem" }}
              >
                {cart}
              </button>
            </Link>
            {liked ? <BtnLike /> : <BtnDislike />}
          </div>
          <Link
            to={"/products/" + props.id}
            style={{ textDecoration: "none", color: "#222" }}
          >
            <p className="card_description">
              {props.sub.substring(0, 165) + "..."}
            </p>
          </Link>
        </div>
      </article>
    </>
  );
}
