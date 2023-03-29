// Dependencies
import axios from "axios";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// API
const BASE_URL =
	process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://api.cloversy.id";

// Firebase web app config
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const messaging = (async () => {
	try {
		const isSupportedBrowser = await isSupported();
		if (isSupportedBrowser) {
			return getMessaging(app);
		}
		console.log("Firebase not supported this browser");
		return null;
	} catch (err) {
		console.log(err);
		return null;
	}
})();

const requestNotificationPermission = async () => {
	console.log("Requesting notification permission...");

	try {
		const permission = await Notification.requestPermission();
		if (permission === "granted") {
			console.log("Notification permission granted!");
		} else if (permission === "denied") {
			console.log("Notification permission denied!");
		}
	} catch (error) {
		console.log(error);
	}
};

export const subscribeToPush = async () => {
	let token = "";
	await requestNotificationPermission();
	const messagingResolve = await messaging;

	if (messagingResolve) {
		try {
			token = await getToken(messagingResolve, {
				vapidKey: process.env.NEXT_PUBLIC_FIREBASE_CONSOLE_VAPID_KEY
			});
		} catch (error) {
			console.log("Error occurred while retrieving token.", error);
		}
	}

	return token;
};

export const unsubscribeFromPush = async (authToken: string) => {
	const subscriptionId = localStorage.getItem("subscriptionId");

	if (subscriptionId) {
		try {
			// Delete saved subscription
			const res = await axios.delete<
				void,
				{
					data: { data: { unsubscribedId: number } };
				}
			>(`${BASE_URL}/subscription/push`, {
				data: { subscriptionId },
				headers: {
					Authorization: `Bearer ${authToken}`,
					"content-type": "application/json"
				},
				withCredentials: true
			});

			// Store subscription id in local storage
			const unsubscribedId = res.data?.data?.unsubscribedId;
			if (unsubscribedId && unsubscribedId.toString() === subscriptionId) {
				localStorage.removeItem("subscriptionId");
			}
		} catch (error) {
			console.log("Error occurred while retrieving token.", error);
		}
	}
};
