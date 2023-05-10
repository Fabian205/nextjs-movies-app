import conectarDB from "@/lib/dbConnect";
import Movie from "@/models/Movie";

export default async function handler(req, res) {
  await conectarDB();

  //GET api/movie/:id( get id and list)
  //DELETE api/movie/:id( delete doc by id)
  //PUT api/movie/:id( edit doc by id)

  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "PUT":
      try {
        const movie = await Movie.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!movie) {
          return res.status(400).json({ success: false });
        }
          return res.status(200).json({ success: true, data: movie });
      } catch (error) {
          return res.status(400).json({ success: false });
      }
    
      //https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose/pages  
    case "DELETE":
      try {
        const movie = await Movie.findByIdAndDelete(id);
        if (!movie) {
          return res.status(404).json({ success: false });
        }
          return res.json({ success: true, data: movie });
      } catch (error) {
          return res.status(404).json({ success: false });
      }
    
    case "GET":
      try {
        const movie = await Movie.findById(id).lean();
        if (!movie) {
          return res.status(404).json({ success: false });
        }
          return res.json({ success: true, data: movie });
      } catch (error) {
          return res.status(404).json({ success: false });
      }
    
    default:
      return res
        .status(500)
        .json({ success: false, error: "Falla del servidor" });
  }
}
