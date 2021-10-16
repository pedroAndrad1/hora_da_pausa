//Classe de usuário

export class User{
    id?:number;
    nome:string;
    email:string;
    senha?:string;
    foto?: string;
    level?: number;
    rotinasFeitas?: number;
    xp?: number;
    xpParaUpar?:number;
    contribuidor: boolean;


    constructor(
        nome?:string, 
        email?:string, 
        senha?:string,  
        id?:number,
        foto?: string,
        level?: number,
        rotinasFeitas?: number,
        xp?: number,
        xpParaUpar?:number,
        contribuidor?: boolean)
    {
        this.nome= nome;
        this.email = email;
        if(senha) this.senha = senha;
        if(foto) this.foto = foto;
        if(level) this.level = level;
        if(rotinasFeitas) this.rotinasFeitas = rotinasFeitas;
        if(xp) this.xp = xp;
        if(xpParaUpar) this.xpParaUpar = xpParaUpar;
        if(id) this.id = id;
        if(contribuidor) this.contribuidor = contribuidor;

    }
}