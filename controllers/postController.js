const { StatusCodes } = require('http-status-codes');

const { postService } = require('../services');

const {
    postRequestValid,
} = require('../util/validations');

const create = async (req, res) => {
    try {
        const { title, content, categoryIds } = req.body;

        const postRequestValided = postRequestValid({ title, content, categoryIds });
        if (postRequestValided.status) {
            return res.status(postRequestValided.status)
                .json({ message: postRequestValided.message });
        }
        const { user: { email: userEmail } } = req;
        
        const result = await postService.create({ title, content, categoryIds, userEmail });
        
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
    create,
};