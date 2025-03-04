import { useCookie } from '#app';
import { useFetch } from '#imports';

export const useAuth = () => {
    const token = useCookie<string | null>('token', { default: () => null });
    const isAuthenticated = computed(() => !!token.value);

    return { token, isAuthenticated };
};