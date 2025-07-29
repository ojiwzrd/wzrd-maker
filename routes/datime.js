export default function (app) {
  /**
   * @openapi
   * /api/datetime:
   *   get:
   *     tags:
   *       - Information
   *     summary: Get current server datetime
   *     description: Returns the current date and time from the server.
   *     responses:
   *       200:
   *         description: Current datetime
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 iso:
   *                   type: string
   *                   format: date-time
   *                 unix:
   *                   type: integer
   */
  app.get('/api/datetime', (req, res) => {
    res.json({
      iso: new Date().toISOString(),
      unix: Date.now()
    })
  })
}