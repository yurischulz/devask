import { ButtonHTMLAttributes } from 'react'

import './styles.scss';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Define o className do botão */
  isOutlined?: boolean;
}

/**
 * ### Exibição do botão.
 * 
 * Exibe o botão recebendo algumas propriedades.
 */
export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button className={`button ${isOutlined ? 'outlined' : ''}`} {...props} />
  )
}