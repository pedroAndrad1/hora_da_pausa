//Classe de usuário

export class User{
    id?:number;
    name:string;
    email:string;
    password?:string;
    foto?: string;
    level?: number;
    rotinasFeitas?: number;
    xp?: number;
    xpParaUpar?:number;
    contribuidor: boolean;


    constructor(
        name?:string, 
        email?:string, 
        password?:string,  
        id?:number,
        foto?: string,
        level?: number,
        rotinasFeitas?: number,
        xp?: number,
        xpParaUpar?:number,
        contribuidor?: boolean)
    {
        this.name= name;
        this.email = email;
        if(password) this.password = password;
        if(foto) this.foto = foto;
        if(level) this.level = level;
        if(rotinasFeitas) this.rotinasFeitas = rotinasFeitas;
        if(xp) this.xp = xp;
        if(xpParaUpar) this.xpParaUpar = xpParaUpar;
        if(id) this.id = id;
        if(contribuidor) this.contribuidor = contribuidor;

    }
}