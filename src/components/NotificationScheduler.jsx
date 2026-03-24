import React, { useEffect, useRef } from 'react';

/**
 * NotificationScheduler
 * A non-rendering component that manages periodic checks for habit reminders.
 */
const NotificationScheduler = ({ user }) => {
    const lastNotifiedMinute = useRef(null);

    useEffect(() => {
        if (!user || !user.reminderTimes || user.reminderTimes.length === 0) return;

        // Check every 30 seconds to catch the minute transitions reliably
        const interval = setInterval(() => {
            checkReminders();
        }, 30000);

        // Initial check
        checkReminders();

        return () => clearInterval(interval);
    }, [user?.reminderTimes, user?.notificationPreferences]);

    const checkReminders = () => {
        if (!user || !user.reminderTimes) return;

        // Skip if push notifications are disabled in preferences
        if (user.notificationPreferences?.push === false) {
            return;
        }

        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const currentMinuteString = `${hrs}:${mins}`;

        // Avoid notifying twice in the same minute
        if (lastNotifiedMinute.current === currentMinuteString) return;

        // Log for transparency
        console.log(`[NotificationScheduler] Checking at ${currentMinuteString}. Active reminders:`, user.reminderTimes);

        // Check if current time matches any of the user's reminder times
        const isTimeForReminder = user.reminderTimes.includes(currentMinuteString);

        if (isTimeForReminder) {
            console.log(`[NotificationScheduler] HIT! Triggering reminder for ${currentMinuteString}`);
            triggerNotification();

            // Add in-app notification
            if (addNotification) {
                addNotification(
                    "It's time to check your habits in HabitFlow!",
                    'reminder',
                    'Daily Habit Reminder'
                );
            }

            lastNotifiedMinute.current = currentMinuteString;
        }
    };

    const triggerNotification = async () => {
        if (!('Notification' in window)) return;

        if (Notification.permission === 'granted') {
            new Notification('Habit Reminder!', {
                body: "It's time to check your habits in HabitFlow!",
                icon: '/vite.svg',
                badge: '/vite.svg',
                vibrate: [200, 100, 200]
            });
        } else if (Notification.permission !== 'denied') {
            // Permission not handled here normally, should be requested in Settings
            console.warn('Notification permission not granted for scheduler.');
        }
    };

    return null; // This component doesn't render anything
};

export default NotificationScheduler;
