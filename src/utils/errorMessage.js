import Swal from "sweetalert2";

export const errorMessage = (message) =>{
    Swal.fire({
        icon: 'error',
        title: 'An unexpected error has occurred',
        text: message,
    });
}