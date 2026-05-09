import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Final safety pass: remove only the "crossorigin" attribute on the inlined
// module script. Keep type="module" so the browser defers execution until the
// DOM (including <div id="root">) is ready — which works even from file://.
function cleanupCrossOrigin(): Plugin {
  return {
    name: 'cleanup-crossorigin',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      for (const [name, file] of Object.entries(bundle)) {
        if (!name.endsWith('.html') || file.type !== 'asset') continue
        const raw = typeof file.source === 'string' ? file.source : file.source.toString()
        file.source = raw
          .replace(/<script type="module" crossorigin>/g, '<script type="module">')
      }
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile(), cleanupCrossOrigin()],
})
