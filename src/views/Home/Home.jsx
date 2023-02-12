/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import React from "react";
import Card from "../../components/Card/card";
import Menu from "../../components/Menu/menu";
import "./home.css";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { Verbos, Adjetivos } from "../../components/Words/words";
import { geraNumeros } from "../../components/configs/configs";
import { Subscribe } from "../../components/Words/description";
import { saveProducts, deleta, select } from "../../components/configs/storage";

function saveImages(imgs) {
  if (!select("produtos")) {
    const verbs = Verbos;
    const adjs = Adjetivos;
    const sub = Subscribe;
    const numbersVerbs = geraNumeros(48);
    const numbersAdj = geraNumeros(48);

    for (let i = 0; i < 48; i++) {
      const nome1 = verbs[numbersVerbs[i]];
      const nome2 = adjs[numbersAdj[i]];
      let fullName = nome1 + " " + nome2;
      const nameLength =
        fullName.split(" ").length >= 3 ? 2 : fullName.split(" ").length;
      const subAux = sub[i];
      const descrLength =
        subAux[0].toUpperCase() + subAux.substring(1, subAux.length);
      const id = i + 1;
      const price =
        10 + nameLength * ((500 - descrLength.length) / (3 - nameLength));
      const img = imgs[i].download_url.substring(0, 29) + "255/240";
      if (nome1 && nome2) {
        saveProducts(
          id.toString(),
          fullName,
          price.toString(),
          descrLength,
          img
        );
      }
    }
  }
}

export default function Home() {
  const favorite = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-search-heart-fill"
      viewBox="0 0 16 16"
    >
      <path d="M6.5 13a6.474 6.474 0 0 0 3.845-1.258h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.008 1.008 0 0 0-.115-.1A6.471 6.471 0 0 0 13 6.5 6.502 6.502 0 0 0 6.5 0a6.5 6.5 0 1 0 0 13Zm0-8.518c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z" />
    </svg>
  );

  const search = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-search"
      viewBox="0 0 16 16"
    >
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    </svg>
  );

  const check = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-check-lg"
      viewBox="0 0 16 16"
    >
      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
    </svg>
  );

  const padrao = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-grid-3x3-gap"
      viewBox="0 0 16 16"
    >
      <path d="M4 2v2H2V2h2zm1 12v-2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm5 10v-2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zM9 2v2H7V2h2zm5 0v2h-2V2h2zM4 7v2H2V7h2zm5 0v2H7V7h2zm5 0h-2v2h2V7zM4 12v2H2v-2h2zm5 0v2H7v-2h2zm5 0v2h-2v-2h2zM12 1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zm-1 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zm1 4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2z" />
    </svg>
  );

  const justFav = () => {
    const newSearch = select("produtos").filter((i) => i.fav);
    setIcon(favorite);
    setCard(newSearch);
  };

  const allProduct = () => {
    const newSearch = select("produtos");
    setIcon(padrao);
    setCard(newSearch);
  };

  const searchName = (e) => {
    if (e) {
      e.preventDefault();
    }

    const element = document.getElementById("search");

    let newSearch = select("produtos");
    let result = [];
    const hasUpper = (str) => /[A-Z]/.test(str);

    for (let i = 0; i < newSearch.length; i++) {
      if (hasUpper(element.value)) {
        if (newSearch[i].name.includes(element.value)) {
          result.push(newSearch[i]);
        }
      } else {
        let aux;
        if (element.value.length > 1) {
          aux =
            element.value[0].toUpperCase() +
            element.value.substring(1, element.length);
        } else {
          aux = element.value[0].toUpperCase();
        }

        if (newSearch[i].name.includes(aux)) {
          result.push(newSearch[i]);
        }

        if (newSearch[i].name.includes(element.value)) {
          result.push(newSearch[i]);
        }
      }
    }

    if (result[0].name) {
      setCard(result);
    }
  };

  const clearAll = () => {
    const element = document.getElementById("search");
    if (element.value.length === 0) {
      const newSearch = select("produtos");
      setCard(newSearch);
    }
  };

  const [cards, setCard] = useState([]);
  const [icon, setIcon] = useState(padrao);

  useEffect(() => {
    api
      .get("/v2/list?page=5&limit=49")
      .then((obj) => {
        saveImages(obj.data);
        setCard(select("produtos"));
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
    document.title = "Acme Inc.";
  }, []);

  return (
    <>
      <Menu />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <form className="d-inline-flex p-2" role="search" onSubmit={searchName}>
          <div className="dropdown" style={{ marginRight: "1rem" }}>
            <button
              className="btn btn-success dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {icon}
            </button>
            <ul className="dropdown-menu" style={{ cursor: "pointer" }}>
              <li className="check">
                <div className="dropdown-item" onClick={allProduct}>
                  Padrão
                </div>

                <span>{padrao}</span>
              </li>
              <li className="check">
                <a className="dropdown-item" onClick={justFav}>
                  Favoritos
                </a>

                <span>{favorite}</span>
              </li>
            </ul>
          </div>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            id="search"
            onChange={clearAll}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
      <div className="products animate__animated animate__zoomIn">
        {cards.map((i) => {
          return (
            <Card
              name={i.name}
              price={i.value}
              sub={i.desc}
              image={i.image}
              liked={i.fav}
              key={i.name}
              id={i.id}
            />
          );
        })}
      </div>
    </>
  );
}
