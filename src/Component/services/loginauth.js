import {signInWithEmailAndPassword} from "firebase/auth"
import { authFirebaseService } from '../../firebase';
import axios from "axios"



export const signIn = async (email , password)  => {
    const url = "https://api-uat.tingisha.com/admin-services/api/preauth-check"
    const options = {
        method: 'POST',
        body: JSON.stringify({email : email}),
        headers : {"Content-Type" : "application/json"}
    };
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    return fetchedData;
}
    // if(fetchedData.status !== "BAD_REQUEST"){
    //     console.log("Success")}
    // else{
    //     dataLoaded = fetchedData.message 
    // }
export const signInWithFireBase = async(email , password) =>{ 
    let user = null
    try{
        await signInWithEmailAndPassword(authFirebaseService, email, password)
            .then((userCredential) => {
                user = userCredential 
                // Signed in 
                //const user = userCredential.user;   
                //console.log(`{email} User exist`)
                //alert(`${email} User exist`)
                // console.log(user)
            })
            .catch((error) => {
                console.log(error)     
        });
        }
        catch(e){
            return signIn
        }
        return user
}

    
export const categories = async ( idToken)  => {
        
    const url = "https://api-uat.tingisha.com/admin-services/api/categories"
    const options = {
        method: 'GET',
        headers :{Authorization :  idToken , "Content-Type" : "application/json" , Accept : "application/json"}
    };
    const response = await axios(url, options)
    // console.log(response)
    const fetchedData = await response.data
    // console.log(fetchedData);
    return fetchedData
}

// const url = "https://api-uat.tingisha.com/admin-services/api/preauth-check"
// const options = {
//         method: 'POST',
//         body: JSON.stringify({email : "deepthi0395@gmail.com"}),
//         headers : {"Content-Type" : "application/json"}
//     };
//     fetch(url , options)
//     .then(response => response.json())
            
             