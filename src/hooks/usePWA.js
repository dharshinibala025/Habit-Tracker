import { usePWA as usePWAFromContext } from '../context/PWAContext';

export const usePWA = () => {
    return usePWAFromContext();
};
