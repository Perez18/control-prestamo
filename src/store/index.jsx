import { collection, getDocs } from 'firebase/firestore/lite'
import { create } from 'zustand'
import db from '../service/firebase/config'

export const usePrestamo = create((set, get) => ({
  prestamo: [],
  fetchPrestamo: async () => {
    const prestamoColl = collection(db, 'prestamo')
    const prestamos = await getDocs(prestamoColl)
    const prestamosLista = prestamos.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    set({ prestamo: prestamosLista })
  },
  getFindPrestamo: idPrestamo => {
    const prestamo = get().prestamo.find(({ id }) => (id === idPrestamo))
    return prestamo
  }
}))
