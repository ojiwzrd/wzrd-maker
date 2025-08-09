import axios from 'axios'

export default function (app) {
  /**
   * @openapi
   * /api/maker/quotes:
   *   get:
   *     tags:
   *       - Maker
   *     summary: Quotes Generator
   *     description: Generate a quotes image from text.
   *     parameters:
   *       - in: query
   *         name: text
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: PNG image
   *         content:
   *           image/png:
   *             schema:
   *               type: string
   *               format: binary
   *     examples:
   *       example:
   *         summary: Quotes example
   *         value:
   *           text: Lamaran __Nikah__, ~~Punya Pacar~~
   */
  app.get('/api/maker/quotes', async (req, res) => {
    let { text } = req.query
    text = text.replace(/__([^_]+)__/g, '_$1_').replace(/~~([^~]+)~~/g, '~$1~')
    const url = 'https://backend-ojiwzrd.vercel.app/api/quotes'
    const { data } = await axios.get(url, {
      responseType: 'arraybuffer',
      params: { text },
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    })
    res.set('Content-Type', 'image/png').send(data)
  })
}
