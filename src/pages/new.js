import Form from "@/components/Form";

const New = () => {
  
    const formData = {
      concepto:'',
      cuenta:'',
      detalle:'',
      fecha:'',
      valor:'',
    }

  return (
    <div className="container">
      <h1 className="my-3">Add note</h1>
      <Form formData={formData}/>
    </div>
  );
};

export default New;
