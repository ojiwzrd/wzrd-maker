import axios from 'axios';

export default function (app) {
  /**
   * @openapi
   * /api/maker/onepiece-logo:
   *   get:
   *     tags:
   *       - Maker
   *     summary: One Piece Logo Generator
   *     description: Generate a One Piece style logo image from the provided text.
   *     parameters:
   *       - in: query
   *         name: text
   *         required: true
   *         schema:
   *           type: string
   *         description: Text to be rendered in the One Piece logo style.
   *     responses:
   *       200:
   *         description: PNG image of the generated logo
   *         content:
   *           image/png:
   *             schema:
   *               type: string
   *               format: binary
   *         examples:
   *           example:
   *             summary: Example One Piece logo text
   *             value:
   *               text: Ne piece
   *       400:
   *         description: Bad Request (missing text parameter)
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: Parameter text is required
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: Failed to generate logo image
   */
  app.get('/api/maker/onepiece-logo', async (req, res) => {
    const { text } = req.query;
    if (!text) {
      return res.status(400).json({ error: 'Parameter text is required' });
    }

    try {
      const response = await axios.get('https://backend-ojiwzrd.vercel.app/api/onepiece-logo', {
        params: { text },
        responseType: 'arraybuffer',
        headers: {
          // Kalau backend perlu User-Agent, bisa ditambahkan, kalau tidak, bisa dihapus
          'User-Agent': 'Mozilla/5.0 (Node.js Server)'
        }
      });

      res.set('Content-Type', 'image/png');
      res.send(response.data);
    } catch (error) {
      console.error('Error fetching onepiece logo:', error.message);
      res.status(500).json({ error: 'Failed to generate logo image' });
    }
  });
}
