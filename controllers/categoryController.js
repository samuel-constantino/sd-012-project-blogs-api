const { StatusCodes } = require('http-status-codes');

const { categoryService } = require('../services');

const findAll = async (_req, res) => {
    try {
        const result = await categoryService.findAll();

        res.status(StatusCodes.OK).json(result);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Algo deu errado' });
    }
};

// const findOne = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const result = await userService.findOne(id);
        
//         if (result.status) {
//             const { status, message } = result;
            
//             return res.status(status).json({ message });
//         }

//         res.status(StatusCodes.OK).json(result);
//     } catch (e) {
//         console.log(e.message);
//         res.status(500).json({ message: 'Algo deu errado' });
//     }
// };

const create = async (req, res) => {
    try {
        const { name } = req.body;
    
        const result = await categoryService.create({ name });
        
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

module.exports = {
    findAll,
    // findOne,
    create,
};