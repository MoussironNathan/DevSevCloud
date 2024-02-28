// pages/api/movie/[idMovie].js
import clientPromise from "../../../lib/mongodb";
import {ObjectId} from "mongodb";
import OrmService from "../../../services/ormService";
import ormService from "../../../services/ormService";
import {useSearchParams} from "next/navigation";

export default async function handler(req, res) {
    const { idMovie } = req.query;
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    var movie = {};
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
