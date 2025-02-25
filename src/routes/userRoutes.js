import express from "express";
import {getUsers, createUsers, updateUser, deleteUser, changeStateUser, login} from "../controllers/userController.js";

const router = express.Router();

router.get('/getuser', getUsers);
router.post('/newuser', createUsers);
router.patch('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);
router.patch('/deletedstatus/:id', changeStateUser);
router.post('/login', login);

/**
    * @swagger
    * tags:
    *   - name: Users
    *     description: The users managing API
    *
    * /api/users/getuser:
    *   get:
    *     summary: Get all Users
    *     tags: [Users]
    *     responses:
    *       200:
    *         description: A successful response
    *
    * /api/users/deletedstatus/{id}:
    *   patch:
    *     summary: Dar de baja un usuario
    *     tags: [Users]
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         schema:
    *           type: integer
    *         description: ID del usuario a desactivar
    *     responses:
    *       200:
    *         description: Usuario dado de baja correctamente
    *       404:
    *         description: Usuario no encontrado
    *       500:
    *         description: Error del servidor
    * 
    * /api/users/delete/{id}:
    *   delete:
    *     summary: Eliminar definitivamente un registro
    *     tags: [Users]
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         schema:
    *           type: integer
    *         description: Id del usuario a eliminar definitivamente
    *     responses:
    *       200:
    *         description: Usuario eliminado definitivamente
    *       404:
    *         description: Usuario no encontrado
    *       500:
    *         description: Error del servidor
    * 
    * /api/users/update/{id}:
    *   patch:
    *     summary: Actualizar datos de un usuario
    *     tags: [Users]
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         schema:
    *           type: integer
    *         description: ID del usuario a actualizar
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               phone:
    *                 type: string
    *                 example: "123456789"
    *                 description: Nuevo número de teléfono del usuario
    *               password:
    *                 type: string
    *                 example: "nuevaClave123"
    *                 description: Nueva contraseña (mínimo 8 caracteres)
    *     responses:
    *       200:
    *         description: Usuario actualizado correctamente
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *                   example: "Usuario actualizado"
    *                 data:
    *                   type: object
    *                   example:
    *                     id: 5
    *                     phone: "123456789"
    *       400:
    *         description: Error en la actualización (usuario no encontrado, número repetido o contraseña corta)
    *       500:
    *         description: Error interno del servidor
    * 
    * /api/users/newuser:
    *   post:
    *     summary: Crear un nuevo usuario
    *     tags: [Users]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               username:
    *                 type: string
    *                 example: "example@email.com"
    *                 description: Nombre de usuario (email)
    *               phone:
    *                 type: string
    *                 example: "123456789"
    *                 description: Número de teléfono del usuario
    *               password:
    *                 type: string
    *                 example: "password123"
    *                 description: Contraseña (mínimo 8 caracteres)
    *     responses:
    *       201:
    *         description: Usuario creado correctamente
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *                   example: "Usuario creado"
    *                 data:
    *                   type: object
    *                   example:
    *                     id: 5
    *                     username: "asdfasdasd@gmail.com"
    *                     phone: "123456789"
    *                     creationDate: "2024-01-12"
    *       400:
    *         description: Error en la creación del usuario, los campos son obligatorios o los datos son inválidos
    *       500:
    *         description: Error interno del servidor
*/



export default router;