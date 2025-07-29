import axios from 'axios'

export default function (app) {
  /**
   * @openapi
   * /api/maker/welcome:
   *   get:
   *     tags:
   *       - Maker
   *     summary: Welcome & Goodbye
   *     description: Generate a welcome or goodbye image by editing some text.
   *     parameters:
   *       - in: query
   *         name: username
   *         required: true
   *         schema:
   *           type: string
   *       - in: query
   *         name: profilepicture
   *         required: true
   *         schema:
   *           type: string
   *           format: uri
   *       - in: query
   *         name: subpesan
   *         required: true
   *         schema:
   *           type: string
   *       - in: query
   *         name: welcome
   *         required: true
   *         schema:
   *           type: string
   *           enum: [true, false]
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
   *         summary: Welcome banner
   *         value:
   *           username: ojiwzrd
   *           profilepicture: https://files.catbox.moe/obvnzd.jpg
   *           subpesan: Welcome to the server!
   *           welcome: true
   */
  app.get('/api/maker/welcome', async (req, res) => {
    const { username, profilepicture, subpesan, welcome } = req.query

    const url = 'https://backend-ojiwzrd.vercel.app/api/welcome'
    const { data } = await axios.get(url, {
      responseType: 'arraybuffer',
      params: {
        username,
        profilepicture,
        subpesan,
        welcome
      },
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    })

    res.set('Content-Type', 'image/png').send(data)
  })
}