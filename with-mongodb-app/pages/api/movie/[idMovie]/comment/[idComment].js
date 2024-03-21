// pages/api/movies/[idMovie]/comments/[idComment].js
import {ObjectId} from "mongodb";
import clientPromise from "../../../../../lib/mongodb";

export default async function handler(req, res) {
    const { idMovie, idComment } = req.query;
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    let comment = {};
    switch (req.method) {
        case "GET":
            comment = await db.collection("comments").findOne({ _id : new ObjectId(idComment) });
            if(comment)
                res.json({ status: 200, data: comment });
            else
                res.json({ status: 404, data: "Le commentaire n'existe pas." });
            break;
        case "PUT":
            if(await db.collection("comments").findOne({ _id : new ObjectId(idComment) })){
                const { updates } = req.body;
                try {
                    comment = await db.collection("comments").updateOne({ _id : new ObjectId(idComment) }, { $set: updates });
                    res.json({ status: 201, data: comment });
                } catch (e) {
                    res.json({ status: 500, data: updates });
                    console.log("erreur !!", e)
                }
            } else res.json({ status: 404, data: "Le commentaire n'existe pas." });
            break;
        case "DELETE":
            if(await db.collection("comments").findOne({ _id : new ObjectId(idComment) })){
                comment = await db.collection("comments").deleteOne({ _id : new ObjectId(idComment) });
                res.json({ status: 200, data: "Le commentaire vient d'être supprimé." });
            } else res.json({ status: 404, data: "Le commentaire n'existe pas." });
            break;
        default :
            res.json({ status: 200, data: "Bad method, need to use GET, PUT or DELETE method for this request." });
            break;
    }
}
