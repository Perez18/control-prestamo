export const redondearNumero = (numero) => {
  const numeroRedondeado = numero?.toFixed(2) || 0
  return numeroRedondeado
}

export const getFecha = (timestamp) => {
  const date = new Date(timestamp)

  const formattedDate = date.toLocaleString('en-US')

  return formattedDate
}
