import jwt_decode from "jwt-decode";
import axios from 'axios';
const url = "https://brain-beats-server-docker.azurewebsites.net";

export const ValidateAndRegenerateAccessToken = () => {
  let jwt = localStorage.getItem('accessToken');

  if (jwt != null) {
    let jwtDecoded: any = jwt_decode(jwt);

    // Generate new access token every 30 minutes
    if (Date.now() / 1000 + 1800 >= jwtDecoded.exp) {
      const data = {
        refreshToken: localStorage.getItem('refreshToken')
      };
      
      axios.post(url + '/api/user/refresh_token', data)
      .then((res) => {
        // Update new access token
        localStorage.setItem('accessToken', res.data.access_token);
      }).catch((err) => {
        // console.log(err);
      });
    }
  }
}

