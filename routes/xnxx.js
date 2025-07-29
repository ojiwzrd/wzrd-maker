import axios from 'axios'

export default function (app) {
  /**
   * @openapi
   * /api/maker/xnxx:
   *   get:
   *     tags:
   *       - Maker
   *     summary: XNXX
   *     description: Generate a XNXX image by editing some text.
   *     parameters:
   *       - in: query
   *         name: title
   *         required: true
   *         schema:
   *           type: string
   *       - in: query
   *         name: image_url
   *         required: true
   *         schema:
   *           type: string
   *           format: uri
   *     responses:
   *       200:
   *         description: PNG image
   *         content:
   *           image/png:
   *             schema:
   *               type: string
   *               format: binary
   */
  app.get('/api/maker/xnxx', async (req, res) => {
    const { title, image_url } = req.query

    const url = 'https://backend-ojiwzrd.vercel.app/api/xnxx'
    const { data } = await axios.get(url, {
      responseType: 'arraybuffer',
      params: { title, image_url },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13; Mobile; rv:102.0) Gecko/20100101 Firefox/102.0'
      }
    })

    res.set('Content-Type', 'image/png').send(data)
  })
}