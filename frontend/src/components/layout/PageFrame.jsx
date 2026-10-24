import NeonHeading from '../ui/NeonHeading.jsx'

export default function PageFrame({ title, titleId, children }) {
  return (
    <section aria-labelledby={titleId} className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-4 overflow-y-auto p-4 sm:gap-5 sm:p-6">
      <header className="page-heading flex justify-center py-1">
        <NeonHeading as="h2" title={title} id={titleId} className="page-title" />
      </header>
      {children}
    </section>
  )
}
