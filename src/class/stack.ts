import { Nodo } from "./nodo";

export class Stack<T> {
  public inicio: Nodo<T> | null;
  public count: number = 0;

  constructor(_inicio?: Nodo<T>) {
    if (_inicio) {
      this.inicio = _inicio;
    } else {
      this.inicio = null;
    }
  }

  push(nuevo: Nodo<T>) {
    if (this.inicio == null) {
      this.inicio = nuevo;
    } else {
      let inicio = this.inicio;
      while (inicio.sgte != null) {
        inicio = inicio.sgte;
      }
      inicio.sgte = nuevo;
    }
    this.count++;
  }

  pop() {
    const dinicio = this.inicio;
    this.inicio = this.inicio?.sgte ?? null;
    if (dinicio != null) {
      this.count--;
    }
    return dinicio;
  }
}
