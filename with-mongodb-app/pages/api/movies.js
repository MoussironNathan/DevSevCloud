// pages/api/movies.js
import clientPromise from "../../lib/mongodb";

/**
 * @swagger
 * /api/movies:
 *   get:
 *     description: Returns all movies
 *     responses:
 *       200:
 *         description: Hello Movies
 *       405:
 *         description: Wrong HTTP Method
 *   post:
 *     requestBody:
 *       description: Endpoint for adding a movie
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Movies infos
 *       405:
 *         description: Wrong HTTP Method
 *
 */
export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    let movies = [];
    switch (req.method) {
        case "GET":
            movies = await db.collection("movies").find({}).toArray();
            res.json({ status: 200, data: movies });
            break;
        case "POST":
            const new_movie = req.body;
            movies = await db.collection("movies").insertOne(new_movie);
            res.json({ status: 201, data: movies });
            break;
        default :
            res.json({ status: 405, data: "Bad method, need to use GET or POST for this request." });
            break;
    }
}
