// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import conectarDB from "@/lib/dbConnect";
import Movie from "@/models/Movie";

export default async function handler(req, res) {
  await conectarDB();

  //POST api/movie

  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const movie = new Movie(req.body);
        if (movie.concepto === "" || movie.valor === "") {
          return res.status(400).json({ success: false, error: "Falla 400" });
        } else {
          await movie.save();
          return res.status(200).json({ success: true });
        }
      } catch (error) {
        return res
        .status(502)
        .json({ success: false, error: 'Algo va mal' });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Falla del servidor" });
  }
}
