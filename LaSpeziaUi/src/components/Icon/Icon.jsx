import { icons } from './config'
export default function Icon({ name, ...props }) {
  const Component = icons[name]
  return Component ? <Component {...props} /> : null
}
