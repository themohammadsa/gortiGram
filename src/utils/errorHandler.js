import axios from 'axios';

function errorHandler(error) {
  if (axios.isAxiosError(error)) {
    const serverError = error;
    if (serverError && serverError.response) {
      return serverError.response.data;
    }
  }
  return {
    success: false,
    message: 'There is something wrong with the server..',
  };
}
export { errorHandler };
