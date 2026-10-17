import Swal from 'sweetalert2'

export const showSwalToast = (title, text = '', icon = 'success') => {
  return Swal.fire({
    icon,
    title,
    text,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1800,
    timerProgressBar: true,
    customClass: {
      popup: 'shadow-soft rounded-2xl',
    },
  })
}

export const showSwalSuccess = (title, text = '') => Swal.fire({
  icon: 'success',
  title,
  text,
  confirmButtonColor: '#183A2D',
})

export const showSwalError = (title, text = '') => Swal.fire({
  icon: 'error',
  title,
  text,
  confirmButtonColor: '#183A2D',
})
