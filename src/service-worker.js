'use strict';

/* eslint-env browser, serviceworker */

importScripts('./scripts/libs/idb-keyval.js');
importScripts('./scripts/analytics-sw.js');

self.analytics.trackingId = 'UA-77119321-2';

self.addEventListener('push', function(event) {
    let notificationTitle = 'CEO SOFTWARE VIETNAM';
    const notificationOptions = {
        body: 'Xin thông báo đây là thông báo thằng chó Dương.',
        icon: './images/logo.png',
        badge: './images/badge-72x72.png',
        tag: 'CEO SOFTWARE VIETNAM',
        data: {
            url: 'https://developers.google.com/web/fundamentals/getting-started/push-notifications/',
        },
    };

    if (event.data) {
        const dataText = event.data.text();
        notificationTitle = 'Received Payload';
        notificationOptions.body = `Push data: '${dataText}'`;
    }

    event.waitUntil(
        Promise.all([
            self.registration.showNotification(
                notificationTitle, notificationOptions),
            self.analytics.trackEvent('push-received'),
        ])
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    let clickResponsePromise = Promise.resolve();
    if (event.notification.data && event.notification.data.url) {
        clickResponsePromise = clients.openWindow(event.notification.data.url);
    }

    event.waitUntil(
        Promise.all([
            clickResponsePromise,
            self.analytics.trackEvent('notification-click'),
        ])
    );
});

self.addEventListener('notificationclose', function(event) {
    event.waitUntil(
        Promise.all([
            self.analytics.trackEvent('notification-close'),
        ])
    );
});