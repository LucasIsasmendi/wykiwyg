import express from 'express';
import userRoutes from './user';
import authRoutes from './auth';

const router = express.Router(); // eslint-disable-line new-cap

/**
 * @api {get} / API Status
 * @apiGroup Status
 * @apiSuccess {String} status API Status' message
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {"status": "wykiwyg API"}
 */
router.get('/health-check', (req, res) =>
  res.send({"status": "wykiwyg: When You Know Is When you Gain"})
);
/**
 * @api {get} / Main webapp Index.html
 * @apiGroup Status
 * @apiSuccess {html} main html
 * @apiSuccessExample {html} Redirect
 *    HTTP/1.1 200 OK
 *    {"status": "wykiwyg API"}
 */
router.get('/', (req, res) =>
  res.redirect('/www/index.html')
);

/**
 * @api {get} / API Status
 * @apiGroup Status
 * @apiSuccess {String} status API Status' message
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {"status": "NTask API"}
 */
router.use('/users', userRoutes);

/**
 * @api {get} / API Status
 * @apiGroup Status
 * @apiSuccess {String} status API Status' message
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {"status": "NTask API"}
 */
router.use('/auth', authRoutes);

export default router;