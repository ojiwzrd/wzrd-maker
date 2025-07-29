import axios from 'axios'

export default function (app) {
  /**
   * @openapi
   * /api/maker/card:
   *   get:
   *     tags:
   *       - Maker
   *     summary: User Card
   *     description: Generate a user card image with identity and styling information.
   *     parameters:
   *       - in: query
   *         name: name
   *         schema:
   *           type: string
   *       - in: query
   *         name: age
   *         schema:
   *           type: string
   *       - in: query
   *         name: role
   *         schema:
   *           type: string
   *       - in: query
   *         name: exp
   *         schema:
   *           type: string
   *       - in: query
   *         name: level
   *         schema:
   *           type: string
   *       - in: query
   *         name: family
   *         schema:
   *           type: string
   *       - in: query
   *         name: number
   *         schema:
   *           type: string
   *       - in: query
   *         name: text_color
   *         schema:
   *           type: string
   *       - in: query
   *         name: accent_color
   *         schema:
   *           type: string
   *       - in: query
   *         name: profile_image
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
  app.get('/api/maker/card', async (req, res) => {
    const {
      name,
      age,
      role,
      exp,
      level,
      family,
      number,
      text_color,
      accent_color,
      profile_image,
    } = req.query

    const url = 'https://backend-ojiwzrd.vercel.app/api/card'
    const { data } = await axios.get(url, {
      responseType: 'arraybuffer',
      params: {
        name,
        age,
        role,
        exp,
        level,
        family,
        number,
        text_color,
        accent_color,
        profile_image,
      },
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
      },
    })

    res.set('Content-Type', 'image/png').send(data)
  })
}