// import style from "./Detail.module.css";
// import axios from "axios";
// import { useParams, useHistory  } from "react-router-dom";
// import { useState, useEffect } from "react";
// import imageArrow from "../../../assets/goBack.png";
// import imgLP from "../../../assets/lifeSpan.png";
// import imgW from "../../../assets/weight.png";
// import imgH from "../../../assets/height.png";
// import imgTemp from "../../../assets/temp.png";
// import imgBG from "../../../assets/breedGroup.png";
// import ReactLoading from "react-loading"; 


const Detail = () => {
//   const { id } = useParams();
  
//   const history = useHistory();

//   const [breed, setBreed] = useState({});

//   const [loading, setLoading] = useState(true);

//useEffect(() => { //cuando se monte home, quiero ejectutar el dispatch
//dispatch(cleanDetails()); // despacho la function de action
// },[]);

//   useEffect(() => {
//     const endpoint = `http://localhost:3001/dogs/${id}`;
//     axios
//       .get(endpoint)
//       .then(({ data }) => {
//         if (data[0].name) {
//           setBreed(data[0]);
//         } else {
//           window.alert("Breed not found");
//         }
//       })
//       .catch((error) => {
//         console.log(error.message);
//         window.alert("Error getting breed data");
//       })
//       .finally(() => {
//         setLoading(false); // Finalmente, independientemente de si hubo éxito o error, establece loading en false
//       });
//   }, [id]);

//   function handleClick() {
//     navigate(-1);
//   }

//   return (
//     <div className={style.contenedorPadre}>
//       <div className={style.container1}>
//         <div className={style.containerName}>
//           <div onClick={handleClick} className={style.buttonBack}>
//             <img src={imageArrow} alt="arrow" className={style.arrow} />
//           </div>
//           <h1 className={style.name}>{breed.name}</h1>
//         </div>

//         <div className={style.container2}>
//         <div className={style.imageContainer}>
//         {/* Mostrar el componente de carga mientras loading es true */}
//         {loading ? (
//           <ReactLoading type={"spin"} color={"#1594cbc1"} height={50} width={50} />
//         ) : (
//           <img src={breed.image} alt="Dog" className={style.image} />
//         )}
//       </div>

//           <div className={style.infoContainer}>
//             <h2 className={style.characteristic1}>Breed characteristics</h2>

//             <div className={style.characteristicContainer}>
//               <p>
//                 <div className={style.characteristic}>
//                   <img src={imgH} alt="weight" className={style.img} /> Height:{" "}
//                 </div>
//                 {breed.minHeight && breed.maxHeight
//                   ? `${breed.minHeight} - ${breed.maxHeight} cm`
//                   : breed.minHeight
//                   ? `${breed.minHeight} cm`
//                   : breed.maxHeight
//                   ? `${breed.maxHeight} cm`
//                   : "N/A"}
//               </p>

//               <p>
//                 <div className={style.characteristic}>
//                   <img src={imgW} alt="weight" className={style.img} /> Weight:
//                 </div>
//                 {breed.minWeight && breed.maxWeight
//                   ? `${breed.minWeight} - ${breed.maxWeight} kg`
//                   : breed.minWeight
//                   ? `${breed.minWeight} kg`
//                   : breed.maxWeight
//                   ? `${breed.maxWeight} kg`
//                   : "N/A"}
//               </p>

//               <p>
//                 <div className={style.characteristic}>
//                   <img src={imgLP} alt="weight" className={style.img} /> Life
//                   Span:{" "}
//                 </div>
//                 {breed.minLifeSpan && breed.maxLifeSpan
//                   ? `${breed.minLifeSpan} - ${breed.maxLifeSpan} years`
//                   : breed.minLifeSpan
//                   ? `${breed.minLifeSpan} years`
//                   : breed.maxLifeSpan
//                   ? `${breed.maxLifeSpan} years`
//                   : "N/A"}
//               </p>

//               <p>
//                 <div className={style.characteristic}>
//                   <img src={imgBG} alt="weight" className={style.img} /> Breed
//                   Group:{" "}
//                 </div>
//                 {breed.breed_group ? `${breed.breed_group}` : "N/A"}
//               </p>
//               {breed.temperaments ? (
//                 <p>
//                   <div className={style.characteristic}>
//                     <img src={imgTemp} alt="weight" className={style.img} />{" "}
//                     Temperaments:{" "}
//                   </div>
//                   {breed.Temperament?.join(", ")}
//                 </p>
//               ) : (
//                 <p>
//                   <div className={style.characteristic}>
//                     <img src={imgTemp} alt="weight" className={style.img} />{" "}
//                     Temperaments:
//                   </div>
//                   {breed.Temperaments?.join(", ")}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
  //);
};

export default Detail;