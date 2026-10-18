import { build } from 'vite'
import { spawnSync } from 'node:child_process'

await build({
  logLevel: 'error',
  mode: 'test',
  define: { 'process.env.NODE_ENV': '"development"' },
  ssr: { noExternal: ['styled-components'] },
  build: {
    ssr: 'tests/checks.jsx',
    outDir: '.test-build',
    emptyOutDir: true,
    minify: false
  }
})
const result = spawnSync(process.execPath, ['--test', '.test-build/checks.js'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'development' }
})
process.exitCode = result.status ?? 1
