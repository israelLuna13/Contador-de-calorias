import React from 'react'
import { Activity } from '../types'

type CalorieTrackerProps={
 activities: Activity[]

}
function CalorieTracker({activities}:CalorieTrackerProps ) {
  return (

    <>
    <h2 className='text-4xl font-black text-white text-center'>Resumen de calorias</h2>
    </>
  )
}

export default CalorieTracker