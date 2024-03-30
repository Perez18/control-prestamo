/* eslint-disable camelcase */
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore/lite'
import { create } from 'zustand'
import db from '../service/firebase/config'

export const usePrestamo = create((set, get) => ({
  prestamo: [],
  pagos: [],
  loading: false,
  startLoading: () => {
    set({ loading: true })
  },
  finishLoading: () => {
    set({ loading: false })
  },
  fetchPrestamo: async () => {
    get().startLoading()
    const prestamoColl = collection(db, 'prestamo')
    const prestamos = await getDocs(prestamoColl)
    const prestamosLista = prestamos.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(d => d.estado === true)

    set({ prestamo: prestamosLista })
    get().finishLoading()
  },
  fetchPagos: async (idPrestamo) => {
    const pagosCollection = collection(db, 'pagos')
    const pagos = await getDocs(pagosCollection)
    const pagosLista = pagos.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(d => d.idPrestamo === idPrestamo)

    // console.log(pagosLista)
    return pagosLista
  },
  getFindPrestamo: idPrestamo => {
    const prestamo = get().prestamo.find(({ id }) => (id === idPrestamo))
    return prestamo
  },
  postPrestamo: async (data) => {
    const { nombre, prestamo, interes } = data
    await addDoc(collection(db, 'prestamo'), {
      nombre,
      deuda_inicial: parseFloat(prestamo),
      deuda_interes: 0,
      deuda_pagada: 0,
      deuda_pendiente: parseFloat(prestamo),
      interes,
      ganancia: 0,
      estado: true,
      fecha_creacion: new Date()
    })

    // console.log(res)

    get().fetchPrestamo()
  },
  updateDeletePrestado: async (idPrestamo) => {
    const prestamoColl = doc(db, 'prestamo', idPrestamo)
    const res = await updateDoc(prestamoColl, {
      estado: false
    })

    console.log(res)

    get().fetchPrestamo()
  },
  // pago
  postPago: async (data) => {
    const { idPrestamo, montopagar, deuda_pagada, deuda_pendiente } = data
    const res = await addDoc(collection(db, 'pagos'), {
      idPrestamo,
      monto: montopagar,
      fecha_creacion: new Date()
    })

    // monto total pagado
    const deudaPagada = parseFloat(deuda_pagada) + parseFloat(montopagar)
    // deuda pendiente
    const deudaPendiente = deuda_pendiente - montopagar

    const prestamoCol = doc(db, 'prestamo', idPrestamo)
    const res2 = await updateDoc(prestamoCol, {
      deuda_pagada: deudaPagada,
      deuda_pendiente: deudaPendiente
    })

    console.log(res, res2)

    get().fetchPrestamo()
  }
}))
