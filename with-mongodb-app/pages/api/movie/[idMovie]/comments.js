// pages/api/movies.js
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    var comments = [];
    switch (req.method) {
        case "GET":
            comments = await db.collection("comments").find({}).toArray();
            res.json({ status: 200, data: comments });
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
