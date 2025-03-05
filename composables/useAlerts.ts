import Swal from 'sweetalert2'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export function useAlerts() {

    const normalToast = (message: string) => {
        toast(message, {
            position: 'top-right',
            autoClose: 10000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'light',
        })
    }

    // عرض إشعار نجاح باستخدام Vue3-Toastify
    const successToast = (message: string) => {
        toast.success(message, {
            position: 'top-right',
            autoClose: 10000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'light',
        })
    }

    // عرض إشعار خطأ باستخدام Vue3-Toastify
    const errorToast = (message: string) => {
        toast.error(message, {
            position: 'top-right',
            autoClose: 10000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'light',
        })
    }

    // نافذة تأكيد SweetAlert2
    const confirmAlert = async (title: string, text: string) => {
        const result = await Swal.fire({
            title,
            text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'نعم',
            cancelButtonText: 'إلغاء',
        })
        return result.isConfirmed
    }

    // نافذة نجاح SweetAlert2
    const successAlert = (title: string, text: string) => {
        Swal.fire({
            title,
            text,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
        })
    }

    // نافذة خطأ SweetAlert2
    const errorAlert = (title: string, text: string) => {
        Swal.fire({
            title,
            text,
            icon: 'error',
            timer: 2000,
            showConfirmButton: false,
        })
    }

    return {
        normalToast,
        successToast,
        errorToast,
        confirmAlert,
        successAlert,
        errorAlert,
    }
}
