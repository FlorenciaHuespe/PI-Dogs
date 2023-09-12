import style from "./form.module.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getTemperaments, postBreed } from "../../redux/actions";

const Form = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  const temperaments = useSelector((state) => state.temperaments);
  console.log(temperaments);

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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); //Estado para ocultar la Imagen segun el ancho de la pantalla

  // para saber que propiedad modifica el estado
  const changeHandler = (event) => {
    validate({ ...form, [event.target.name]: event.target.value });

    setForm({ ...form, [event.target.name]: event.target.value });
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
        setShowAlert(true); // Mostrar la alerta si la respuesta es exitosa
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
        }); // Limpiar el formulario después de enviarlo
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert("Error: " + error.response.data.error); // Mostrar un mensaje de alerta si el error es un error 400
        } else {
          console.log(error);
        }
      });
  };

  const selectHandler = (event) => {
    // console.log(event.target.value);

    if (event.target.name === "temperaments") {
      //si el evento esta ocurriendo en el input de temperaments
      if (form.temperaments.includes(event.target.value)) return; // evitamos duplicados
      setForm({
        //setear el estado
        ...form,
        [event.target.name]: [...form[event.target.name], event.target.value], //...form --- evitamos que se pide el estado
      });
    }

    //     &&
    //     !form.temperaments.some((temp) => temp.name === event.target.value)
    //   ) {
    //     const selectedTemperamentName = event.target.value;
    //     const selectedTemperamentID =
    //       event.target.options[event.target.selectedIndex].id;
    //     const newState = { ...form };

    //     newState.temperaments = [
    //       ...newState.temperaments,
    //       { id: selectedTemperamentID, name: selectedTemperamentName },
    //     ];
    //     setErrors(validate(newState));
    //     setForm(newState);
    //   }
  };

  const deleteTemperament = (temperament) => {
    let newTemps = form.temperaments.filter((temp) => temp !== temperament);
    setForm({
      ...form,
      temperaments: newTemps,
    });
    setErrors(
      validate({
        ...form,
        temperaments: newTemps,
      })
    );
  };

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  //USE-EFFECT

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

  useEffect(() => {
    // Agregar un listener para actualizar el estado cuando cambie el ancho de la ventana
    window.addEventListener("resize", updateWindowWidth);

    // Limpieza del listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

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
              min="1"
              max="99"
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
              min="1"
              max="99"
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
              min="1"
              max="99"
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
              min="1"
              max="99"
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
              min="1"
              max="99"
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
              min="1"
              max="99"
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
            <label>Temperaments: </label>
            <select
              name="temperaments"
              onChange={selectHandler}
              defaultValue="Select one or more temperaments"
              className={style.option}
            >
              {temperaments?.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <div className="for-info.cont">
              {form.temperaments.map((tem) => (
                <div className="form-label">
                  <p>{tem}</p>
                </div>
                
              ))}
            </div>
            {errors.temperaments && (
              <p className={style.errors}>{errors.temperaments}</p>
            )}
          </div>

          <br />

          <h4>Selected Temperaments:</h4>
          <div>
            {form.temperaments &&
              form.temperaments.map((temperament) => (
                <button
                  key={temperament.id}
                  onClick={() => deleteTemperament(temperament)}
                  className={style.selectedTemp}
                >
                  {temperament.name}
                </button>
              ))}
          </div>

          <br />

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
      <div
        className={style.imageContainer}
        style={{ display: windowWidth <= 768 ? "none" : "flex" }}
      ></div>
    </div>
  );
};

export default Form;
