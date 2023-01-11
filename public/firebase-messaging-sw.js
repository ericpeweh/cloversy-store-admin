// Handle notification actions button click
self.addEventListener("notificationclick", event => {
	// Close notification
	event.notification.close();

	if (event.action === "ignore") return;
	s;

	// If event action exist
	if (event.action) {
		event.waitUntil(
			clients
				.matchAll({
					type: "window"
				})
				.then(clientList => {
					// Focus to event.action page
					for (const client of clientList) {
						if (client.url === event.action && "focus" in client) {
							return client.focus();
						}
					}

					// Open new window of event.action page
					if (clients.openWindow) {
						return clients.openWindow(event.action);
					}
				})
		);
	}
});

// Dependencies
importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js");

// Firebase web app config
const firebaseConfig = {
	apiKey: "AIzaSyDW-NV3M7RM7rPkupVaBLrfdJ2RzYXja4s",
	authDomain: "cloversy-store-app.firebaseapp.com",
	projectId: "cloversy-store-app",
	storageBucket: "cloversy-store-app.appspot.com",
	messagingSenderId: "54423763051",
	appId: "1:54423763051:web:806b8ecf988c446a70992e",
	measurementId: "G-NQK1PJR6W6"
};

firebase.initializeApp(firebaseConfig);

const isSupported = firebase.messaging.isSupported();
if (isSupported) {
	const messaging = firebase.messaging();

	messaging.onBackgroundMessage(payload => {
		const { data } = payload;

		let notificationOptions;
		if (data?.body) {
			notificationOptions = {
				body: data?.body || "Pesan tidak tersedia.",
				icon: data?.imageUrl || "/images/logo-square.jpg"
			};
		}

		if (data?.actionLink) {
			const actions = [
				{
					title: "Tutup",
					type: "button",
					action: "ignore"
				},
				{
					title: data?.actionTitle || "Detail",
					action: data?.actionLink,
					type: "button"
				}
			];

			notificationOptions.actions = actions;
		}

		const notificationTitle = data?.title || "Pemberitahuan";

		self.registration.showNotification(notificationTitle, notificationOptions);
	});
} else {
	console.log("Firebase not supported.");
}
