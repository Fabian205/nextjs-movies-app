import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Form = ({ formData, forNewMovie = true }) => {
  const router = useRouter();

  const [form, setForm] = useState({
    concepto: formData.concepto,
    cuenta: formData.cuenta,
    detalle: formData.detalle,
    fecha: formData.fecha,
    valor: formData.valor,
  });

  //const [message, setMessage] = useState([]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (forNewMovie) {
      postData(form);
    } else {
      putData(form);
    }
  };

  const putData = async (form) => {
    //setMessage([]);
    const { id } = router.query;
    try {
      const res = await fetch(`/api/movie/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Ingrese los datos requeridos (*)");
      } else {
        //setMessage([]);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async (form) => {
    try {
      const res = await fetch("/api/movie", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!data.success) {
        alert("Ingrese los datos requeridos (*)");
      } else {
        router.push("/");
      }
      /* if (!data.success) {
        alert('Ingrese los datos requeridos (*)');
        for (const key in data.error.errors) {
          let error = data.error.errors[key];
          setMessage((oldmessage) => [
            ...oldmessage,
            { message: error.message },
          ]);
        } 
      }else {
        router.push("/");
      } */
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3 className="text-light" >Concept</h3>
        <input
          className="form-control my-3 bg-dark text-light"
          type="text"
          placeholder="Enter concept*"
          autoComplete="off"
          name="concepto"
          value={form.concepto}
          onChange={handleChange}
          autoFocus
        />
        <h3 className="text-light">Account</h3>
        
        <select 
        
        className="form-control my-3 bg-dark text-light"
        name="cuenta"
        value={form.cuenta}
        onChange={handleChange}       
        >
          <option color="blue" value="seleccion" selected>Seleccione la cuenta</option>
          <option color="yellow" value="Cta_Cte_Bp-Rp">Cta_Cte_Bp-Rp</option>
          <option color="yellow" value="Cta_Aho_Bp-Rp">Cta_Aho_Bp-Rp</option>
          <option color="green" value="Cta_Aho_Cacpn-Rp">Cta_Aho_Cacpn-Rp</option>
          <option color ="gray" value="Cta_Pa">Cta_Pa</option>
          <option color="magenta" value="Cta_Lou">Cta_Lou</option>
          <option value="Efectivo">Efectivo</option>
        </select>
        {/* <input
          className="form-control my-2"
          type="text"
          placeholder="Enter account"
          autoComplete="off"
          name="cuenta"
          value={form.cuenta}
          onChange={handleChange}
        /> */}
        <h3 className="text-light">Detail</h3>
        <input
          className="form-control my-3 bg-dark text-light"
          type="text"
          placeholder="Enter detail"
          autoComplete="off"
          name="detalle"
          value={form.detalle}
          onChange={handleChange}
        />
        <h3 className="text-light">Date</h3>
        <input
          className="form-control my-3 bg-dark text-light"
          type="date"
          placeholder="Enter date"
          autoComplete="off"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
        />
        <h3 className="text-light">Value</h3>
        <input
          className="form-control my-3 bg-dark text-light"
          type="text"
          placeholder="Enter value*"
          autoComplete="off"
          name="valor"
          value={form.valor}
          onChange={handleChange}
        />
        <button className="btn btn-success btn-sm w-100 me-2" type="submit">
          {forNewMovie ? "Save" : "Edit"}
        </button>
        <Link legacyBehavior href="/">
          <a className="btn btn-dark w-100 my-2">Back..</a>
        </Link>
        {/* {message.map(({ message }) => (
          <p key={message}>{message}</p>
        ))} */}
      </form>
    </div>
  );
};

export default Form;
