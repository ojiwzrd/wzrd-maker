import os from 'os'

export default function (app) {
  /**
   * @openapi
   * /api/health:
   *   get:
   *     tags:
   *       - Information
   *     summary: Server health status
   *     description: Returns detailed system and runtime status for the server.
   *     responses:
   *       200:
   *         description: Health status
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status: { type: string }
   *                 uptime: { type: number }
   *                 timestamp: { type: string, format: date-time }
   *                 pid: { type: integer }
   *                 platform: { type: string }
   *                 arch: { type: string }
   *                 nodeVersion: { type: string }
   *                 memoryUsage: { type: object }
   *                 cpuUsage: { type: object }
   *                 hostname: { type: string }
   */
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      pid: process.pid,
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage(),
      hostname: os.hostname()
    })
  })
}