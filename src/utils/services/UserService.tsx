import Cookies from "js-cookie";
import { User } from "../../models/User.model";

//Faz as operacoes com o banco para usuarios
const API_URL = process.env.NEXT_PUBLIC_API;

const handleRes = async (res: Response, error_message: string) => {
    //console.log(res);
    if(res.ok){
        const json = await res.json();
        return json;
    }
    else{
       throw Error(error_message);
    }
}

//Cadastra um usuario
const create = async (user: User) => {
    
    let request = await fetch(`${API_URL}/usuario/create`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(user)
    });

    return request;
}

//Loga um usuario
const login = async (email: string, password: string) => {
    
    return await fetch(`${API_URL}/api/login`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
}

//Loga um usuario com facebook
const loginFacebook = async (email: string, password: number, name: string) => {
    console.log('Entrei no login facebook')
    return await fetch(`${API_URL}/api/login/facebook`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password, name })
    })
}

//Manda um email de reset de senha para o usuario
const forgotPassword = async (email: string) => {
    
    let request = await fetch(`${API_URL}/api/forgotpassword`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    });

    return request;
}

//Cria um novo password para o usuario. O token estara como parametro na url
const resetPassword = async (token:string, password: string) => {
    
    let request = await fetch(`${API_URL}/api/resetpassword`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token, password})
    });

    return request;
}

const userLevelUp = async (id_user) => {
    return await fetch(`${API_URL}/api/levelUp`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookies.get('access_token')
        },
        body: JSON.stringify({id_user})
    })
    .then( async res =>{
        console.log(res)
        return await handleRes(res,'Não foi possível upar de level. Por favor, tente novamente mais tarde.')
    })
}

const refreshUser = async () =>{
    return await fetch(`${API_URL}/api/me`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookies.get('access_token')
        }
    })
    .then( async res =>{
        console.log(res)
        return await handleRes(res,'Não foi possível atualizar as informações do usuário. Por favor, tente realizar login')
    })
}

const update = async (formData:FormData) =>{
    return await fetch(`${API_URL}/api/editPerfil`,{
        method: 'POST',
        headers:{
            'Authorization': 'Bearer ' + Cookies.get('access_token')
        },
        body: formData
    })    
}

const GetPhoto = async urlImage =>{
    return await fetch(`${API_URL}/${urlImage}`,{
        method: 'GET',
        headers:{
            'Authorization': 'Bearer ' + Cookies.get('access_token')
        }
    })
    .then(res =>{
        console.log(res);
        return res;
    })
}

const doacao = async (id_user, name, value, cpf) => {
    return await fetch(`${API_URL}/api/paymentRequest`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookies.get('access_token')
        },
        body: JSON.stringify({id_user, name, value, cpf})
    })
    .then( async res =>{
        console.log(res)
        return await handleRes(res,'Não foi posssível realizar o pagamento')
    })
}

const getSolicitacaoPagamento = async (referenceId:string) => {
    return await fetch(`${API_URL}/api/getPaymentRequest`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookies.get('access_token')
        },
        body: JSON.stringify({referenceId})
    })
    .then( async res =>{
        console.log(res)
        return await handleRes(res, null)
    })
}
//const doacao1 = async (id_user: string, name: string, value, )

export default{ 
    create,
    login,
    forgotPassword,
    resetPassword,
    userLevelUp,
    refreshUser,
    update,
    GetPhoto,
    loginFacebook,
    doacao,
    getSolicitacaoPagamento
}