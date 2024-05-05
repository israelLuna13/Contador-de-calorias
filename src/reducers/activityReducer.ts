import { Activity } from "../types"

//acciiones que va a ejecutar el dispatch
//payload es la informacion que se le pasa a la accion
export type ActivityActions = {
    type:'save-activity',payload:{newActivity:Activity}
}

type ActivityState={
    activities :Activity[]
}

//inicializamos el estado, sera un estado de actividades, tipo de ejercicio, calorias etc
export const InitialState:ActivityState = {
activities:[]


}
//esto sera mandado llamar por el dispatch
export const activityReducer = (

    state:ActivityState = InitialState,
    action:ActivityActions
)=>{

    //determinar que accion se va a ejecutar
    if(action.type === 'save-activity'){

        //este codigo maneja la logica para actualizar el state
        //con el action.payload recuperamos los datos de form
        return{
            ...state,activities:[...state.activities,action.payload.newActivity]
        }
    }


    return state
}