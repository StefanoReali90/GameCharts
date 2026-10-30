import Component from './Card.jsx'
import type { ComponentType, ReactElement } from 'react'
import type { CardProps } from './types'
export const Card = Component as ComponentType<CardProps>
export type { CardProps } from './types'
