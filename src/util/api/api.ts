const config = {
  url:
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_API_PROD_ENDPOINT
      : process.env.REACT_API_DEV_ENDPOINT,
};

export default class Api {
  
}