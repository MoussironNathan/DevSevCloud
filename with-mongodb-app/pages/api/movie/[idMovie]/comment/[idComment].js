// pages/api/movies/[idMovie]/comments/[idComment].js
import {ObjectId} from "mongodb";
import clientPromise from "../../../../../lib/mongodb";


/**
 * @swagger
 * /api/movies/{idMovie}/comments/{idComment}:
 *   get:
 *     description: Returns the comments with the {idMovie}
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
 *       404:
 *         description: Failed operation
 *       500:
 *         description: Failed operation
 *   put:
 *     requestBody:
 *       description: Endpoint for modify a comment
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
 *           description: New comment infos
 *     responses:
 *       201:
 *         description: Successful operation
 *       404:
 *         description: Failed operation
 *       500:
 *         description: Failed operation
 *   delete:
 *     description: Delete the comment with the {idComment}
 *     parameters:
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: ID comment
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
    const { idMovie, idComment } = req.query;
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    let comment = {};
    switch (req.method) {
        case "GET":
            try {
                comment = await db.collection("comments").findOne({ _id : new ObjectId(idComment), movie_id: idMovie});
                if(comment)
                    res.json({ status: 200, data: comment });
                else
                    res.json({ status: 404, data: "Le commentaire n'existe pas." });
            } catch (e) {
                res.json({ status: 500, error: e });
            }
            break;
        case "PUT":
            try {
                if(await db.collection("comments").findOne({ _id : new ObjectId(idComment), movie_id: idMovie  })){
                    const { updates } = req.body;
                    try {
                        comment = await db.collection("comments").updateOne({ _id : new ObjectId(idComment), movie_id: idMovie }, { $set: updates });
                        res.json({ status: 201, data: comment });
                    } catch (e) {
                        res.json({ status: 500, data: updates });
                        console.log("erreur !!", e)
                    }
                } else res.json({ status: 404, data: "Le commentaire n'existe pas." });
            } catch (e) {
                res.json({ status: 500, error: e });
            }
            break;
        case "DELETE":
            try {
                if(await db.collection("comments").findOne({ _id : new ObjectId(idComment), movie_id: idMovie })){
                    comment = await db.collection("comments").deleteOne({ _id : new ObjectId(idComment), movie_id: idMovie });
                    res.json({ status: 200, data: "Le commentaire vient d'être supprimé." });
                } else res.json({ status: 404, data: "Le commentaire n'existe pas." });
            } catch (e) {
                res.json({ status: 500, error: e });
            }
            break;
        default :
            res.json({ status: 200, data: "Bad method, need to use GET, PUT or DELETE method for this request." });
            break;
    }
}
