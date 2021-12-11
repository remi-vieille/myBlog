const dataMapper = require("../data/dataMapper");

const postController = {
    findAll: async (_, res) => {
        const posts = await dataMapper.findAllPosts();

        if (posts) {
            res.json(posts);
        }
        else {
            res.status(400).json({});
        }
    },
    findById: async (req, res) => {
        const post = await dataMapper.findPostById(req.params.id);

        if (post) {
            res.json(post);
        }
        else {
            res.status(400).json({});
        }
    },
    findByCategory: async (req, res) => {
        const posts = await dataMapper.findPostsByCategory(req.params.id);

        if (posts) {
            res.json(posts);
        }
        else {
            res.status(400).json({})
        }
    },
    addPost: async (req, res) => {

        const post = req.body;

        post.categoryId = await dataMapper.getCategoryId(post.category);

        const newPost = await dataMapper.addPost(post);

        if (newPost) {
            res.json(newPost);
        }
        else {
            res.status(400).json({});
        }
    }
}

module.exports = postController;