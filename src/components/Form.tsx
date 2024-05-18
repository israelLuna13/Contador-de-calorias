import { categories } from "../data/categories";
import { v4 as uuidv4 } from "uuid";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Activity } from "../types";
import { useActivity } from "../hooks/useActivity";
//tipo de dato del dispach , el pasar entre componentes el dispatch pierde su tipo de dato


//estado inicial del state
const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};
function Form() {
  const{state,dispatch} = useActivity()
  const [activity, setActivity] = useState<Activity>(initialState);

  //se estara ejecutando todo el tiempo
  //tomamos el id de la actividad que se esta seleccionando para editar
  useEffect(() => {
    if (state.activeId) {
      //tomamos el objeto que se esta seleccionando
      const selectActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];
      setActivity(selectActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    //me regresa un true si se escogieron categorias o calorias
    const isNumberField = ["category", "calories"].includes(e.target.id);

    //si es true convertimos a entero
    //ponemos en el activity lo que ya tenia + lo nuevo que se selecciono
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
    // console.log(e.target.id)
    // console.log(e.target.value)
  };

  //devuelve true si se cumple la condicion
  //validamos que los campos de actividad y calorias no esten vacios
  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //accion a ejecutar     //informacion del activity
    dispatch({ type: "save-activity", payload: { newActivity: activity } });

    //reiniciamos el form
    //le pasamos un id nuevo , tomamos lo que ya tiene el state y le agregamos un id
    setActivity({ ...initialState, id: uuidv4() });
  };

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoria:
        </label>
        <select
          id="category"
          className=" border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Juego de Naranja, Ensalada , Ejercicio"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias:
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorias. ej. 300 o 500 "
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 fonr-bold uppercase text-white 
        cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        disabled={!isValidActivity()}
      />
    </form>
  );
}
export default Form;
