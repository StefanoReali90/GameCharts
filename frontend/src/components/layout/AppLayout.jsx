import { mediaSources } from './config.js'
import { Button, useI18n } from 'laspeziaui'
import AppNavbar from './AppNavbar.jsx'
import AppSidebar from './AppSidebar.jsx'
export default function AppLayout({children,navigation,media,overlays}) {
  const {t}=useI18n();const {sidebar}=navigation
  return <div className="app-shell relative grid h-dvh min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden bg-cyber-bg text-cyber-text" data-sidebar-open={sidebar.open} data-intro-visible={!media.introFinished} onCopyCapture={(e)=>e.preventDefault()} onCutCapture={(e)=>e.preventDefault()} onDragStartCapture={(e)=>e.preventDefault()}>
    {media.showBackgroundVideo && <video className="app-background-video" data-playing="false" ref={media.backgroundVideoRef} src={mediaSources.background} poster={mediaSources.poster} muted loop playsInline preload="auto" onPlaying={(e)=>{e.currentTarget.dataset.playing='true'}} onPause={(e)=>{e.currentTarget.dataset.playing='false'}} onWaiting={(e)=>{e.currentTarget.dataset.playing='false'}} disablePictureInPicture disableRemotePlayback aria-hidden="true" tabIndex={-1} />}
    <AppNavbar sidebarOpen={sidebar.open} onSidebarToggle={sidebar.toggle} />
    <div className="workspace-layout grid min-h-0 min-w-0 overflow-hidden"><AppSidebar sidebar={sidebar} currentPage={navigation.currentPage} onNavigate={navigation.navigateTo} onSettingsOpen={navigation.openSettings} />
      {sidebar.open && <Button variant="plain" className="sidebar-backdrop" aria-label={t('nav.close')} onClick={sidebar.close} />}
      <span className="layout-inner-curve" aria-hidden="true" /><main className="page-container relative min-h-0 min-w-0 overflow-hidden">{children}</main>
    </div>{overlays}
  </div>
}
