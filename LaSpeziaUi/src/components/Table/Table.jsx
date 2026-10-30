import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { motion as animated, useReducedMotion } from 'framer-motion'
import { useFloatingTilt } from '../../hooks/useFloatingTilt.js'
import { cn } from '../../utils/cn.ts'
import { useI18n } from '../../i18n/I18nProvider.jsx'
import { playMedalWhoosh } from '../../audio/engine.js'
import Button from '../Button/Button.jsx'
import Card from '../Card/Card.jsx'
import Icon from '../Icon/Icon.jsx'
import Tooltip from '../Tooltip/Tooltip.jsx'
import SearchPopover from '../SearchPopover/SearchPopover.jsx'
import { tableLayouts, filterClasses } from './config'

function ColumnHeader({ column, layout, sort, onSortChange, filters, onFiltersChange, openFilter, setOpenFilter }) {
  const { t } = useI18n(); const anchorRef = useRef(null); const generated = useId()
  const filterId = column.filterId ?? generated
  const isOpen = openFilter === column.id
  const active = sort?.key === column.id
  const direction = active ? sort.direction === 'asc' ? 'desc' : 'asc' : column.defaultSortDirection ?? 'asc'
  const sortIcon = column.sortType === 'text' ? active && sort.direction === 'desc' ? 'ArrowDownZA' : 'ArrowDownAZ' : !active ? 'ArrowUpDown' : sort.direction === 'asc' ? 'ArrowUp' : 'ArrowDown'
  const description = column.sortLabel?.(direction) ?? t('leaderboard.sortBy', { column: column.header, direction: t(direction === 'asc' ? 'leaderboard.ascending' : 'leaderboard.descending') })
  const filterStyle = filterClasses[column.filterTone ?? 'cyan']
  const close = useCallback((restore = false) => { setOpenFilter(null); if (restore) window.requestAnimationFrame(() => anchorRef.current?.focus()) }, [setOpenFilter])
  const heading = column.renderHeader ? column.renderHeader(column) : <>
    <span className={layout.full}>{column.header}</span><span className={layout.compact} aria-hidden="true"><Icon name={column.icon} size={layout.iconSize} strokeWidth={1.8} /></span>
    {column.sortable && <Icon name={sortIcon} size={column.sortType === 'text' ? 16 : layout.iconSize} strokeWidth={column.sortType === 'text' ? 2 : layout.iconSize === 13 ? 1.7 : 2} className={layout.iconSize === 13 ? active ? 'text-cyan-300' : 'text-cyber-muted/70' : undefined} aria-hidden="true" />}
  </>
  const button = column.sortable ? <Button variant="plain" className={cn(layout.sort, layout.iconSize === 13 && active && 'text-cyan-100')} onClick={() => onSortChange?.({key: column.id, direction})} aria-label={description}>{heading}</Button> : heading
  const query = filters?.[column.id] ?? ''
  const filterContext = { anchorRef, query, onSearch: (value) => onFiltersChange?.({...filters, [column.id]:value}), onClose: close, label: column.filterLabel ?? column.header, idPrefix: filterId }
  return <th className={layout.th} scope="col" aria-sort={column.sortable ? active ? sort.direction === 'asc' ? 'ascending' : 'descending' : 'none' : undefined} style={{width:column.width, minWidth:column.minWidth, textAlign:column.align}}>
    <span className="inline-flex items-center justify-center gap-0.5">
      {column.sortable && layout.iconSize === 13 ? <Tooltip content={description}>{button}</Tooltip> : button}
      {column.filterable && <Tooltip content={column.filterLabel ?? column.header}><Button variant="plain" ref={anchorRef} className={cn('relative grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2', filterStyle.base, query ? filterStyle.active : 'border-transparent text-cyber-muted')} aria-label={column.filterLabel ?? column.header} aria-haspopup="dialog" aria-expanded={isOpen} aria-controls={isOpen ? `${filterId}-filter` : undefined} onClick={() => setOpenFilter(isOpen ? null : column.id)}>
        <Icon name="Search" size={15} strokeWidth={2} aria-hidden="true" />{query && <span className={cn('absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full', filterStyle.dot)} aria-hidden="true" />}
      </Button></Tooltip>}
    </span>
    {isOpen && (column.renderFilter ? column.renderFilter(filterContext) : <SearchPopover {...filterContext} />)}
  </th>
}

