// pages/api/movie/[idMovie].js
import clientPromise from "../../../lib/mongodb";
import {ObjectId} from "mongodb";


/**
 * @swagger
 * /api/movies/{idMovie}:
 *   get:
 *     description: Returns the movies with the [idMovie]
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: ID movie
 *     responses:
 *       200:
 *         description: Hello Movies
 *       404:
 *         description: Movie's not found
 *       405:
 *         description: Wrong HTTP Method
 *   put:
 *     requestBody:
 *       description: Endpoint for modify a movie
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *           description:
 *     responses:
 *       201:
 *         description: Movies infos
 *       404:
 *         description: Movie's not found
 *       405:
 *         description: Wrong HTTP Method
 *
 */
export default async function handler(req, res) {
    const { idMovie } = req.query;
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    let movie = {};
    switch (req.method) {
        case "GET":
            movie = await db.collection("movies").findOne({ _id : new ObjectId(idMovie) });
            if(movie)
                res.json({ status: 200, data: movie });
            else
                res.json({ status: 404, data: "Le film n'existe pas." });
            break;
        case "PUT":
            if(await db.collection("movies").findOne({ _id : new ObjectId(idMovie) })){
                try {
                    const { updates } = req.body;
                    movie = await db.collection("movies").updateOne({ _id : new ObjectId(idMovie) }, { $set: updates });
                    res.json({ status: 201, data: movie });
                } catch (e) {
                    //res.json({ status: 200, data: e });
                    console.log("erreur !!", e)
                }
            } else res.json({ status: 404, data: "Le film n'existe pas." });
            break;
        case "DELETE":
            if(await db.collection("movies").findOne({ _id : new ObjectId(idMovie) })){
                movie = await db.collection("movies").deleteOne({ _id : new ObjectId(idMovie) });
                res.json({ status: 200, data: "Le film vient d'être supprimé." });
            } else res.json({ status: 404, data: "Le film n'existe pas." });
            break;
        default :
            res.json({ status: 200, data: "Bad method, need to use GET, PUT or DELETE method for this request." });
            break;
    }
}
