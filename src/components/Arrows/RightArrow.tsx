import { ButtonHTMLAttributes } from 'react';
import styles from './Arrows.module.scss';

export default function RightArrow(props : ButtonHTMLAttributes<HTMLButtonElement>) {
        return (
            <button className={`${styles.reset_button} ${styles.arrow_button}`} {...props}>
                <i className={`${styles.arrow} ${styles.right}`}></i>
            </button>
        )
}