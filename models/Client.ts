export default class Client{
    id!:string;
    name!:string;
    height!:number;
    weight!:number;
    age!:number;
    dob!:string;
    gender!:string;
    image!:string;

    constructor( name: string, height: number, weight: number, age: number,dob:string, gender:string , image:string ) {
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.age = age;
        this.dob =dob;
        this.gender = gender;
        this.image = image;
    }
}