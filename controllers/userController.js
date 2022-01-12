const { StatusCodes } = require('http-status-codes');

const { userService } = require('../services');

const findAll = async (_req, res) => {
    try {
        const result = await userService.findAll();

        res.status(StatusCodes.OK).json(result);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Algo deu errado' });
    }
};

const findOneById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await userService.findOneById(id);
        
        if (result.status) {
            const { status, message } = result;
            
            return res.status(status).json({ message });
        }

        res.status(StatusCodes.OK).json(result);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Algo deu errado' });
    }
};

const create = async (req, res) => {
    try {
        const { displayName, email, password, image } = req.body;
    
        const result = await userService.create({
            displayName,
            email,
            password,
            image,
        });
        
        if (result.status) {
            const { status, message } = result;
            
            return res.status(status).json({ message });
        }
        res.status(StatusCodes.CREATED).json(result);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Algo deu errado' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await userService.login({
            email,
            password,
        });

        if (result.status) {
            const { status, message } = result;
            return res.status(status).json({ message });
        }

        return res.status(StatusCodes.OK).json(result);
    } catch (e) {
        console.log(e.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Algo deu errado' });
    }
};

module.exports = {
    findAll,
    findOneById,
    create,
    login,
};