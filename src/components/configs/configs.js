function numeros(min, max, array){
  const al = parseInt(Math.random() * (max + 1 - min)) + min
  return array.includes(al) ? numeros(min, max, array) : al
}

export function geraNumeros(qtde){
  const number = Array(qtde).fill(0).reduce((nums) =>{
    const newNumber = numeros(0, qtde, nums)
    return [...nums, newNumber]
  }, [])

  return number
}
