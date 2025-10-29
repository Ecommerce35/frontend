import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Toast(icon, title, text) {
    const Toast = Swal.mixin({
        // toast: true,
        // position: "top",
        // showConfirmButton: false,
        // timerProgressBar: true,
    });

    return Toast.fire({
        icon: icon,
        title: title,
        text: text,
        // footer: 

    });
}

export default Toast;
