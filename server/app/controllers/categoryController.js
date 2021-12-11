const dataMapper = require("../data/dataMapper");

const categoryController = {
    findAll: async (req, res, next) => {
        const categories = await dataMapper.findAllCategories();

        if (categories) {
            res.json(categories);
        }
        else {
            res.status(400).json({});
        }
    },
    addCategory: async (req, res, next) => {
        // to do
    }
};

module.exports = categoryController;