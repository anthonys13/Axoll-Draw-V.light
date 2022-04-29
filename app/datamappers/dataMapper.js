const { database } = require("../../data/database");

const dataMapper = {
    /*-----------------------|---------------|-------------------------*/
    /*                       |    ARTICLES   |                        */
    /*-----------------------|---------------|-----------------------*/

    getArticlesByName: async function (name) {
        try {
            const query = {
                text: `SELECT * FROM "article" WHERE "name" ILIKE $1`,
                values: [`%${name}%`],
            };

            const results = await database.query(query);
            return results.rows;
        } catch (error) {
            console.error(error);
        }
    },

    getPriceFromArticleWithID: async function () {
        try {
            const query = {
                text: `SELECT id, price FROM article;`,
            };
            const results = await database.query(query);

            return results.rows;
        } catch (error) {
            console.error(error);
        }
    },

    articleRecent: async function () {
        try {
            const query = {
                text: `SELECT * FROM article ORDER BY date DESC LIMIT 4;`,
            };
            const results = await database.query(query);

            return results.rows;
        } catch (error) {
            console.error(error);
        }
    },

    articleToutHome: async function () {
        try {
            const query = {
                text: `SELECT * FROM article ORDER BY RANDOM();`,
            };
            const results = await database.query(query);

            return results.rows;
        } catch (error) {
            console.error(error);
        }
    },

    carousHome: async function () {
        try {
            const query = {
                text: `SELECT * FROM affiche;`,
            };
            const results = await database.query(query);

            return results.rows;
        } catch (error) {
            console.error(error);
        }
    },

    articleOneByOne: async function (id) {
        try {
            const query = {
                text: `SELECT * FROM article WHERE "id" = $1;`,
                values: [id],
            };
            const results = await database.query(query);

            return results.rows[0];
        } catch (error) {
            console.error(error);
        }
    },

    getAllArticle: async function () {
        try {
            const query = {
                text: `"SELECT * FROM "article";`,
            };

            const results = await database.query(query);

            return results.rows;
        } catch (error) {
            console.error(error);
        }
    },

    /*-----------------------|---------------|-------------------------*/
    /*                       |  CATEGORIES   |                        */
    /*-----------------------|---------------|-----------------------*/

    getCategories: async function () {
        try {
            const query = {
                text: `
            SELECT
                category AS label,
                count(*) AS tot
            FROM article
            GROUP BY category;
            `,
            };
            const results = await database.query(query);

            return results.rows;
        } catch (error) {
            console.error(error);
        }
    },

    getArticlesByCategory: async function (category) {
        try {
            const query = {
                text: `SELECT * FROM article WHERE category = $1 `,
                values: [category],
            };
            const results = await database.query(query);

            return results.rows;
        } catch (error) {
            console.error(error);
        }
    },

    getRecentArticleByCategory: async function (category) {
        try {
            const query = {
                text: `SELECT * FROM article WHERE category = $1 ORDER BY date DESC LIMIT 4`,
                values: [category],
            };
            const results = await database.query(query);

            return results.rows;
        } catch (error) {
            console.error(error);
        }
    },

    /*-----------------------|---------------|-------------------------*/
    /*                       | UTILISTAEURS  |                        */
    /*-----------------------|---------------|-----------------------*/

    getUser: async function (email) {
        try {
            const query = {
                text: `SELECT * FROM users WHERE email = $1`,
                values: [email],
            };

            const results = await database.query(query);

            return results.rows[0];
        } catch (error) {
            console.error(error);
        }
    },

    getRoleUsers: async function (email) {
        try {
            const query = {
                text: `SELECT role FROM users WHERE email = $1;`,
                values: [email],
            };

            const results = await database.query(query);

            return results.rows[0];
        } catch (error) {
            console.error(error);
        }
    },

    /*-----------------------|---------------|-------------------------*/
    /*                       |    Register   |                        */
    /*-----------------------|---------------|-----------------------*/

    RegisterUsers: async function (
        email,
        password,
        name,
        prenom,
        pays,
        ville,
        postal,
        numrue,
        namerue
    ) {
        try {
            const query = {
                text: `INSERT INTO users (email, password, name, prenom, pays, ville, postal, numrue, namerue) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);`,
                values: [
                    email,
                    password,
                    name,
                    prenom,
                    pays,
                    ville,
                    postal,
                    numrue,
                    namerue,
                ],
            };

            await database.query(query);
        } catch (error) {
            console.error(error);
        }
    },

    /*-----------------------|---------------|-------------------------*/
    /*                       |   addArticle  |                        */
    /*-----------------------|---------------|-----------------------*/

    addArticles: async function (
        name,
        description,
        size,
        price,
        visual_0,
        visual_1,
        visual_2,
        visual_3,
        category,
        date
    ) {
        try {
            const query = {
                text: `INSERT INTO article (name, description, size, price, visual_0, visual_1, visual_2, visual_3, category, date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);`,
                values: [
                    name,
                    description,
                    size,
                    price,
                    visual_0,
                    visual_1,
                    visual_2,
                    visual_3,
                    category,
                    date,
                ],
            };

            await database.query(query);
        } catch (error) {
            console.error(error);
        }
    },

    /*-------------------|------------------------|-------------------------*/
    /*                   |   Stockage fav-panier  |                        */
    /*-------------------|------------------------|-----------------------*/

    storagePani: async function (user_email, article_id) {
        try {
            const query = {
                text: `INSERT INTO userslockerpanier (user_email, article_id) VALUES ($1,$2);`,
                values: [user_email, article_id],
            };

            await database.query(query);
        } catch (error) {
            console.error(error);
        }
    },

    storageFav: async function (user_email, article_id) {
        try {
            const query = {
                text: `INSERT INTO userslockerfavoris (user_email, article_id) VALUES ($1,$2);`,
                values: [user_email, article_id],
            };

            await database.query(query);
        } catch (error) {
            console.error(error);
        }
    },

    /*-------------------|------------------------|-------------------------*/
    /*                   |     DELETE fav-panier  |                        */
    /*-------------------|------------------------|-----------------------*/

    deleteDoublonPani: async function () {
        try {
            const query = {
                text: `DELETE FROM userslockerpanier t1
                USING userslockerpanier t2
                WHERE t1.user_email = t2.user_email
                AND t1.article_id = t2.article_id
                AND t1.id > t2.id;`,
            };

            await database.query(query);
        } catch (error) {
            console.error(error);
        }
    },

    deleteDoublonFavs: async function () {
        try {
            const query = {
                text: `DELETE FROM userslockerfavoris t1
                USING userslockerfavoris t2
                WHERE t1.user_email = t2.user_email
                AND t1.article_id = t2.article_id
                AND t1.id > t2.id;`,
            };

            await database.query(query);
        } catch (error) {
            console.error(error);
        }
    },

    deleteIDPanier: async function (user_email, id) {
        try {
            const query = {
                text: `DELETE FROM userslockerpanier WHERE user_email = $1 AND article_id = $2`,
                values: [user_email, id],
            };

            await database.query(query);
        } catch (error) {
            console.error(error);
        }
    },

    deleteIDFavoris: async function (user_email, id) {
        try {
            const query = {
                text: `DELETE FROM userslockerfavoris WHERE user_email = $1 AND article_id = $2`,
                values: [user_email, id],
            };

            await database.query(query);
        } catch (error) {
            console.error(error);
        }
    },

    /*-------------------|------------------------|-------------------------*/
    /*                   |     SELECT fav-panier  |                        */
    /*-------------------|------------------------|-----------------------*/

    selectAllPanier: async function (user_email) {
        try {
            const query = {
                text: `SELECT article_id FROM userslockerpanier WHERE user_email = $1;`,
                values: [user_email],
            };
            const results = await database.query(query);

            return results.rows;
        } catch (error) {
            console.error(error);
        }
    },

    selectAllFavoris: async function (user_email) {
        try {
            const query = {
                text: `SELECT article_id FROM userslockerfavoris WHERE user_email = $1;`,
                values: [user_email],
            };
            const results = await database.query(query);

            return results.rows;
        } catch (error) {
            console.error(error);
        }
    },

    jointureFavsArticles: async function (user_email) {
        try {
            const query = {
                text: `SELECT * FROM
                            article 
                        JOIN 
                            userslockerfavoris 
                        ON 
                            article.id = userslockerfavoris.article_id 
                        WHERE 
                            user_email = $1 
                        ORDER BY 
                            article.id;`,
                values: [user_email],
            };

            const results = await database.query(query);

            return results.rows;
        } catch (error) {
            console.error(error);
        }
    },

    jointurePaniArticles: async function (user_email) {
        try {
            const query = {
                text: `
                SELECT * FROM
                    article 
                JOIN 
                    userslockerpanier 
                ON 
                    article.id = userslockerpanier.article_id 
                WHERE 
                    user_email = $1 
                ORDER BY 
                    article.id;`,
                values: [user_email],
            };

            const results = await database.query(query);

            return results.rows;
        } catch (error) {
            console.error(error);
        }
    },
};

module.exports = dataMapper;