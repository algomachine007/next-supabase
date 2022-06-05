import { toast } from "react-toastify";

const toaster = () => {
  return toast(`Success`, {
    type: `success`,
    position: "top-center",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export default toaster;
