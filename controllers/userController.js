const { StatusCodes } = require('http-status-codes');

const userService = require('../services/userService');

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
        res.status(StatusCodes.CREATED).json({ token: result });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Algo deu errado' });
    }
};

module.exports = {
    create,
};