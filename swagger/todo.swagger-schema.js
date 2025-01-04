//CREATE TODO

/**
 * @swagger
 * /todo:
 *   post:
 *     summary: Create a new todo
 *     description: Creates a new todo in the system.
 *     tags:
 *       - Todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: Do it
 *               description:
 *                 type: string
 *                 example: create todo apis
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

// GET ALL TODOS
/**
 * @swagger
 * /todo:
 *   get:
 *     summary: Get All Todos
 *     description: Get all todos.
 *     tags:
 *       - Todo
 *     content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Fetch all todos successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

// GET TODO BY ID
/**
 * @swagger
 * /todo/{id}:
 *   get:
 *     summary: Get Todo By Id
 *     description: Get todo by id.
 *     tags:
 *       - Todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the todo to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetch todo successfully
 *       404:
 *         description: Todo not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

//SEARCH TODO
/**
 * @swagger
 * /todo/search:
 *   get:
 *     summary: Search Todo Items
 *     description: Search for todo items using optional query parameters.
 *     tags:
 *       - Todo
 *     parameters:
 *       - in: query
 *         name: title
 *         required: false
 *         description: The title of the todo item.
 *         schema:
 *           type: string
 *       - in: query
 *         name: description
 *         required: false
 *         description: A brief description of the todo item.
 *         schema:
 *           type: string
 *       - in: query
 *         name: userId
 *         required: false
 *         description: The ID of the user associated with the todo item.
 *         schema:
 *           type: string
 *           format: ObjectId
 *       - in: query
 *         name: status
 *         required: false
 *         description: The status of the todo item.
 *         schema:
 *           type: string
 *           enum:
 *             - PENDING
 *             - COMPLETED
 *           example: "PENDING"
 *     responses:
 *       '200':
 *         description: List of matching todo items
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */


// TODO UPDATE
/**
 * @swagger
 * /todo/{id}:
 *   put:
 *     summary: Update Todo By Id
 *     description: Update a todo by id.
 *     tags:
 *       - Todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the todo to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Do it"
 *               description:
 *                 type: string
 *                 example: "create new apis"
 *               status:
 *                 type: string
 *                 enum:
 *                   - PENDING
 *                   - COMPLETED
 *                 example: "PENDING"
 *     responses:
 *       '200':
 *         description: Todo updated successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Todo not found
 *       '500':
 *         description: Internal server error
 */


// CHANGE STATUS TO COMPLETED BY ID
/**
 * @swagger
 * /todo/status/{id}/completed:
 *   patch:
 *     summary: Change Todo Status To Completed By Id
 *     description: Change status to completed.
 *     tags:
 *       - Todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the todo to change status.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Updated todo
 *       404:
 *         description: Todo not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

// DELETE TODO BY ID
/**
 * @swagger
 * /todo/{id}:
 *   delete:
 *     summary: Delete Todo By Id
 *     description: Delete todo by id.
 *     tags:
 *       - Todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the todo to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */



