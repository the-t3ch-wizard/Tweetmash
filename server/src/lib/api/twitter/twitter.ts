import axios from "axios";


export const authenticatedUserLookup = async (authorization_code: string) => {
  
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api.twitter.com/2/users/me',
    headers: {
      'Authorization': authorization_code, 
    }
  };

  const response = await axios.request(config);

  console.log("33 TEST", response);
  
  return response;

}
