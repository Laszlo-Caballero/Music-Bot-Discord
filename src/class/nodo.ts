export class Nodo<T> {
  public sgte: Nodo<T> | null;
  public dato: T;

  constructor(_dato: T, _sgte?: Nodo<T>) {
    this.dato = _dato;
    if (_sgte) {
      this.sgte = _sgte;
    } else {
      this.sgte = null;
    }
  }

  toString() {
    return `Dato: ${this.dato}, Sgte: ${this.sgte ? "Nodo" : "null"}`;
  }
}
