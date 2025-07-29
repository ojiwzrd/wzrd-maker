import express from 'express'
import { apiReference } from '@scalar/express-api-reference'
import swaggerJSDoc from 'swagger-jsdoc'
import { readdir } from 'fs/promises'
import path, { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'WZRD MAKER',
    description:
      'API to generate personalized canvas images like welcome cards, certificates, and user profiles with customizable content.',
    version: '1.0.0',
    contact: {
      name: 'OJIWZRD',
      email: 'ojiwzrd@gmail.com',
      url: 'https://wzrd.my.id',
    },
    license: {
      name: 'DONATE?',
      url: 'https://saweria.co/ojiwzrd',
    },
  },
}

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: [join(__dirname, 'routes/**/*.js')],
})

const routesPath = join(__dirname, 'routes')
const files = await readdir(routesPath)
for (const file of files) {
  if (!file.endsWith('.js')) continue
  const { default: route } = await import(`./routes/${file}`)
  if (typeof route === 'function') await route(app)
}

app.get('/openapi.json', (_, res) => {
  res.json(swaggerSpec)
})

app.use(
  '/playground',
  apiReference({
    theme: 'purple',
    url: '/openapi.json',
    title:
      'WZRD Maker – Fast & Simple API to Generate Welcome Banners, Certificates, and Profile Cards',
  })
)

app.get('/', (_, res) => res.redirect('/playground'))

app.listen(3000, () => {
  console.log('Server ready at http://localhost:3000')
})