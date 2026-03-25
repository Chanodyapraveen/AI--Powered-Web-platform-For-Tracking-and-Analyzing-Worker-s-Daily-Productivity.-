import Swal from "sweetalert2";

const toastBase = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
});

export const Sweet = {
  fire: (options) => Swal.fire(options),

  success: (message, title = "Success") =>
    Swal.fire({
      icon: "success",
      title,
      text: message,
      confirmButtonColor: "#16a34a",
    }),

  error: (message, title = "Error") =>
    Swal.fire({
      icon: "error",
      title,
      text: message,
      confirmButtonColor: "#dc2626",
    }),

  info: (message, title = "Info") =>
    Swal.fire({
      icon: "info",
      title,
      text: message,
      confirmButtonColor: "#2563eb",
    }),

  warn: (message, title = "Warning") =>
    Swal.fire({
      icon: "warning",
      title,
      text: message,
      confirmButtonColor: "#d97706",
    }),

  confirm: async (message, title = "Confirm") => {
    const result = await Swal.fire({
      icon: "question",
      title,
      text: message,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
    });

    return result.isConfirmed;
  },
};

export const Toast = {
  success: (message) => toastBase.fire({ icon: "success", title: message }),
  error: (message) => toastBase.fire({ icon: "error", title: message }),
  info: (message) => toastBase.fire({ icon: "info", title: message }),
  warn: (message) => toastBase.fire({ icon: "warning", title: message }),
};
