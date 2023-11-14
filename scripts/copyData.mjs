import { existsSync, mkdirSync, readdirSync, lstatSync, copyFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename).split('/').slice(0, -1).join('/')

function copyDirectory(sourceDir, targetDir) {
  if (!existsSync(join(__dirname, targetDir))) {
    mkdirSync(join(__dirname, targetDir), { recursive: true })
  }

  const files = readdirSync(join(__dirname, sourceDir))

  files.forEach((file) => {
    const sourceFilePath = join(__dirname, sourceDir, file)
    const targetFilePath = join(__dirname, targetDir, file)

    console.log(sourceFilePath, targetFilePath)

    if (lstatSync(sourceFilePath).isDirectory()) {
      copyDirectory(sourceFilePath, targetFilePath)
    } else {
      copyFileSync(sourceFilePath, targetFilePath)
    }
  })
}

const sourceDirectory = '/src/data/audio'
const targetDirectory = '/dist/data/audio'

copyDirectory(sourceDirectory, targetDirectory)
