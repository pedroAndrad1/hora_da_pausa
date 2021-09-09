import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Habilita o css, sem isso o toast nao funciona
toast.configure();

//O toast pode receber de uma string ate um component como content
//api https://fkhadra.github.io/react-toastify/api/toast


const configPadrao= {
    closeButton: false,
    hideProgressBar: false,
    autoClose: 5000,
    position: "top-right",
}

const success = (content, config) => {

    config? toast.success(content, config) : toast.success(content, configPadrao);

}
const info = (content, config) => {

    config? toast.info(content, config) : toast.info(content, configPadrao);

}
const warning = (content, config) => {

    config? toast.warn(content, config) : toast.warn(content, configPadrao);

}
const error = (content, config) => {

    config? toast.error(content, config) : toast.error(content, configPadrao);
}


export default {
    success,
    info,
    warning,
    error
}