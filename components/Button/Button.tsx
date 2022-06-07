import styles from './button.module.css'
import { ButtonProps } from "./ButtonTypes"

const Button = ({ children, callback, image, ...rest }: ButtonProps) => {
  return (
    <button onClick={callback} className={styles.githubButton} {...rest} >{children}</button>
  )
}

export default Button