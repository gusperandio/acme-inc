/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu/menu";
import "./cart.css";
import { deleta, select, saveCart } from "../../components/configs/storage";
import List from "../../components/List/list";
import empty from "../../imgs/empty.png";
export default function Cart() {
  const jsonIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      className="bi bi-filetype-json"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM4.151 15.29a1.176 1.176 0 0 1-.111-.449h.764a.578.578 0 0 0 .255.384c.07.049.154.087.25.114.095.028.201.041.319.041.164 0 .301-.023.413-.07a.559.559 0 0 0 .255-.193.507.507 0 0 0 .084-.29.387.387 0 0 0-.152-.326c-.101-.08-.256-.144-.463-.193l-.618-.143a1.72 1.72 0 0 1-.539-.214 1.001 1.001 0 0 1-.352-.367 1.068 1.068 0 0 1-.123-.524c0-.244.064-.457.19-.639.128-.181.304-.322.528-.422.225-.1.484-.149.777-.149.304 0 .564.05.779.152.217.102.384.239.5.41.12.17.186.359.2.566h-.75a.56.56 0 0 0-.12-.258.624.624 0 0 0-.246-.181.923.923 0 0 0-.37-.068c-.216 0-.387.05-.512.152a.472.472 0 0 0-.185.384c0 .121.048.22.144.3a.97.97 0 0 0 .404.175l.621.143c.217.05.406.12.566.211a1 1 0 0 1 .375.358c.09.148.135.335.135.56 0 .247-.063.466-.188.656a1.216 1.216 0 0 1-.539.439c-.234.105-.52.158-.858.158-.254 0-.476-.03-.665-.09a1.404 1.404 0 0 1-.478-.252 1.13 1.13 0 0 1-.29-.375Zm-3.104-.033a1.32 1.32 0 0 1-.082-.466h.764a.576.576 0 0 0 .074.27.499.499 0 0 0 .454.246c.19 0 .33-.055.422-.164.091-.11.137-.265.137-.466v-2.745h.791v2.725c0 .44-.119.774-.357 1.005-.237.23-.565.345-.985.345a1.59 1.59 0 0 1-.568-.094 1.145 1.145 0 0 1-.407-.266 1.14 1.14 0 0 1-.243-.39Zm9.091-1.585v.522c0 .256-.039.47-.117.641a.862.862 0 0 1-.322.387.877.877 0 0 1-.47.126.883.883 0 0 1-.47-.126.87.87 0 0 1-.32-.387 1.55 1.55 0 0 1-.117-.641v-.522c0-.258.039-.471.117-.641a.87.87 0 0 1 .32-.387.868.868 0 0 1 .47-.129c.177 0 .333.043.47.129a.862.862 0 0 1 .322.387c.078.17.117.383.117.641Zm.803.519v-.513c0-.377-.069-.701-.205-.973a1.46 1.46 0 0 0-.59-.63c-.253-.146-.559-.22-.916-.22-.356 0-.662.074-.92.22a1.441 1.441 0 0 0-.589.628c-.137.271-.205.596-.205.975v.513c0 .375.068.699.205.973.137.271.333.48.589.626.258.145.564.217.92.217.357 0 .663-.072.917-.217.256-.146.452-.355.589-.626.136-.274.205-.598.205-.973Zm1.29-.935v2.675h-.746v-3.999h.662l1.752 2.66h.032v-2.66h.75v4h-.656l-1.761-2.676h-.032Z"
      />
    </svg>
  );

  const clipBoadIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-clipboard-check-fill"
      viewBox="0 0 16 16"
    >
      <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z" />
      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z" />
    </svg>
  );

  const carregaJSON = () => {
    const cart = loadProducts();
    const favoritos = select("produtos").filter((f) => f.fav);
    let stringFinal =
      `{ "name": "maria", "phone": "+55 41 9999-999", "favoritesLength": ` +
      favoritos.length +
      `, "favorites" : [ `;

    for (let i = 0; i < favoritos.length; i++) {
      stringFinal += `{ "id": "` + favoritos[i].id + `", `;
      stringFinal += ` "name": "` + favoritos[i].name + `", `;
      stringFinal += ` "value": ` + favoritos[i].value + `, `;
      stringFinal += ` "image": "` + favoritos[i].image + `", `;
      stringFinal += ` "desc": "` + favoritos[i].desc + `", `;
      stringFinal += ` "fav": ` + favoritos[i].fav + ` }`;

      if (i < favoritos.length - 1) {
        stringFinal += ", ";
      }
    }
    stringFinal += ` ], "cartLength" : ` + cart.length + `, "products" : [ `;

    for (let i = 0; i < cart.length; i++) {
      stringFinal += `{ "id": "` + cart[i].id + `", `;
      stringFinal += ` "name": "` + cart[i].name + `", `;
      stringFinal += ` "value": ` + cart[i].value + `, `;
      stringFinal += ` "image": "` + cart[i].image + `", `;
      stringFinal += ` "desc": "` + cart[i].desc + `", `;
      stringFinal += ` "fav": ` + cart[i].fav + ` }`;

      if (i < cart.length - 1) {
        stringFinal += ", ";
      }
    }

    stringFinal += " ] }";
    setJson(stringFinal);
  };

  const loadProducts = () => {
    const cart = select("carrinho");
    let add = [];
    let valueTotal = 0;
    if (cart) {
      for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        const aux = select("produtos").filter((i) => i.id === element.id);
        aux[0].qtd = cart[i].qtd;
        aux[0].image = aux[0].image.replace("255", "100").replace("240", "100");
        valueTotal = valueTotal + aux[0].qtd * parseInt(aux[0].value, 10);
        add.push(aux[0]);
      }
    }
    setTotal(valueTotal);
    return add;
  };
  const [total, setTotal] = useState(0);
  const [added, setAdd] = useState([]);
  const [jsonFinal, setJson] = useState("[]");

  useEffect(() => {
    document.title = "Carrinho - Acme Inc.";
    setAdd(loadProducts());

    carregaJSON()
  }, []);

  const deleteCart = (id) => {
    deleta("carrinho", id);
    setAdd(loadProducts());
  };

  const updateValue = (id, type) => {
    saveCart(id, "1", type);
    setAdd(loadProducts());
  };

  const CartComplete = () => {
    return (
      <div className="product" key="cart">
        {added.map((a) => {
          return (
            <List
              name={a.name}
              price={a.value}
              sub={a.desc}
              image={a.image}
              like={a.fav}
              key={a.name}
              id={a.id}
              qtd={a.qtd}
              deleteCart={deleteCart}
              updateValue={updateValue}
            />
          );
        })}
        <br />
        <div className="divFinalBtn divFinalBtnMobile">
          <div style={{ paddingLeft: "5rem" }}>
            <button
              type="button"
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#modalFinal"
              onClick={carregaJSON}
            >
              Finalizar compra
            </button>
          </div>
          <div style={{ paddingRight: "3rem", color: "#222" }}>
            <p style={{ fontWeight: "100", fontSize: "2rem" }}>
              R$ {total}.<small>00</small>
            </p>
          </div>
          <div
            className="modal fade"
            id="modalFinal"
            tabIndex={"-1"}
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
                    JSON Final {jsonIcon}
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body" id="JsonResp">
                  <code>
                    {jsonFinal}
                  </code>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Fechar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      navigator.clipboard.writeText(jsonFinal);
                    }}
                  >
                    Copiar {clipBoadIcon}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Empty = () => {
    return (
      <>
        <div className="divEmpty">
          <img src={empty} className="imgEmpty" />
        </div>
      </>
    );
  };

  return (
    <>
      <Menu></Menu>
      {added.length > 0 ? <CartComplete /> : <Empty />}
    </>
  );
}
