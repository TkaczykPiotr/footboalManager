import React, { useState } from 'react';


function Engine() {
    const  [a , setA] = useState([{name: 1, beim: 2},{name: 3, beim: 4},{name: 5, beim: 6},{name: 7, beim: 8},{name: 9, beim: 10}])
    const  [b , setB] = useState([6,7,8,9,10])

    const ab = () => {
            a.map(t => <h2>{t.name}</h2> )
    }

return(
    <>



    </>
)
}

export default Engine;