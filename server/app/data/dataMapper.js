const client = require("./dataClient");

const dataMapper = {
    findAllCategories: async () => {
        let result = null;
        const query = "SELECT id,label,route FROM category";

        try {
            const res = await client.query(query);
            if (res.err) {
                console.log(res.err)
            }
            else {
                result = res.rows
            }
        } catch (err) {
            console.log(err.stack);
        }


        return result;
    },
    findAllPosts: async () => {
        let result = null;
        const query = "SELECT * FROM post";

        try {
            const res = await client.query(query);

            if (res.err) {
                console.log(res.err);
            }
            else {
                result = res.rows
            }
        } catch (err) {
            console.log(err.stack);
        }


        return result;
    },
    findPostById: async (id) => {
        let result = null;
        const query = {
            text: "SELECT * FROM post WHERE id=$1",
            value: [id]
        }

        try {
            const res = await client.query(query.text, query.value);

            if (res.err) {
                console.log(res.err)
            }
            else {
                result = res.rows[0];
            }
        } catch (err) {
            console.log(err.stack);
        }


        return result;
    },
    findPostsByCategory: async (categoryId) => {
        let result = null;
        const query = {
            text: "SELECT * FROM post WHERE category_id=$1",
            value: [categoryId]
        }

        try {
            const res = await client.query(query.text, query.value);

            if (res.err) {
                console.log(res.err);
            }
            else {
                result = res.row[0];
            }
        } catch (err) {
            console.log(err.stack);
        }


        return result;
    },
    getCategoryId: async (categoryLabel) => {
        let result = null;
        const query = {
            text: "SELECT id FROM category WHERE labal=$1",
            value: [categoryLabel]
        }
        try {
            const res = await client.query(query.text, query.value);

            if (res.err) {
                console.log(res.err);
            }
            else {
                result = res.row[0].id;
            }
        } catch {
            console.log(err.stack);
        }


        return result;
    },
    addPost: async (post) => {
        let result = null;
        const query = {
            text: "INSERT INTO post (title,slug,excerpt,content,category_id) VALUES ($1,$2,$3,$4,$5) RETURNING *",
            value: [post.title, post.slug, post.excerpt, post.content, post.category_id]
        };

        try {
            const res = await client.query(query.text, query.value);

            if (res.err) {
                console.log(res.err);
            }
            else {
                result = res.rows[0];
                console.log("result", result);
            }
        } catch {
            console.log(err.stack);
        }
    }
}

modules.exports = dataMapper;