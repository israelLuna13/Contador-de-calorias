import CalorieDisplay from "./CalorieDisplay";
import { useActivity } from "../hooks/useActivity";
function CalorieTracker() {

const {caloriesConsumed,caloriesBourned,netCalories} = useActivity()
  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de calorias
      </h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay calories={caloriesConsumed} text="Consumidas" />

        <CalorieDisplay calories={caloriesBourned} text="Ejercicio" />

        <CalorieDisplay calories={netCalories} text="Diferencia" />

      </div>
    </>
  );
}

export default CalorieTracker;
