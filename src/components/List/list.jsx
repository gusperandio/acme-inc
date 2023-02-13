import React, { useState } from "react";
import { saveFav } from "../configs/storage";
import "./list.css";

export default function List(props) {
  const trash = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      className="bi bi-trash3"
      viewBox="0 0 16 16"
    >
      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
    </svg>
  );
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

  const [liked, setLike] = useState(props.like);
  const BtnLike = () => {
    return (
      <button className="btn btn-sm btn-outline-danger" onClick={favClick}>
        {fullLike}
      </button>
    );
  };

  const BtnDislike = () => {
    return (
      <button className="btn btn-sm btn-outline-danger" onClick={favClick}>
        {like}
      </button>
    );
  };


  const favClick = () => {
    saveFav(props.id);
    liked ? setLike(false) : setLike(true);
  };
  
  return (
    <div key={props.name}>
      <div className="infos">
        <img src={props.image} className="imgInfo" />
        <div className="infoProduct infoProductTitle">
          <h4 className="h4M">{props.name}</h4>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "150px",
            }}
          >
            <button type="button" className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" >{trash}</button>

              <div className="modal fade" id="exampleModal" tabIndex={"-1"} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">Deseja remover este produto?</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      Caso remova este produto, ele se encontrará novamente na tela inicial, basta procurar pelo nome de <span style={{textDecoration: "underline"}}>{props.name}</span>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                      <button type="button" className="btn btn-outline-danger" onClick={() => props.deleteCart(props.id)} data-bs-dismiss="modal">Remover</button>
                    </div>
                  </div>
                </div>
              </div>
            {liked ? <BtnLike /> : <BtnDislike />}
          </div>
        </div>

        <div className="infoProduct">
          <div
            className="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => props.updateValue(props.id, "sub")}>
              -
            </button>
            <button
              type="button"
              className="btn btn-outline-dark btn-sm"
              disabled
            >
              {props.qtd}
            </button>
            <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => props.updateValue(props.id, "sum")}>
              +
            </button>
          </div>
        </div>

        <div className="infoProduct">
          <p style={{ margin: "0", fontWeight: "500" }}>
            R$ {props.price}.<small>00</small>
          </p>
        </div>
      </div>
      <hr className="divsorP" />
    </div>
  );
}
