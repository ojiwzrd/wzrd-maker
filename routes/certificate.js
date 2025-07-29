import axios from 'axios'

export default function (app) {
  /**
   * @openapi
   * /api/maker/certificate:
   *   get:
   *     tags:
   *       - Maker
   *     summary: Certificate
   *     description: Generate a Certificate image by editing some text.
   *     parameters:
   *       - in: query
   *         name: name
   *         required: true
   *         schema:
   *           type: string
   *       - in: query
   *         name: achievement
   *         required: true
   *         schema:
   *           type: string
   *       - in: query
   *         name: description
   *         required: true
   *         schema:
   *           type: string
   *       - in: query
   *         name: issuer
   *         required: true
   *         schema:
   *           type: string
   *       - in: query
   *         name: signer
   *         required: true
   *         schema:
   *           type: string
   *       - in: query
   *         name: signer_title
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
   */
  app.get('/api/maker/certificate', async (req, res) => {
    const { name, achievement, description, issuer, signer, signer_title } = req.query

    const url = 'https://backend-ojiwzrd.vercel.app/api/certificate'
    const { data } = await axios.get(url, {
      responseType: 'arraybuffer',
      params: {
        name,
        achievement,
        description,
        issuer,
        signer,
        signer_title
      },
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    })

    res.set('Content-Type', 'image/png').send(data)
  })
}