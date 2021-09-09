export default class Challenge{
    id: number;
    type: 'body' | 'eye';
    description: string;
    amount: number;
    
    constructor(type, description, amount, id?){
        this.type = type;
        this.description = description;
        this.amount = amount;
        if(id) this.id = id;
    }

}