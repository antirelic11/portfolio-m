import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

const cleanPages = ['aboutme', 'error',] // 'projects', 'objectives'] 
const cleanPagePattern = new RegExp(`^/(${cleanPages.join('|')})$`)
const htmlPagePattern = new RegExp(`^/(${cleanPages.join('|')})\\.html$`)

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['.trycloudflare.com']
  },
  plugins: [
    {
      name: 'redirect-missing-pages',
      configureServer(server) {
        server.middlewares.use((request, response, next) => {
          if (!request.url || !request.headers.accept?.includes('text/html')) {
            next()
            return
          }

          const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
          const cleanPage = pathname.match(cleanPagePattern)
          const htmlPage = pathname.match(htmlPagePattern)

          if (htmlPage) {
            response.statusCode = 301
            response.setHeader('Location', `/${htmlPage[1]}`)
            response.end()
            return
          }

          if (cleanPage) {
            request.url = cleanPage[1] === 'error'
              ? '/error.html'
              : `/public/pages/${cleanPage[1]}.html`
            next()
            return
          }

          const projectPath = resolve(process.cwd(), `.${pathname}`)
          const publicPath = resolve(process.cwd(), 'public', `.${pathname}`)

          if (pathname === '/' || existsSync(projectPath) || existsSync(publicPath)) {
            next()
            return
          }

          response.statusCode = 302
          response.setHeader('Location', '/error')
          response.end()
        })
      }
    },
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
