import type { HTMLAttributes, ElementType, ReactNode, ReactElement, Ref, RefObject, SVGProps, ButtonHTMLAttributes, SelectHTMLAttributes, InputHTMLAttributes, AudioHTMLAttributes, CSSProperties, PointerEvent, AnimationEvent } from 'react'
export type FrenchCard = { kind:'joker' } | { kind:'number'|'court'; suit:'club'|'diamond'|'heart'|'spade'; rank:number|'jack'|'queen'|'king' } | { kind:'custom-value'; value:number }
export interface FrenchPlayingCardProps extends HTMLAttributes<HTMLSpanElement> { card:FrenchCard; size?:'small'|'medium'|'custom'; width?:number; height?:number }
