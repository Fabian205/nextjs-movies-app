import Form from "@/components/Form";
import { useRouter } from "next/router";
import useSWR from "swr";

/* const fetcher = (url) =>
fetch(url)
.then((res)=> res.json())
.then((json) => json.data); */

const fetcher = async (url) => {
  const res = await fetch(url);

  // Si el status code no esta en el rango 200-299,
  // seguimos intentando analizarlo y lanzarlo.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Adjunta información extra al objeto de error.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  const { data } = await res.json();
  //console.log(data)
  return data;
};

const EditMovie = () => {
  const router = useRouter();
  const { id } = router.query;

  //console.log(id)
  const { data: movie, error } = useSWR( 
    id ? `/api/movie/${id}` : null,
    fetcher 
  );


  if (error) {
    return <div>Failed to load</div>;
  }

  if (!movie) {
    return (
      <div className="container mt-5 text-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!movie) return null

  const formData = {
    concepto:movie.concepto,
    cuenta:movie.cuenta,
    detalle:movie.detalle,
    fecha:movie.fecha,
    valor:movie.valor,
  }
  return (
    <div className="container">
      <h1 className="text-light">Edit movie</h1>
      
      <Form forNewMovie={false} formData={formData}></Form>
    </div>
  );
};

export default EditMovie;
