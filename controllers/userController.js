const userService = require('../services/userService');

const create = async (req, res) => {
    try {
        const { displayName, email, password, image } = req.body;
    
        const createdUser = await userService.create({
            displayName,
            email,
            password,
            image,
        });
        
        if (createdUser.error) {
            return res.status(createdUser.status).json({ message: createdUser.error });
        }
    
        res.status(201).json(createdUser);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Algo deu errado' });
    }
};

module.exports = {
    create,
};