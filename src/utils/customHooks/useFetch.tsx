import Toast from "../../utils/Toast";
import Cookie from "js-cookie";
import { useRouter } from "next/router";


interface Cookie {
    key: string,
    value: string
}

export function useFetch() {

    const router = useRouter();

    //Para evitar repetições nos handles
    const handleRes = (res: Response, errorMessage: string, successMessage?: string, redirectUrl?: string,
        cookie?: Cookie) => {
        if (res.ok) {
            if (successMessage) Toast.success(successMessage);
            if (redirectUrl) router.push(redirectUrl);
            if (cookie) Cookie.set(cookie.key, cookie.value);
        }
        else {
            Toast.error(errorMessage);
        }

    }

    const handleError = (err: any) =>
        Toast.error('Estamos enfrentando problemas no servidor. Por favor, tente novamente mais tarde!')


    return{
        handleRes,
        handleError
    }
}