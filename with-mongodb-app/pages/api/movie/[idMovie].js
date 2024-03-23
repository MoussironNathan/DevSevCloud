// pages/api/movie/[idMovie].js
import clientPromise from "../../../lib/mongodb";
import {ObjectId} from "mongodb";


/**
 * @swagger
 * /api/movies/{idMovie}:
 *   get:
 *     description: Returns the movies with the {idMovie}
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: ID movie
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plot:
 *                   type: string
 *                   example: "A group of bandits stage a brazen train hold-up, only to find a determined posse hot on their heels."
 *                 genres:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "Western"
 *                 runtime:
 *                   type: integer
 *                   format: int64
 *                   example: 11
 *                 cast:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "A.C. Abadie"
 *                 poster:
 *                   type: string
 *                   example: "https://m.media-amazon.com/images/M/MV5BMTU3NjE5NzYtYTYyNS00MDVmLWIwYjgtMmYwYWIxZDYyNzU2XkEyXkFqcGdeQXVyNzQzNzQxNzI@._V1_SY1000_SX677_AL_.jpg"
 *                 title:
 *                   type: string
 *                   example: "The Great Train Robbery"
 *                 fullplot:
 *                   type: string
 *                   example: "Among the earliest existing films in American cinema - notable as the first film that presented a narrative story to tell - it depicts a group of cowboy outlaws who hold up a train and rob the passengers. They are then pursued by a Sheriff's posse. Several scenes have color included - all hand tinted."
 *                 languages:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "English"
 *                 released:
 *                   type: string
 *                   example: "1903-12-01T00:00:00.000Z"
 *                 directors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "Edwin S. Porter"
 *                 rated:
 *                   type: string
 *                   example: "TV-G"
 *                 awards:
 *                   type: object
 *                   properties:
 *                     wins:
 *                       type: integer
 *                       format: int64
 *                       example: 1
 *                     nominations:
 *                       type: integer
 *                       format: int64
 *                       example: 0
 *                     text:
 *                       type: string
 *                       example: 1 win.
 *                   xml:
 *                     name: awards
 *                 lastupdated:
 *                   type: string
 *                   example: "2015-08-13 00:27:59.177000000"
 *                 year:
 *                   type: integer
 *                   format: int64
 *                   example: 1903
 *                 imdb:
 *                   type: object
 *                   properties:
 *                     rating:
 *                       type: float
 *                       example: 7.4
 *                     votes:
 *                       type: integer
 *                       format: int64
 *                       example: 9847
 *                     id:
 *                       type: integer
 *                       format: int64
 *                       example: 439
 *                 countries:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: USA
 *                 test:
 *                   type: string
 *                   example: movie
 *                 tomatoes:
 *                   type: object
 *                   properties:
 *                     viewer:
 *                       type: object
 *                       properties:
 *                         rating:
 *                           type: float
 *                           example: 3.7
 *                         numReviews:
 *                           type: integer
 *                           format: int64
 *                           example: 2559
 *                         meter:
 *                           type: integer
 *                           format: int64
 *                           example: 75
 *                     fresh:
 *                       type: integer
 *                       format: int64
 *                       example: 6
 *                     critic:
 *                       type: object
 *                       properties:
 *                         rating:
 *                           type: float
 *                           example: 7.6
 *                         numReviews:
 *                           type: integer
 *                           format: int64
 *                           example: 6
 *                         meter:
 *                           type: integer
 *                           format: int64
 *                           example: 100
 *                     rotten:
 *                       type: integer
 *                       format: int64
 *                       example: 0
 *                     lastUpdated:
 *                       type: string
 *                       example: "2015-08-08T19:16:10.000Z"
 *                 num_mflix_comments:
 *                   type: integer
 *                   format: int64
 *                   example: 0
 *       404:
 *         description: Failed operation
 *       500:
 *         description: Failed operation
 *   put:
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: ID movie
 *     requestBody:
 *       description: Endpoint for modify a movie
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               updates:
 *                 type: object
 *                 properties:
 *                   plot:
 *                     type: string
 *                     example: "new plot"
 *                   runtime:
 *                     type: integer
 *                     format: int64
 *                     example: 50
 *           description: New infos for the movie with {idMovie}
 *     responses:
 *       201:
 *         description: Successful operation
 *       404:
 *         description: Failed operation
 *       500:
 *         description: Failed operation
 *   delete:
 *     description: Delete the movies with the {idMovie}
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: ID movie
 *     responses:
 *       201:
 *         description: Successful operation
 *       404:
 *         description: Failed operation
 *       500:
 *         description: Failed operation
 *
 */
export default async function handler(req, res) {
    const { idMovie } = req.query;
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    let movie = {};
    switch (req.method) {
        case "GET":
            try {
                movie = await db.collection("movies").findOne({ _id : new ObjectId(idMovie) });
                if(movie)
                    res.json({ status: 200, data: movie });
                else
                    res.json({ status: 404, data: "Le film n'existe pas." });
            } catch (e) {
                res.json({ status: 500, error: e });
            }
            break;
        case "PUT":
            if(await db.collection("movies").findOne({ _id : new ObjectId(idMovie) })){
                try {
                    const { updates } = req.body;
                    movie = await db.collection("movies").updateOne({ _id : new ObjectId(idMovie) }, { $set: updates });
                    res.json({ status: 201, data: movie });
                } catch (e) {
                    res.json({ status: 500, data: e });
                }
            } else res.json({ status: 404, data: "Le film n'existe pas." });
            break;
        case "DELETE":
            try {
                if(await db.collection("movies").findOne({ _id : new ObjectId(idMovie) })){
                    movie = await db.collection("movies").deleteOne({ _id : new ObjectId(idMovie) });
                    res.json({ status: 200, data: "Le film vient d'être supprimé." });
                } else res.json({ status: 404, data: "Le film n'existe pas." });
            } catch (e) {
                res.json({ status: 500, error: e });
            }
            break;
        default :
            res.json({ status: 405, data: "Bad method, need to use GET, PUT or DELETE method for this request." });
            break;
    }
}
