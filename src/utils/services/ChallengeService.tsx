//Faz as operacoes com o banco para challenges (exercicios) e rotinas

import Cookies from "js-cookie";
import Toast from "../Toast";



const API_URL = process.env.NEXT_PUBLIC_API;
const access_token = Cookies.get('access_token');

const request_options = (...body) => {
    return  {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
        body: JSON.stringify({...body})
    }
}

const handleRes = async (res: Response, error_message: string) => {
        if(res.ok){
            const json = await res.json();
            return json;
        }
        else{
           throw Error(error_message);
        }
}

const iniciarRotina = async id_user => {
    return await fetch(`${API_URL}/api/iniciarRotina/`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
        body: JSON.stringify({id_user})
    })
    .then( async res =>{
        return await handleRes(res,'Não foi possível iniciar a rotina. Por favor, tente novamente mais tarde.');
    })

}

const getChallenge = async type => {
    return await fetch(`${API_URL}/api/getExercicio`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
        body: JSON.stringify({type})
    })
    .then( async res =>{
        return await handleRes(res,'Não foi possível carregar um desafio. Por favor, tente novamente mais tarde.');
    })
}

const confirmaChallenge = async (id_rotina, id_user, exp) =>{
    return await fetch(`${API_URL}/api/confirmarExercicio/`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
        body: JSON.stringify({id_rotina, id_user, exp})
    })
    .then( async res =>{
        return await handleRes(res,'Não foi possível confirmar a rotina. Por favor, tente novamente mais tarde.')
    })
}

const cancelarChallenge_Rotina = async (id_rotina) =>{
    return await fetch(`${API_URL}/api/cancelarRotina`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        },
        body: JSON.stringify({id_rotina})
    })
    .then( async res =>{
        return await handleRes(res,'Não foi possível cancelar a rotina. Por favor, tente novamente mais tarde.')
    })
}

export default {
    iniciarRotina,
    getChallenge,
    confirmaChallenge,
    cancelarChallenge_Rotina
}
