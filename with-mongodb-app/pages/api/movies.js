// pages/api/movies.js
import clientPromise from "../../lib/mongodb";

/**
 * @swagger
 * /api/movies:
 *   get:
 *     description: Returns all movies
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "573a1390f29313caabcd42e8"
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
 *       500:
 *         description: Failed operation
 *   post:
 *     requestBody:
 *       description: Endpoint for adding a movie
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plot:
 *                 type: string
 *                 example: "A group of bandits stage a brazen train hold-up, only to find a determined posse hot on their heels."
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "Western"
 *               runtime:
 *                 type: integer
 *                 format: int64
 *                 example: 11
 *               cast:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "A.C. Abadie"
 *               poster:
 *                 type: string
 *                 example: "https://m.media-amazon.com/images/M/MV5BMTU3NjE5NzYtYTYyNS00MDVmLWIwYjgtMmYwYWIxZDYyNzU2XkEyXkFqcGdeQXVyNzQzNzQxNzI@._V1_SY1000_SX677_AL_.jpg"
 *               title:
 *                 type: string
 *                 example: "The Great Train Robbery"
 *               fullplot:
 *                 type: string
 *                 example: "Among the earliest existing films in American cinema - notable as the first film that presented a narrative story to tell - it depicts a group of cowboy outlaws who hold up a train and rob the passengers. They are then pursued by a Sheriff's posse. Several scenes have color included - all hand tinted."
 *               languages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "English"
 *               released:
 *                 type: string
 *                 example: "1903-12-01T00:00:00.000Z"
 *               directors:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "Edwin S. Porter"
 *               rated:
 *                 type: string
 *                 example: "TV-G"
 *               awards:
 *                 type: object
 *                 properties:
 *                   wins:
 *                     type: integer
 *                     format: int64
 *                     example: 1
 *                   nominations:
 *                     type: integer
 *                     format: int64
 *                     example: 0
 *                   text:
 *                     type: string
 *                     example: 1 win.
 *                 xml:
 *                   name: awards
 *               lastupdated:
 *                 type: string
 *                 example: "2015-08-13 00:27:59.177000000"
 *               year:
 *                 type: integer
 *                 format: int64
 *                 example: 1903
 *               imdb:
 *                 type: object
 *                 properties:
 *                   rating:
 *                     type: float
 *                     example: 7.4
 *                   votes:
 *                     type: integer
 *                     format: int64
 *                     example: 9847
 *                   id:
 *                     type: integer
 *                     format: int64
 *                     example: 439
 *               countries:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: USA
 *               test:
 *                 type: string
 *                 example: movie
 *               tomatoes:
 *                 type: object
 *                 properties:
 *                   viewer:
 *                     type: object
 *                     properties:
 *                       rating:
 *                         type: float
 *                         example: 3.7
 *                       numReviews:
 *                         type: integer
 *                         format: int64
 *                         example: 2559
 *                       meter:
 *                         type: integer
 *                         format: int64
 *                         example: 75
 *                   fresh:
 *                     type: integer
 *                     format: int64
 *                     example: 6
 *                   critic:
 *                     type: object
 *                     properties:
 *                       rating:
 *                         type: float
 *                         example: 7.6
 *                       numReviews:
 *                         type: integer
 *                         format: int64
 *                         example: 6
 *                       meter:
 *                         type: integer
 *                         format: int64
 *                         example: 100
 *                   rotten:
 *                     type: integer
 *                     format: int64
 *                     example: 0
 *                   lastUpdated:
 *                     type: string
 *                     example: "2015-08-08T19:16:10.000Z"
 *               num_mflix_comments:
 *                 type: integer
 *                 format: int64
 *                 example: 0
 *     responses:
 *       201:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: bool
 *                   example: true
 *                 insertId:
 *                   type: string
 *                   example: "65feb6053bc92368d64ed81d"
 *       400:
 *         description: Failed operation
 *       500:
 *         description: Failed operation
 */
export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    let movies = [];
    switch (req.method) {
        case "GET":
            try {
                movies = await db.collection("movies").find({}).toArray();
                res.json({ status: 200, data: movies });
            } catch (e) {
                res.json({ status: 500, error: e });
            }
            break;
        case "POST":
            try {
                const new_movie = req.body;
                if(new_movie){
                    movies = await db.collection("movies").insertOne(new_movie);
                    res.json({ status: 201, data: movies });
                } else res.json({ status: 400, error: "Aucun paramètre n'a été fourni pour créer le commentaire." });
            } catch (e) {
                res.json({ status: 500, error: e });
            }
            break;
        default :
            res.json({ status: 405, data: "Bad method, need to use GET or POST for this request." });
            break;
    }
}
