import axios from 'axios'

export default function (app) {
  /**
   * @openapi
   * /api/maker/profile-stats:
   *   get:
   *     tags:
   *       - Maker
   *     summary: Profile stats
   *     description: Generate a Profile Stats image by editing some text.
   *     parameters:
   *       - in: query
   *         name: username
   *         schema:
   *           type: string
   *       - in: query
   *         name: role
   *         schema:
   *           type: string
   *       - in: query
   *         name: level
   *         schema:
   *           type: string
   *       - in: query
   *         name: exp
   *         schema:
   *           type: string
   *       - in: query
   *         name: gold
   *         schema:
   *           type: string
   *       - in: query
   *         name: job
   *         schema:
   *           type: string
   *       - in: query
   *         name: stamina
   *         schema:
   *           type: string
   *       - in: query
   *         name: hp
   *         schema:
   *           type: string
   *       - in: query
   *         name: profilepicture
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
  app.get('/api/maker/profile-stats', async (req, res) => {
    const params = req.query

    const url = 'https://backend-ojiwzrd.vercel.app/api/profile'
    const { data } = await axios.get(url, {
      responseType: 'arraybuffer',
      params,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    })

    res.set('Content-Type', 'image/png').send(data)
  })
}