// USER CREATE 
/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user in the system.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: john
 *               lastName:
 *                 type: string
 *                 example: doe
 *               email:
 *                 type: string
 *                 example: john_doe@gmail.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: Duplicate Record or Conflict
 *       500:
 *         description: Internal server error
 */


// GET ALL USERS
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get All Users
 *     description: Get all Users.
 *     operationId: getAllUsers
 *     tags:
 *       - User
 *     content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Fetch all users successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

// GET USER BY ID
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get User By Id
 *     description: Get user by id.
 *     operationId: getUserById
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetch user successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

// USER UPDATE 
/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update User By Id
 *     description: Update a user by id.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: john
 *               lastName:
 *                 type: string
 *                 example: doe
 *               email:
 *                 type: string
 *                 example: doe@gmail.com
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

// USER PASSWORD CHANGE 
/**
 * @swagger
 * /user/{id}/change-password:
 *   patch:
 *     summary: Change User Password By Id
 *     description: Change a user password by id.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: admin123
 *               newPassword:
 *                 type: string
 *                 example: admin123#
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

// DELETE USER BY ID
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete User By Id
 *     description: Delete user by id.
 *     operationId: deleteUserById
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */