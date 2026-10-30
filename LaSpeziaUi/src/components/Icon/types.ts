import type { HTMLAttributes, ElementType, ReactNode, ReactElement, Ref, RefObject, SVGProps, ButtonHTMLAttributes, SelectHTMLAttributes, InputHTMLAttributes, AudioHTMLAttributes, CSSProperties, PointerEvent, AnimationEvent } from 'react'
import type { icons } from './config'
export interface IconProps extends SVGProps<SVGSVGElement> { name: keyof typeof icons; size?: number; strokeWidth?: number }
