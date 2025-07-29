import axios from 'axios'

export default function (app) {
  /**
   * @openapi
   * /api/maker/levelup:
   *   get:
   *     tags:
   *       - Maker
   *     summary: Level Up
   *     description: Generate a level-up image using character name, levels, role, and optional profile image.
   *     parameters:
   *       - in: query
   *         name: character_name
   *         required: true
   *         schema:
   *           type: string
   *       - in: query
   *         name: old_level
   *         required: true
   *         schema:
   *           type: string
   *       - in: query
   *         name: new_level
   *         required: true
   *         schema:
   *           type: string
   *       - in: query
   *         name: role
   *         required: true
   *         schema:
   *           type: string
   *       - in: query
   *         name: profile_image
   *         required: false
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
  app.get('/api/maker/levelup', async (req, res) => {
    const params = req.query

    const url = 'https://backend-ojiwzrd.vercel.app/api/level-up'
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