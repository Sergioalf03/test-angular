export class Vehicle {

  constructor(
    public id: string,
    public brand: string,
    public model: string,
    public color: string,
    public year: string,
    public type: number,
  ) {}


  toString() {
    return `${this.brand},${this.model},${this.color},${this.year},${this.type}`;
  }

}
