import conectarDB from "@/lib/dbConnect";
import Movie from "@/models/Movie";
import Link from "next/link";
import { useRouter } from "next/router";

const MoviePage = ({ success, error, movie }) => {
  const router = useRouter();

  if (!success) {
    return (
      <div className="container text-center my-5">
        <h1>{error}</h1>
        <Link legacyBehavior href="/">
          <a className="btn btn-success">Back...</a>
        </Link>
      </div>
    );
  }

  const deleteData = async (id) => {
    try {
      await fetch(`/api/movie/${id}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container text-center">
      <h1 className="text-light">More information</h1>
      <div className="card bg-dark text-light">
        <div className="card-body">
          <div className="card-title">
            <h5 className="text-uppercase">{movie.fecha}</h5>
          </div>
          <p className="fw-light">{movie.detalle}</p>
          <Link legacyBehavior href="/">
            <a className="btn btn-success btn-sm me-2">Volver...</a>
          </Link>
          <Link legacyBehavior href={`/${movie._id}/edit`}>
            <a className="btn btn-success btn-sm me-2">Edit</a>
          </Link>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteData(movie._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;

export async function getServerSideProps({ params }) {
  try {
    await conectarDB();

    const movie = await Movie.findById(params.id).lean();

    if (!movie) {
      return { props: { success: false, error: "Movie don't exist" } };
    }

    //console.log(movie);
    //movie._id = `&{movie._id}`;
    movie._id = movie._id.toString();
    //console.log(movie._id);
    //movie._id = params.id;
    //console.log(movie._id);

    return { props: { success: true, movie } };
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return { props: { success: false, error: "Invalid Id" } };
    }
    return { props: { success: false, error: "Serve error" } };
  }
}
