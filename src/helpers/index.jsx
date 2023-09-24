export const redondearNumero = (numero) => {
  const numeroRedondeado = numero.toFixed(2)
  return numeroRedondeado
}

export const getFecha = (timestamp) => {
  const date = new Date(timestamp)

  const options = { timeZone: 'Asia/Kolkata' }
  const formattedDate = date.toLocaleString('en-US', options)

  return formattedDate
}
