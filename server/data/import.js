require("dotenv").config();

const client = require("../app/data/dataClient");

const moduleImport = {
    importFunction: async () => {
        let testEntries = 0;
        try {
            const res = await client.query("SELECT COUNT(*) FROM category");
            testEntries = res.rows[0];
        } catch (err) {
            console.log(err.stack);
        }

        if (testEntries.count == 0) {
            console.log("Beginning of the import");

            const categoriesBDD = [];

            const categories = require("./categories.json");

            for (const category of categories) {
                const text = 'INSERT INTO category(label,route) VALUES($1,$2) RETURNING id,label';
                const values = [category.label, category.route];

                try {
                    const res = await client.query(text, values);
                    console.log(res.rows[0]);
                    // le res.rows[0] correspond à un objet { id: 16, label: 'Accueil' } 
                    // la forme de cette objet est définie dans le RETURNING de l'INSERT
                    categoriesBDD.push(res.rows[0]);
                } catch (err) {
                    console.log(err.stack);
                }
            }

            // Je récupère les articles
            const posts = require("./posts.json");
            // Je les injecte en base de données
            /// Je parcours les articles
            for (const post of posts) {
                /// Je récupère l'id de la catégorie
                const category_id = categoriesBDD.find(category => category.label == post.category).id;

                /// Je les enregistre un à un
                const text = 'INSERT INTO post(title, slug,excerpt,content,category_id) VALUES($1, $2,$3,$4,$5)';
                const values = [post.title, post.slug, post.excerpt, post.content, category_id];

                try {
                    await client.query(text, values);
                } catch (err) {
                    console.log(err.stack);
                }
            }

            console.log("import terminé");
        }
    }
}
moduleImport.importFunction();
module.exports = moduleImport;