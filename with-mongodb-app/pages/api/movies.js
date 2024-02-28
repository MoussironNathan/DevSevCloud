// pages/api/movies.js
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    var movies = [];
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
            res.json({ status: 200, data: "Bad method, need to use GET or POST for this request." });
            break;
    }
}
