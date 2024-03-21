// pages/api/movies/[idMovie]/comments.js
import clientPromise from "../../../../lib/mongodb";

export default async function handler(req, res) {
    const { idMovie } = req.query;
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    let comments = [];
    switch (req.method) {
        case "GET":
            comments = await db.collection("comments").find({ movie_id : idMovie }).toArray();
            if(comments)
                res.json({ status: 200, data: comments });
            else
                res.json({ status: 404, data: "Il n'y a pas de commentaire pour ce film ou le film n'existe pas." });
            break;
        case "POST":
            const new_comment = req.body;
            comments = await db.collection("comments").insertOne(new_comment);
            res.json({ status: 201, data: comments });
            break;
        default :
            res.json({ status: 200, data: "Bad method, need to use GET or POST for this request." });
            break;
    }
}
