import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { codeToHtml } from 'shiki'

const examplesDir = fileURLToPath(new URL('./code-examples', import.meta.url))
const outputDir = fileURLToPath(new URL('./src/assets/examples', import.meta.url))

const readDir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const mkdir = promisify(fs.mkdir)

// read all files .vue in examplesDir and output them as HTML files in outputDir
async function generateHTML() {
  const files = await readDir(examplesDir)
  await mkdir(outputDir, { recursive: true })
  for (const file of files) {
    if (!file.endsWith('.vue'))
      continue
    const filePath = path.join(examplesDir, file)
    const fileContent = await readFile(filePath, 'utf-8')
    const shikiContent = await codeToHtml(fileContent, {
      lang: 'vue',
      theme: 'vitesse-black',
    })
    const outputFilePath = path.join(outputDir, file.replace('.vue', '.html'))
    await writeFile(outputFilePath, shikiContent, 'utf-8')
  }
}

generateHTML()
