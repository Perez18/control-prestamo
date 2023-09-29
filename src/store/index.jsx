import { addDoc, collection, getDocs } from 'firebase/firestore/lite'
import { create } from 'zustand'
import db from '../service/firebase/config'

export const usePrestamo = create((set, get) => ({
  prestamo: [],
  loading: true,
  finishLoading: () => {
    set({ loading: false })
  },
  fetchPrestamo: async () => {
    const prestamoColl = collection(db, 'prestamo')
    const prestamos = await getDocs(prestamoColl)
    const prestamosLista = prestamos.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    set({ prestamo: prestamosLista })
    get().finishLoading()
  },
  getFindPrestamo: idPrestamo => {
    const prestamo = get().prestamo.find(({ id }) => (id === idPrestamo))
    return prestamo
  },
  postPrestamo: async (data) => {
    const { nombre, prestamo, interes } = data
    const res = await addDoc(collection(db, 'prestamo'), {
      nombre,
      deuda_inicial: parseFloat(prestamo),
      deuda_interes: 0,
      deuda_pagada: 0,
      deuda_pendiente: 0,
      interes,
      ganacias: 0,
      estado: true,
      fecha_creacion: new Date()
    })

    console.log(res)
  }
}))
