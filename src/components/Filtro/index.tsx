import { InputHTMLAttributes } from "react";
import styles from "./Filtro.module.scss";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>){
    return(
        <div className={styles.wrapper}>  
            <label htmlFor={props.name}>Busca:</label>
            <input {...props}/>
        </div>
    )
}