/* eslint-disable no-undef */
import React from "react";
import Menu from "../../components/Menu/menu";
import "./products.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { saveCart, select, saveFav } from "../../components/configs/storage";
import { Link } from "react-router-dom";

const descIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-file-richtext"
    viewBox="0 0 16 16"
  >
    <path d="M7 4.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V7.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V7s1.54-1.274 1.639-1.208zM5 9a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z" />
    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
  </svg>
);
const cart = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-cart-plus"
    viewBox="0 0 16 16"
  >
    <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
  </svg>
);
const dislike = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="currentColor"
    className="bi bi-chat-square-heart dislike"
    viewBox="0 0 16 16"
  >
    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12ZM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z" />
    <path d="M8 3.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
  </svg>
);

const like = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="currentColor"
    className="bi bi-chat-square-heart-fill like"
    viewBox="0 0 16 16"
  >
    <path d="M2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm6 3.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
  </svg>
);

const buyMore = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-bag-plus-fill"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z"
    />
  </svg>
);

export default function Products() {
  useEffect(() => {
    document.title = allP[0].name.split(" ")[0] + " - Acme Inc.";
  }, []);

  const BtnLike = () => {
    return (
      <button className="btn btn-sm btn-outline-dark" onClick={favClick}>
        {like}
      </button>
    );
  };

  const BtnDislike = () => {
    return (
      <button className="btn btn-sm btn-ouline-danger" onClick={favClick}>
        {dislike}
      </button>
    );
  };

  const addCart = () => {
    saveCart(id, "1");
  };

  const favClick = () => {
    const allPaux = select("produtos").filter((i) => i.id === id);
    saveFav(allPaux[0].id);

    liked ? setLike(false) : setLike(true);
  };

  const { id } = useParams();
  const allP = select("produtos").filter((i) => i.id === id);
  const [liked, setLike] = useState(allP[0].fav);

  const img = allP[0].image.replace("255", "350").replace("240", "350");

  return (
    <>
      <Menu />
      <ul className="breadcrumb">
        <li>
          <Link to={"/"} style={{ textDecoration: "underline" }}>
            Home
          </Link>
        </li>
        <li>
          <Link style={{ color: "#C4C4C4", textDecoration: "none" }}>
            Pictures
          </Link>
        </li>
      </ul>
      <section className="banner">
        <div>
          <h2>{allP[0].name}</h2>
          <h3>
            R$ {allP[0].value}.<small>00</small>
          </h3>
          <br />
          <div className="divBtn">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={addCart}
            >
              Comprar
            </button>
            {liked ? <BtnLike /> : <BtnDislike />}
          </div>

          <div
            className="modal fade animate__animated animate__zoomIn"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5"
                    id="exampleModalLabel"
                    style={{ color: "#222" }}
                  >
                    {/* {jsonIcon}  */}
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div
                  className="modal-body"
                  style={{ textAlign: "center", color: "#222" }}
                >
                  Produto{" "}
                  <span style={{ textDecoration: "underline" }}>
                    {allP[0].name}
                  </span>{" "}
                  adicionado ao carrinho.
                </div>
                <div className="modal-footer">
                  <Link to={"/cart"}>
                    <button
                      type="button"
                      className="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      Ir para o carrinho {cart}
                    </button>
                  </Link>
                  <Link to={"/home"}>
                    <button
                      type="button"
                      className="btn btn-success"
                      data-bs-dismiss="modal"
                    >
                      Continuar comprando {buyMore}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src={img} />
      </section>
      <section className="banner2">
        <br />
        <br />
        <h2>Descrição&nbsp; {descIcon}</h2>
        <p>{allP[0].desc}</p>
      </section>
    </>
  );
}