export default function Table({ columns, rows, getRowId = (row) => row.id, getRowProps, getRowOptions, renderRow, sort, onSortChange, filters, onFiltersChange, layout = 'default', headerStart, headerEnd, toolbar, toolbarClassName, emptyState, withCard = false, cardProps, expandable = false, expanded = false, onExpandedChange, rowsExpanded = true, motion = 'idle', motionOptions, rowHover = true, highlightedRowId, scrollToRowId = highlightedRowId, onRowAnimationStart, onRowAnimationComplete, minVisibleRows, width, height, maxHeight, expandedWidth, expandedHeight, id, className, tableClassName, ariaLabel, floating = false, tilt = 0.5, style }) {
  const { t } = useI18n(); const reduced = useReducedMotion(); const generated = useId()
  const tableId = id ?? generated
  const wrapRef = useRef(null); const [openFilter, setOpenFilter] = useState(null)
  const [minimumHeight, setMinimumHeight] = useState()
  const floatingStyle = useFloatingTilt({tilt: floating ? tilt : 0})
  const skin = tableLayouts[layout] ?? tableLayouts.default
  const selectedIndex = rows.findIndex((row) => getRowId(row) === scrollToRowId)
  useEffect(() => {
    if (scrollToRowId == null) return
    const container = wrapRef.current
    const row = Array.from(container?.querySelectorAll('tr[data-row-id]') ?? []).find((el) => el.dataset.rowId === String(scrollToRowId))
    if (!row) return
    const timer = window.setTimeout(() => { const top = row.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop; container.scrollTo({top:top-(container.clientHeight-row.getBoundingClientRect().height)/2,behavior:reduced ? 'auto' : 'smooth'}) }, rowsExpanded && row.dataset.rank ? motionOptions?.scrollExpandedDelayMs ?? 760 : motionOptions?.scrollDelayMs ?? 40)
    return () => window.clearTimeout(timer)
  }, [scrollToRowId, selectedIndex, rowsExpanded, reduced, motionOptions])
  useLayoutEffect(() => {
    if (!minVisibleRows) { setMinimumHeight(undefined); return }
    const container = wrapRef.current
    const measure = () => { const header = container.querySelector('thead')?.getBoundingClientRect().height ?? 0; const visible = Array.from(container.querySelectorAll('tbody tr[data-row-id]')).filter((row) => row.getBoundingClientRect().height > 0); const sizes = visible.slice(0,minVisibleRows).map((row) => row.getBoundingClientRect().height); const fallback = sizes.at(-1) ?? 56; setMinimumHeight(header + sizes.reduce((a,b)=>a+b,0) + Math.max(0,minVisibleRows-sizes.length)*fallback + 2) }
    measure(); const observer = new ResizeObserver(measure); observer.observe(container)
    return () => observer.disconnect()
  }, [minVisibleRows, rows, rowsExpanded])
  const hasVisible = rows.some((row) => getRowOptions?.(row)?.visible !== false)
  const content = <animated.div id={tableId} ref={wrapRef} className={cn(skin.wrap, className)} data-row-hover={rowHover} style={{...(floating ? floatingStyle.style : {}), width: expanded ? expandedWidth ?? width : width, height: expanded ? expandedHeight ?? height : height, maxHeight, minHeight:minimumHeight ? `min(${minimumHeight}px, ${maxHeight ? typeof maxHeight === 'number' ? maxHeight+'px' : maxHeight : '100dvh'})` : undefined, ...style}} onPointerMove={floating ? floatingStyle.onPointerMove : undefined} onPointerLeave={floating ? floatingStyle.onPointerLeave : undefined}>
    <table className={cn(skin.table, tableClassName)} data-expanded={rowsExpanded} data-motion={motion} aria-label={!withCard ? ariaLabel : undefined}>
      <thead className="sticky top-0 z-10 bg-cyber-surface/90 text-[10px] capitalize tracking-[0.15em] text-cyber-muted backdrop-blur-xl"><tr>{columns.map((column) => <ColumnHeader key={column.id} {...{column,sort,onSortChange,filters,onFiltersChange,openFilter,setOpenFilter}} layout={skin} />)}</tr></thead>
      <tbody className={skin.tbody}>{rows.map((row,index) => {
        const key = getRowId(row); const options = getRowOptions?.(row,index) ?? {}; const extra = getRowProps?.(row,index) ?? {}
        const rowProps = { ...extra, 'data-row-id':key, 'data-rank':options.rank, 'data-search-match':key === highlightedRowId || undefined, 'aria-hidden':options.visible === false, className:cn(skin.row,extra.className),
          onAnimationStart: (event) => { if (event.target !== event.currentTarget) return; if (options.rank && event.animationName === 'leaderboard-medal-strip' && motion === 'opening') playMedalWhoosh(options.rank); extra.onAnimationStart?.(event); onRowAnimationStart?.(row,event) },
          onAnimationEnd: (event) => { if (event.target === event.currentTarget) onRowAnimationComplete?.(row,event); extra.onAnimationEnd?.(event) } }
        if (renderRow) return renderRow(row,{key,index,props:rowProps})
        return <tr key={key} {...rowProps}>{columns.map((column) => <td key={column.id} className={column.cellClassName} style={{textAlign:column.align}}>{layout === 'ranking' ? <div className={cn('leaderboard-cell',column.cellContentClassName)}>{column.renderCell ? column.renderCell(row,index) : column.accessor ? column.accessor(row) : row[column.id]}</div> : column.renderCell ? column.renderCell(row,index) : column.accessor ? column.accessor(row) : row[column.id]}</td>)}</tr>
      })}{!hasVisible && <tr><td className={skin.empty} colSpan={columns.length}>{emptyState}</td></tr>}</tbody>
    </table>
  </animated.div>
  const panel = withCard ? <Card as="section" motion="none" borderColor="cyan" {...cardProps} aria-label={ariaLabel} className={cn('leaderboard-results neon-surface relative z-10 flex flex-1 flex-col overflow-hidden rounded-2xl border border-cyber-cyan/45 p-4 shadow-neon-cyan sm:p-5',expanded ? 'min-h-0' : 'min-h-[264px]',cardProps?.className)}>
    <div className="mb-3 flex flex-wrap items-center gap-3">{headerStart}{headerEnd}{expandable && <Tooltip content={t(expanded ? 'leaderboard.collapse' : 'leaderboard.expand')}><Button variant="subtle" size="icon" aria-label={t(expanded ? 'leaderboard.collapse' : 'leaderboard.expand')} aria-pressed={expanded} aria-controls={tableId} onClick={() => onExpandedChange?.(!expanded)}><Icon name={expanded ? 'Minimize2' : 'Maximize2'} size={17} aria-hidden="true" /></Button></Tooltip>}</div>{content}
  </Card> : (headerStart || headerEnd || expandable) ? <div><div className="mb-3 flex flex-wrap items-center gap-3">{headerStart}{headerEnd}{expandable && <Button size="icon" aria-label={t(expanded ? 'leaderboard.collapse' : 'leaderboard.expand')} aria-pressed={expanded} aria-controls={tableId} onClick={() => onExpandedChange?.(!expanded)}><Icon name={expanded ? 'Minimize2' : 'Maximize2'} size={17} /></Button>}</div>{content}</div> : content
  return toolbar ? <div className={toolbarClassName ?? 'grid min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-4'}>{toolbar}{panel}</div> : panel
}
