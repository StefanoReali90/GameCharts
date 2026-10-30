import react from '../frontend/node_modules/@vitejs/plugin-react/dist/index.js'
import { fileURLToPath } from 'node:url'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

// Keep media as separate cacheable assets in the library build as in the app build.
const mediaAssets = {
  name: 'laspeziaui-media-assets',
  enforce: 'pre',
  async load(id) {
    if (!/\.(png|mp3)\?url$/.test(id)) return
    const file = id.replace(/\?url$/, '')
    const reference = this.emitFile({type:'asset',name:path.basename(file),source:await readFile(file)})
    return `export default import.meta.ROLLUP_FILE_URL_${reference}`
  },
}
export default {
  plugins: [mediaAssets, react()],
  build: {
    lib: {entry:fileURLToPath(new URL('./src/build.ts',import.meta.url)),formats:['es'],fileName:'index'},
    rollupOptions: {
      external: (id) => ['react','react-dom','framer-motion','lucide-react','clsx','tailwind-merge'].some((name)=>id===name||id.startsWith(name+'/')),
      output: {assetFileNames:'assets/[name]-[hash][extname]'},
    },
  },
}
