import NeonTitle from '../ui/NeonTitle.jsx'

export default function PageFrame({ title, titleId, titleSize = 'lg', children }) {
  return (
    <section aria-labelledby={titleId} className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-4 overflow-y-auto p-4 sm:gap-5 sm:p-6">
      <header className="page-heading flex justify-center py-1">
        <NeonTitle as="h2" title={title} id={titleId} size={titleSize} />
      </header>
      {children}
    </section>
  )
}
