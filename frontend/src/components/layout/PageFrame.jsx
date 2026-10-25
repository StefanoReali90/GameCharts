import NeonTitle from '../ui/NeonTitle.jsx'

export default function PageFrame({ title, titleId, titleSize = 'lg', compact = false, children }) {
  return (
    <section aria-labelledby={titleId} className={`grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-y-auto ${compact ? 'gap-2 px-4 pb-4 pt-1 sm:px-6 sm:pb-6' : 'gap-4 p-4 sm:gap-5 sm:p-6'}`}>
      <header className={`page-heading flex justify-center ${compact ? 'py-0' : 'py-1'}`}>
        <NeonTitle as="h2" title={title} id={titleId} size={titleSize} />
      </header>
      {children}
    </section>
  )
}
