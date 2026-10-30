import Component from './Table.jsx'
import type { ComponentType, ReactElement } from 'react'
import type { TableProps } from './types'
export const Table = Component as (<Row>(props: TableProps<Row>) => ReactElement)
export type { TableProps } from './types'
export type { TableColumn } from './types'
