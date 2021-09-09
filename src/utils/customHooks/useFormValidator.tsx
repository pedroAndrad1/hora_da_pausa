var isGithubUrl = require('is-github-url');

/* 
    Valida se o user do github e valido. Essa function so valida se a url recebida
    e do dominio do github. Entao pode nao ser necessariamente o profile. 
    Preciso achar um regex para isso.
*/
const isGithubValid = (githubUser: string) => {
    return isGithubUrl(githubUser);
}

/* 
    Valida o password, esperando um intervalo de 3 segs. Um password valido tem pelo menos 8 caracteres.
*/
const isPasswordValid = (password: string) => {
    
    console.log(password.length)

    if (password.length + 1 < 8) {
        return false;
    }
    else {
        return true;
    }
}

export {
    isGithubValid,
    isPasswordValid
}