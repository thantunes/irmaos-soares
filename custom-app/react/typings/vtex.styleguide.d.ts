declare module 'vtex.styleguide' {
  import { ComponentType } from 'react'

  export const Input: ComponentType<InputProps>

  interface InputProps {
    [key: string]: any
  }

  export const ButtonWithIcon
  export const ButtonPlain
  export const IconClear
  export const IconPlusLines
}
