// pages/api/movies/[idMovie]/comments.js
import clientPromise from "../../../../lib/mongodb";
import {ObjectId} from "mongodb";


/**
 * @swagger
 * /api/movies/{idMovie}/comments:
 *   get:
 *     description: Returns all comments
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
 *                 _id:
 *                   type: string
 *                   example: "5a9427648b0beebeb69579e7"
 *                 name:
 *                   type: string
 *                   example: "Mercedes Tyler"
 *                 email:
 *                   type: string
 *                   example: "mercedes_tyler@fakegmail.com"
 *                 movie_id:
 *                   type: string
 *                   example: "573a1390f29313caabcd4323"
 *                 text:
 *                   type: array
 *                   example: "Eius veritatis vero facilis quaerat fuga temporibus. Praesentium expedita sequi repellat id. Corporis minima enim ex. Provident fugit nisi dignissimos nulla nam ipsum aliquam."
 *                 date:
 *                   type: string
 *                   example: "2002-08-18T04:56:07.000Z"
 *       404:
 *         description: Failed operation
 *       500:
 *         description: Failed operation
 *   post:
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: ID movie
 *     requestBody:
 *       description: Endpoint for adding a comment
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mercedes Tyler"
 *               email:
 *                 type: string
 *                 example: "mercedes_tyler@fakegmail.com"
 *               text:
 *                 type: array
 *                 example: "Eius veritatis vero facilis quaerat fuga temporibus. Praesentium expedita sequi repellat id. Corporis minima enim ex. Provident fugit nisi dignissimos nulla nam ipsum aliquam."
 *               date:
 *                 type: string
 *                 example: "2002-08-18T04:56:07.000Z"
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
 *
 */
export default async function handler(req, res) {
    const { idMovie } = req.query;
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    let comments = [];
    switch (req.method) {
        case "GET":
            try{
                comments = await db.collection("comments").find({ movie_id : new ObjectId(idMovie) }).toArray();
                if(comments)
                    res.json({ status: 200, data: comments });
                else
                    res.json({ status: 404, data: "Il n'y a pas de commentaire pour ce film ou le film n'existe pas." });
            } catch (e) {
                res.json({ status: 500, error: e });
            }
            break;
        case "POST":
            try{
                let comment_body = req.body;
                const movie_id = { movie_id: idMovie}
                const new_comment = Object.assign({}, comment_body, movie_id);
                if(comment_body){
                    comments = await db.collection("comments").insertOne(new_comment);
                    res.json({ status: 201, data: comments });
                } else res.json({ status: 400, error: "Aucun paramètre n'a été fourni pour créer le commentaire." });
            } catch (e) {
                console.log(e)
                res.json({ status: 500, error: e });
            }
            break;
        default :
            res.json({ status: 405, data: "Bad method, need to use GET or POST for this request." });
            break;
    }
}
