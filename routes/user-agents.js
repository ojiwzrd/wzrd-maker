export default function (app) {
  /**
   * @openapi
   * /api/user-agents:
   *   get:
   *     tags:
   *       - Information
   *     summary: Get user agent
   *     description: Returns client user agent string from request headers.
   *     responses:
   *       200:
   *         description: User agent info
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 userAgent:
   *                   type: string
   */
  app.get('/api/user-agents', (req, res) => {
    const userAgent = req.headers['user-agent'] || 'unknown'
    res.json({ userAgent })
  })
}