/* eslint-disable no-undef */
const key = "produtos";
const keyCart = "carrinho";
export function saveProducts(ids, names, values, descs, images) {
  const collectionProduct = [];
  const recebido = {
    id: ids,
    name: names,
    value: values,
    desc: descs,
    image: images,
    fav: false,
  };

  const value = localStorage.getItem(key);

  if (value === undefined || value === null) {
    collectionProduct.push(recebido);
    localStorage.setItem(key, JSON.stringify(collectionProduct));
  } else {
    const collection = select(key);
    if (collection) {
      collection.push(recebido);
      localStorage.setItem(key, JSON.stringify(collection));
    }
  }
}

export function saveCart(ids, qtds, type) {
  const collectionCart = [];
  let recebido = {
    id: ids,
    qtd: qtds,
  };

  const value = localStorage.getItem(keyCart);

  if (value === undefined || value === null) {
    collectionCart.push(recebido);
    localStorage.setItem(keyCart, JSON.stringify(collectionCart));
  } else {
    let collection = select(keyCart).filter((i) => i.id === ids);

    if (!collection || collection.length === 0) {
      collection = select(keyCart);
      collection.push(recebido);
      localStorage.setItem(keyCart, JSON.stringify(collection));
    } else {
      const aux = parseInt(collection[0].qtd, 10);
      
      if (type === "sum") {
        recebido.qtd = parseInt(aux + 1, 10);
      } else {
        recebido.qtd = parseInt(aux - 1, 10);
      }
      const idAux = parseInt(ids, 10) - 1;
      
      
      deleta(keyCart, ids);
      if(recebido.qtd > 0){
        collection = select(keyCart);
        collection.splice(idAux, 0, recebido);
        localStorage.setItem(keyCart, JSON.stringify(collection));
      }
    }
  }
}

export function saveFav(ids) {
  let collectionComplete = select(key);
  if (collectionComplete) {
    let collectionAux = select(key).filter((i) => i.id === ids);

    const recebido = {
      id: collectionAux[0].id,
      name: collectionAux[0].name,
      value: collectionAux[0].value,
      desc: collectionAux[0].desc,
      image: collectionAux[0].image,
      fav: !collectionAux[0].fav,
    };

    console.log(collectionAux[0].fav);
    const idAux = parseInt(ids, 10) - 1;

    deleta(key, ids);
    collectionComplete = select(key);
    collectionComplete.splice(idAux, 0, recebido);
    localStorage.setItem(key, JSON.stringify(collectionComplete));
  }
}

export function select(chave) {
  const value = localStorage.getItem(chave);

  if (value === undefined || value === null) {
    return;
  }

  const colecao = JSON.parse(value);
  return colecao;
}

export function deleta(chave, item) {
  console.log(chave, item);
  const value = select(chave);
  if (value) {
    const result = value.filter((i) => i.id !== item);
    localStorage.setItem(chave, JSON.stringify(result));
  }
}
