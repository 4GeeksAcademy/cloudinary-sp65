import React, { useState } from 'react';

const SubirImagen = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      
        const formData = new FormData();
        formData.append("img" , selectedFile);

        const response = await fetch ("https://special-barnacle-r4g7prq6wpxqh5xgx-3001.app.github.dev/img", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            setImageUrl(data.img_url);
            console.log("Imagen subida con exito" , data.img_url)
            alert("Subida exitosa")
        } else {
            console.log("Error en la subida de la imagen", response.status, response.statusText)
            alert("Hubo un error al subir la imagen")
        }



    } else {
      alert('Por favor, selecciona un archivo antes de subir.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 display-6 text-center">Subir imagen con Cloudinary</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <input 
            type="file" 
            className="form-control" 
            onChange={handleFileChange} 
            accept="image/*"
          />
        </div>
        <button type="submit" className="btn btn-primary ">Subir imagen</button>
      </form>
      <img src={imageUrl}></img>
    </div>
  );
};

export default SubirImagen;