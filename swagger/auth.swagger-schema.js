// LOGIN 
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login User
 *     description: Login the user.
 *     operationId: loginUser
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: abc@gmail.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       200:
 *         description: Login successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

// Logout user
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout User
 *     description: Logout user.
 *     tags:
 *       - Auth
 *     content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Logout Successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */