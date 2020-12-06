import './App.scss';
import { useEffect, useState } from 'react';
import { API, API_URL } from './services/API_Service';
import { MdAdd, MdCheck, MdClose, MdDelete, MdEdit } from 'react-icons/md';
import Modal from 'react-modal';
import FloatInput from './components/FloatInput/floatinput';
import ImageUploader from './components/ImageUploader/imageuploader';

//Set Modal to root element
Modal.setAppElement('#root')

function App() {
  const [toys, setToys] = useState([]);
  const [modalIsOpen,setIsOpen] = useState(false);
  const [modalTitle,setModalTitle] = useState("");
  const [name,setName] = useState("");
  const [price,setPrice] = useState("");
  const [description,setDescription] = useState("");
  const [img,setImg] = useState("");
  const [selectedToy,setSelectedToy] = useState(null);
  const [deleting,setDeleting] = useState(false);

  useEffect(() => {
    getAllToys();
  }, []);

  //Modal functions
  const openModal = (title, toy) => {
    setModalTitle(title);
    switch (title) {
      case "Crear Juguete":
        setSelectedToy(null);
        setDeleting(false);
      break;
      case "Editar Juguete":
        setSelectedToy(toy);
        setDeleting(false);
      break;
      case "Borrar Juguete":
        setSelectedToy(toy)
        setDeleting(true);
      break;
      default:
        break;
    }
    setIsOpen(true);
  }

  const closeModal = () => {
    resetInputStates();
    setIsOpen(false);
  }

  //Fetch
  const getAllToys = () => {
    API.get('toy')
    .then(response => {
      setToys(response.data);
    })
  }

  const resetInputStates = () => {
    setName("");
    setDescription("");
    setPrice("");
    setImg(null);
  }

  //Submit Handle
  const handleSubmitButton = () => {
    const form = new FormData();
    if(deleting){
      API.delete("toy",{ params: { id: selectedToy.id}})
      .then(response => {
        getAllToys();
        closeModal();
      })
    }else if(selectedToy){
      name!==""&&form.append('name', name);
      description!==""&&form.append('description', description);
      price!==""&&form.append('price', parseFloat(price));
      img&&form.append('img', img);
      API.put("toy",form,{ params: { id: selectedToy.id}})
      .then(response => {
        getAllToys();
        closeModal();
      })
    }else{
      form.append('name', name);
      form.append('description', description);
      form.append('price', parseFloat(price));
      form.append('img', img);
      API.post("toy",form)
      .then(response => {
        getAllToys();
        closeModal();
      })
    }
  }

  return (
    <div className="App">
      <div className="nav-header">
        <div className="nav-content">
          <img className="mainlogo grid-item" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMzUuMDE0IiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIwIDAgMTM1LjAxNCAzMiI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2VmMDt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImEiIGQ9Ik05NDY5Ljc3NiwzODUzLjc5NGE5LjA0Niw5LjA0NiwwLDEsMCw5LjA0NSw5LjA0NkE5LjA0Niw5LjA0NiwwLDAsMCw5NDY5Ljc3NiwzODUzLjc5NFptMCwxMy4yMjlhNC4xODMsNC4xODMsMCwxLDEsNC4xODMtNC4xODNBNC4xODIsNC4xODIsMCwwLDEsOTQ2OS43NzYsMzg2Ny4wMjNabS00MS4xMTMtMTMuMjI5YTkuMDQ2LDkuMDQ2LDAsMSwwLDkuMDQ2LDkuMDQ2QTkuMDQ2LDkuMDQ2LDAsMCwwLDk0MjguNjYzLDM4NTMuNzk0Wm0wLDEzLjIyOWE0LjE4Myw0LjE4MywwLDEsMSw0LjE4My00LjE4M0E0LjE4Miw0LjE4MiwwLDAsMSw5NDI4LjY2MywzODY3LjAyM1ptLTIwLjYtMTMuMjI3YTkuMTg4LDkuMTg4LDAsMCwwLTkuMjIzLDkuMjIzdjYuNDM2YTIuNDMxLDIuNDMxLDAsMSwwLDQuODYxLDB2LTYuNTE0YTQuMjQ5LDQuMjQ5LDAsMCwxLDQuMDMxLTQuMjgsNC4xODMsNC4xODMsMCwwLDEsNC4zMzUsNC4xOHY2LjYxNGEyLjQzMiwyLjQzMiwwLDAsMCw0Ljg2Mywwdi02LjYxNEE5LjA0NSw5LjA0NSwwLDAsMCw5NDA4LjA2NCwzODUzLjhabS0xNC40NjYsMGEyLjQzMiwyLjQzMiwwLDAsMC0yLjQzMSwyLjQzMXY2LjUxNGE0LjI0OCw0LjI0OCwwLDAsMS00LjAyOSw0LjI4LDQuMTg0LDQuMTg0LDAsMCwxLTQuMzM2LTQuMTh2LTYuNjE0YTIuNDMxLDIuNDMxLDAsMSwwLTQuODYyLDB2Ni42MTRhOS4wNDUsOS4wNDUsMCwwLDAsOC44NjgsOS4wNDQsOC43ODcsOC43ODcsMCwwLDAsNC4zNTktMS4wNnYxLjA2MmE0LjE4NCw0LjE4NCwwLDAsMS03LjE0MiwyLjk1OGgwYTIuNDMxLDIuNDMxLDAsMCwwLTMuNDM3LDMuNDM5LDkuMDQ2LDkuMDQ2LDAsMCwwLDE1LjQ0Mi02LjRoMHYtMTUuNjZBMi40MzEsMi40MzEsMCwwLDAsOTM5My42LDM4NTMuNzk0Wm02Mi4yMjksMGEyLjQzMiwyLjQzMiwwLDAsMC0yLjQzMiwyLjQzMnYzLjgxNGE0LjY3OCw0LjY3OCwwLDEsMS04LjM2NCwwdi0zLjgxNGEyLjQzMiwyLjQzMiwwLDAsMC00Ljg2NCwwdjMuODE0YTEyLjQ2NywxMi40NjcsMCwwLDAsOC4yMjIsMTEuNywyLjQyOSwyLjQyOSwwLDAsMCwxLjY0OSwwLDEyLjQ2OSwxMi40NjksMCwwLDAsOC4yMjEtMTEuN3YtMy44MTRBMi40MzEsMi40MzEsMCwwLDAsOTQ1NS44MjgsMzg1My43OTRaTTkzNTEuNjYsMzg2Ni41MWExLjc1MSwxLjc1MSwwLDAsMS0yLjk4OS0xLjIzOHYtNi4wMjloNGEyLjQzMiwyLjQzMiwwLDAsMCwwLTQuODY0aC00di0zLjAxNmEyLjQzMiwyLjQzMiwwLDEsMC00Ljg2MywwdjEzLjkwOWE2LjYxNCw2LjYxNCwwLDAsMCwxMS4yOTEsNC42NzdoMGEyLjQzMSwyLjQzMSwwLDAsMC0zLjQzOC0zLjQzOFptMTQuNjEzLTEyLjcxNmE5LjA0Niw5LjA0NiwwLDEsMCw5LjA0Nyw5LjA0NkE5LjA0Nyw5LjA0NywwLDAsMCw5MzY2LjI3MywzODUzLjc5NFptMCwxMy4yMjlhNC4xODMsNC4xODMsMCwxLDEsNC4xODQtNC4xODNBNC4xODIsNC4xODIsMCwwLDEsOTM2Ni4yNzMsMzg2Ny4wMjNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOTM0My44MDggLTM4NDguOTMxKSIvPjwvc3ZnPg==" alt="logo"></img>
        </div>
      </div>
      <header className="App-main">
        <h2>Juguetes</h2>
        <div className="addToyButton" onClick={()=>openModal("Crear Juguete")}>
          <MdAdd size={20} className="add-icon"/>
          <span>Agregar Juguete</span>
        </div>
        {toys.length>0?
          <table className="toys-table">
            <tbody>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th className="center">Imagen</th>
                <th className="center">Acciones</th>
              </tr>
              {toys.map(toy=>(
                <tr key={toy.id}>
                  <td>{toy.name}</td>
                  <td>{toy.description}</td>
                  <td>{toy.price}</td>
                  <td style={{width: "100px"}}>
                    <img style={{maxHeight:"50px", width: "100%", objectFit: "contain"}} src={API_URL+"toy/"+toy.img} alt="error"/>
                  </td>
                  <td style={{width: "160px"}}>
                    <div className="actions">
                      <div className="actionButton editar" onClick={()=>openModal("Editar Juguete", toy)}>
                        <MdEdit size={20} />
                        <span>Editar</span>
                      </div>
                      <div className="actionButton delete" onClick={()=>openModal("Borrar Juguete", toy)}>
                        <MdDelete size={20} />
                        <span>Borrar</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        :
          <h3>No hay registros que mostrar</h3>
        }
        
      </header>
      <Modal 
        isOpen={modalIsOpen}
        contentLabel="onRequestClose Example"
        className="Modal"
        overlayClassName="Overlay"
      >
        {/* Close Icon */}
        <div className="close" onClick={closeModal}>
          <MdClose size={25}/>
        </div>
        {/* Modal Content */}
        <h2>{modalTitle}</h2>
        {!deleting?
          <>
            <FloatInput
              label="Nombre"
              defaultValue={selectedToy?.name}
              onChange={(text)=>setName(text)}
            />
            <FloatInput
              label="Descripción"
              rows={5}
              defaultValue={selectedToy?.description}
              onChange={(text)=>setDescription(text)}
            />
            <FloatInput
              label="Precio (COP)"
              defaultValue={selectedToy?.price}
              onChange={(text)=>setPrice(text)}
            />
            <ImageUploader 
              imgUrl={selectedToy?API_URL+"toy/"+selectedToy.img:null}
              setParentImg={setImg}
            />
          </>
        :
          <span>{"Seguro quiere eliminar el juguete "+selectedToy?.name+"?"}</span>
        }
        
        <div className="submitButton" onClick={handleSubmitButton}>
          {deleting?
            <MdDelete size={20}/>
          :
            <MdCheck size={20}/>
          }
          <span className="labelText">{deleting?"Eliminar":"Aceptar"}</span>
        </div>
      </Modal>
    </div>
  );
}

export default App;
