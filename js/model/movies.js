import { ObjectId } from "mongodb";
import {connect} from "../../helpers/db/connect.js"


export const getMovieById = async (id = "668583660d6c63638c819c9c")
    let {db, conexion} = await connect.getinstance ();

    const collection = db.collection ('movis');
    const data = await collection. aggregate ([
        {
            $match: {
                _id: {$eq: new ObjectId(id)}
            }
        }
    ]).toArray ();
    conexion.close ();
    return data;
}