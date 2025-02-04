import User from "../models/userModel.js";

//OBTENER UN REGISTRO DE LA BD A TRAVES DE UNA ID

export const getUsers=async (req, res) => {
    try{
        const users = await User.findAll();
        res.status(200).json(users);
    } catch(error) {
        console.error('Error al listar usuarios:', error);
        res.status(500)
            .json({message: 'Error al obtener los usuarios'});
    }
};

// CREAR UN NUEVO USUARIO

export const createUsers = async (req, res) => {
    const { password, username, phone } = req.body;

    if (!phone || !username || !password) {
        return res.status(400).json({ message: 'Teléfono, correo y contraseña son obligatorios' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
        return res.status(400).json({ message: 'El correo electrónico no es válido' });
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: 'El teléfono debe tener 10 dígitos numéricos' });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
    }

    try {
        const userByPhone = await User.findOne({ where: { phone } });

        const userByUsername = await User.findOne({ where: { username } });

        if (userByPhone || userByUsername) {
            return res.status(400).json({ message: 'El usuario ya está registrado' });
        }

        const newUser = await User.create({
            phone,
            username,
            password,
            status: true,
            creationDate: new Date(),
        });

        console.log(newUser);
        return res.status(201).json({ message: 'Usuario creado', data: newUser });

    } catch (error) {
        console.error('Error al crear usuario:', error);
        return res.status(500).json({ message: 'Error al crear el usuario' });
    }
};




// ACTUALIZAR UN USUARIO A TRAVES DE UNA ID EN LA URL

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const {phone, password} = req.body;
    

    try{
        const userByPhone = await User.findOne({ where: { phone } });
        const user = await User.findByPk(id);
        
        if (!user){
            return res.status(400).json({message: "Error en la obtención del usuario, vuelva a intentarlo"});
        }
        if (userByPhone) {
            return res.status(400).json({ message: 'El usuario ya está registrado' });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
        }
        await user.update({
            phone:phone || user.phone,
            password:password || user.password
        });
        return res.status(200).json({ message: 'Usuario actualizado', data: user});

    } catch(error) {
        console.error('Error al editar el usuario:', error);
        res.status(500)
            .json({message: `Error al editar el usuario con la id: ${id}`});
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await user.destroy();
        return res.status(200).json({ message: "Usuario eliminado con éxito" });
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        res.status(500).json({ message: `Error al eliminar el usuario con ID: ${id}` });
    }
};

// DAR DE BAJA UN USUARIO - ELIMINAR USUARIO
export const changeStateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await user.update({ status: false });
        return res.status(200).json({ message: "El usuario ha sido dado de baja correctamente" });

    } catch (error) {
        console.error("Error al dar de baja al usuario:", error);
        return res.status(500).json({ message: `Error al dar de baja al usuario con la ID: ${id}` });
    }
};

