import axios from "axios";

export const getApiData = async (FormData,url) =>{
    
    

    const {
         data 
      } = await axios.post(url,FormData,{
            headers:{
                'accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        });
        
        return data;

}
     

