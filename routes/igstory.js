import axios from 'axios'

export default function (app) {
  /**
   * @openapi
   * /api/maker/igstory:
   *   get:
   *     tags:
   *       - Maker
   *     summary: Instagram Story
   *     description: Generate an Instagram Story image with a username and profile picture.
   *     parameters:
   *       - in: query
   *         name: username
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
  app.get('/api/maker/igstory', async (req, res) => {
    const { username, image_url } = req.query

    const url = 'https://backend-ojiwzrd.vercel.app/api/ig-story'
    const { data } = await axios.get(url, {
      responseType: 'arraybuffer',
      params: { username, image_url },
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    })

    res.set('Content-Type', 'image/png').send(data)
  })
}