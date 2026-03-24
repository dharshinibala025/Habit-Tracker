import React, { createContext, useContext, useState, useEffect } from 'react';

const PWAContext = createContext();

export const usePWA = () => {
    const context = useContext(PWAContext);
    if (!context) {
        throw new Error('usePWA must be used within a PWAProvider');
    }
    return context;
};

export const PWAProvider = ({ children }) => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [canInstall, setCanInstall] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            console.log('PWA: beforeinstallprompt event fired');
            e.preventDefault();
            setDeferredPrompt(e);
            setCanInstall(true);
        };

        const appInstalledHandler = () => {
            console.log('PWA: appinstalled event fired');
            setCanInstall(false);
            setIsInstalled(true);
            setDeferredPrompt(null);
        };

        window.addEventListener('beforeinstallprompt', handler);
        window.addEventListener('appinstalled', appInstalledHandler);

        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
            setIsInstalled(true);
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
            window.removeEventListener('appinstalled', appInstalledHandler);
        };
    }, []);

    const installApp = async () => {
        if (!deferredPrompt) {
            console.warn('PWA: No installation prompt available');
            return;
        }

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`PWA: Installation choice outcome: ${outcome}`);

        if (outcome === 'accepted') {
            setDeferredPrompt(null);
            setCanInstall(false);
        }
        return outcome;
    };

    return (
        <PWAContext.Provider value={{ canInstall, isInstalled, installApp }}>
            {children}
        </PWAContext.Provider>
    );
};
