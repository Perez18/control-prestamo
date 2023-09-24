import { collection, getDocs } from 'firebase/firestore/lite'
import { create } from 'zustand'
import db from '../service/firebase/config'

export const usePrestamo = create(set => ({
  prestamo: [],
  fetchPrestamo: async () => {
    const prestamoColl = collection(db, 'prestamo')
    const prestamos = await getDocs(prestamoColl)
    const prestamosLista = prestamos.docs.map(doc => doc.data())

    console.log(prestamosLista)

    set({ prestamo: prestamosLista })
  }
}))
