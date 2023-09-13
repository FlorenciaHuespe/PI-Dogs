import style from "./form.module.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getTemperaments, postBreed } from "../../redux/actions";

const Form = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const temperaments = useSelector(state => state.temperaments);

  const [form, setForm] = useState({
    name: "",
    image: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    minLifeSpan: "",
    maxLifeSpan: "",
    temperaments: [],
    breed_group: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    minLifeSpan: "",
    maxLifeSpan: "",
    temperaments: "",
    breed_group: "",
  });

  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar u ocultar la alerta
  const [alertTimeout, setAlertTimeout] = useState(null); // Estado para ocultar la alerta
  
const handleDelete = (event) =>{
  setForm({ 
    ...form, 
    [event.target.name]: [...form[event.target.name].filter(t=> t!==event.target.id)]
  })
}

  const changeHandler = (event) => {
if(event.target.name==="temperaments"){
  if(form.temperaments.includes(event.target.value)) return
  setForm({ 
    ...form, 
    [event.target.name]: [...form[event.target.name], event.target.value] 
  });
} else {
    setForm({ ...form, [event.target.name]: event.target.value });
}
    validate({ ...form, [event.target.name]: event.target.value });
  };

  // Validar el formulario
  const validate = (form) => {
    const compiledErrors = {}; // Objeto que contendrá los errores

    if (form.name && !/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{3,15}$/.test(form.name)) {
      compiledErrors.name =
        "Introduzca un nombre utilizando letras de la A a la Z (mínimo 3 caracteres, máximo 15 caracteres)";
    } else {
      compiledErrors.name = "";
    }

    if (form.image && !/\bhttps?:\/\/\S+\.(png|jpe?g)\b/.test(form.image)) {
      compiledErrors.image = "El formato de la URL no es válido";
    } else {
      compiledErrors.image = "";
    }

    if (form.minHeight && !/^[0-9]{1,2}$/.test(form.minHeight)) {
      compiledErrors.minHeight = "Introduce un número (máximo 2 dígitos)";
    } else {
      compiledErrors.minHeight = "";
    }

    if (form.maxHeight && !/^[0-9]{1,2}$/.test(form.maxHeight)) {
      compiledErrors.maxHeight = "Introduce un número (máximo 2 dígitos)";
    } else {
      compiledErrors.maxHeight = "";
    }

    if (form.minWeight && !/^[0-9]{1,2}$/.test(form.minWeight)) {
      compiledErrors.minWeight = "Introduce un número (máximo 2 dígitos)";
    } else {
      compiledErrors.minWeight = "";
    }

    if (form.maxWeight && !/^[0-9]{1,2}$/.test(form.maxWeight)) {
      compiledErrors.maxWeight = "Introduce un número (máximo 2 dígitos)";
    } else {
      compiledErrors.maxWeight = "";
    }

    if (form.minLifeSpan && !/^[0-9]{1,2}$/.test(form.minLifeSpan)) {
      compiledErrors.minLifeSpan = "Introduce un número (máximo 2 dígitos)";
    } else {
      compiledErrors.minLifeSpan = "";
    }

    if (form.maxLifeSpan && !/^[0-9]{1,2}$/.test(form.maxLifeSpan)) {
      compiledErrors.maxLifeSpan = "Introduce un número (máximo 2 dígitos)";
    } else {
      compiledErrors.maxLifeSpan = "";
    }

    if (form.temperaments.length === 0) {
      compiledErrors.temperaments = "Seleccione al menos un temperamento";
    } else {
      compiledErrors.temperaments = "";
    }

    if (!form.breed_group) {
      compiledErrors.breed_group = "Seleccione al menos un grupo";
    } else {
      compiledErrors.breed_group = "";
    }

    setErrors(compiledErrors); // Actualiza el estado de los errores con los errores compilados
  };

  const submitHandler = (event) => {
  
    event.preventDefault();
 
    dispatch(postBreed(form));
    

    const response = axios
    .post("http://localhost:3001/dogs", {
      ...form,
      temperaments: form.temperaments.map((temp) => temp.id),
    })
    .then((res) => {
      setShowAlert(true);
      
      // Aquí deberías asegurarte de que los valores del formulario se establezcan en su estado inicial
      setForm({
        name: "",
        image: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        minLifeSpan: "",
        maxLifeSpan: "",
        temperaments: [],
        breed_group: "",
      });
      
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        alert("Error: " + error.response.data.error);
      } else {
        console.log(error);
      }
    });
   
  };


  useEffect(() => {
    // Ocultar el alerta después de 3 segundos
    if (showAlert) {
      setAlertTimeout(
        setTimeout(() => {
          setShowAlert(false);
        }, 3000)
      );
    }
    // Limpiar el tiempo de espera del alerta cuando se desmonta el componente
    return () => {
      clearTimeout(alertTimeout);
    };
  }, [showAlert]);


  return (
    <div className={style.container}>
      <form className={style.formContainer} onSubmit={submitHandler}>
        <div className={style.form}>
          <h2 className={style.heading}>New breed</h2>
          {showAlert && ( // Mostrar la alerta si showAlert es verdadero
            <h4 className={style.alert}>La raza fue creada exitosamente </h4>
          )}
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={form.name}
              onChange={changeHandler}
              name="name"
              placeholder="Insert Name"
              className={style.input}
            />
            {errors.name && <span className={style.error}>{errors.name}</span>}
          </div>
          <div>
            <label>Image: </label>
            <input
              type="url"
              value={form.image}
              onChange={changeHandler}
              name="image"
              placeholder="Insert URL Image"
              className={style.input}
            />
            {errors.image && (
              <span className={style.error}>{errors.image}</span>
            )}
          </div>
          <div>
            <label>Min Height: </label>
            <input
              type="text"
              value={form.minHeight}
              onChange={changeHandler}
              name="minHeight"
              placeholder="Insert Min Height"
              className={style.input}
            />
            {errors.minHeight && (
              <span className={style.error}>{errors.minHeight}</span>
            )}
          </div>
          <div>
            <label>Max Height: </label>
            <input
              type="text"
              value={form.maxHeight}
              onChange={changeHandler}
              name="maxHeight"
              placeholder="Insert Max Height"
              className={style.input}
            />
            {errors.minHeight && (
              <span className={style.error}>{errors.minHeight}</span>
            )}
          </div>
          <div>
            <label>Min Weight: </label>
            <input
              type="text"
              value={form.minWeight}
              onChange={changeHandler}
              name="minWeight"
              placeholder="Insert Min Weight"
              className={style.input}
            />
            {errors.minWeight && (
              <span className={style.error}>{errors.minWeight}</span>
            )}
          </div>
          <div>
            <label>Max Weight: </label>
            <input
              type="text"
              value={form.maxWeight}
              onChange={changeHandler}
              name="maxWeight"
              placeholder="Insert Max Weight"
              className={style.input}
            />
            {errors.maxWeight && (
              <span className={style.error}>{errors.maxWeight}</span>
            )}
          </div>
          <div>
            <label>Min Life Span: </label>
            <input
              type="text"
              value={form.minLifeSpan}
              onChange={changeHandler}
              name="minLifeSpan"
              placeholder="Insert Min LifeSpan"
              className={style.input}
            />
            {errors.minLifeSpan && (
              <span className={style.error}>{errors.minLifeSpan}</span>
            )}
          </div>
          <div>
            <label>Max Life Span: </label>
            <input
              type="text"
              value={form.maxLifeSpan}
              onChange={changeHandler}
              name="maxLifeSpan"
              placeholder="Insert Max LifeSpan"
              className={style.input}
            />
            {errors.maxLifeSpan && (
              <span className={style.error}>{errors.maxLifeSpan}</span>
            )}
          </div>
          <div>
            <label>Breed Group: </label>
            <input
              type="text"
              value={form.breed_group}
              onChange={changeHandler}
              name="breed_group"
              placeholder="Small, medium or large"
              className={style.input}
            />
            {errors.breed_group && (
              <span className={style.error}>{errors.breed_group}</span>
            )}
          </div>
          <div>
            <label>Temperaments:</label>
            <select onChange={changeHandler} name="temperaments">
           {temperaments.map((t)=> <option className={style.option} value={t} key={t}>{t}</option> )}
            </select>
          </div>
          <div>
           { form.temperaments.map((t) => <div className={style.option}><label>{t}</label> <button name="temperaments" id={t} onClick={handleDelete}>X</button>
           </div>)}
          </div>

             <button
            type="submit"
            disabled={
              !form.name ||
              !form.image ||
              !form.minHeight ||
              !form.maxHeight ||
              !form.minWeight ||
              !form.maxWeight ||
              !form.minLifeSpan ||
              !form.maxLifeSpan ||
              !form.temperaments.length
            }
            className={style.button}
          >
            Create
          </button>
        </div>
      </form>
     
    </div>
  );
};

export default Form;
