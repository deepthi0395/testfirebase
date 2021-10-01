import { getData } from "../utils/async-storage"
import { categories } from "../services/loginauth"
import React, {useState , useEffect } from 'react';

// import React from 'react'

export default function Home() {
    const [list, setList] = useState([]);
    useEffect(async () => {
        let mounted = true;
        const getToken = await getData("accessToken")
        categories(getToken)
        .then(response => {
            console.log(response)
            const {data} = response
            const {items} = data
            console.log(items)
            if(mounted) {
            setList(items)
            }
        })
        return () => mounted = false;
    }, [])

    return(
        <div className="wrapper">
         <h1>Data</h1>
         <ol>
           {list.map(item => <li key={item.id}>{item.name} : {item.status}</li>)}
         </ol>
       </div>
      )
    


    // const getList =async ()=>{
    //     const getToken = await getData("accessToken")
    //     categories(getToken)
    //     .then((response) => {
    //         console.log(response.json())
    //         const {data} = response 
    //         const {items}  = data 
    //         console.log(items)
    //     })
    //     .catch((error)=>{
    //         console.log(error)
    //     })
    // }

    // return(
    //     <div>
    //     <button onClick={getList}>categories</button>
    //     </div>
    // )
}