import { ReactNode, createContext, useMemo, useReducer } from "react";
import { activityReducer,InitialState,ActivityActions,ActivityState } from "../reducers/activityReducer";
import { categories } from "../data/categories";
import { Activity } from "../types";

//el children son los elementos que seran envueltos por el provider
type ActivityProviderProps = {
    children:ReactNode
}
type ActivityContextProps= {
 state: ActivityState
  dispatch: React.Dispatch<ActivityActions>,
  caloriesConsumed:number
  caloriesBourned:number
  netCalories:number
 categoryName: (category: Activity["category"]) => string[]
  isEmptyActivities: boolean



}
export const ActivityContext = createContext<ActivityContextProps>(null!)

//Proporciona el state y el dispatch a cualquier componente descendiente que lo necesite.
export const ActivityProvider = ({children}:ActivityProviderProps) =>{
  
  const [state, dispatch] = useReducer(activityReducer, InitialState);

//contadores
const caloriesConsumed = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),

    [state.activities]
  );

  const caloriesBourned = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),

    [state.activities]
  );

  const netCalories = useMemo (() => caloriesConsumed - caloriesBourned , [state.activities])

  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),

    [state.activities]
  );

  const isEmptyActivities = useMemo(
    () => state.activities.length === 0,
    [state.activities]
  );


    return (
        <ActivityContext.Provider
        value={{
            state,
            dispatch,
            caloriesConsumed,
            caloriesBourned,
             netCalories,
             categoryName,
             isEmptyActivities
        }}
        >
            
            {children}

        </ActivityContext.Provider>
    )

}