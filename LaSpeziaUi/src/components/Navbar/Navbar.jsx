import { navbarDefaults } from './config'
import { cn } from '../../utils/cn.ts'
export default function Navbar({ children, start, end, cornerStyle = navbarDefaults.cornerStyle, className, ...props }) {
  return <header {...props} data-corners={cornerStyle} className={cn('app-navbar relative z-30 flex h-[68px] min-w-0 items-center gap-3 pl-2 pr-4 sm:pr-6', className)}>{start}{children}{end}</header>
}
