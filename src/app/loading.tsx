import React from 'react'
import { PropagateLoader } from "react-spinners";
export default function loading() {
  return (<>
<div className='flex h-screen justify-center items-center'>
    

<PropagateLoader color="#0AAD0A" />
</div>
</>
  )
}
