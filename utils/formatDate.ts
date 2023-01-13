// Dependencies
import { DateTime } from "luxon";

type StringDate = string;

export const formatDateFull = (str: StringDate) => {
	return DateTime.fromISO(str).setLocale("id").toFormat("dd LLLL yyyy, HH:mm 'WIB'");
};

export const formatDateTimeline = (str: StringDate) => {
	return DateTime.fromISO(str).setLocale("id").toFormat("dd LLL yyyy, HH:mm");
};

export const formatDateStandard = (str: StringDate) => {
	return DateTime.fromISO(str).setLocale("id").toFormat("dd/LL/yyyy");
};

export const formatDateFullMonth = (str: StringDate) => {
	return DateTime.fromISO(str).setLocale("id").toFormat("dd LLL yyyy");
};

export const formatDateStandardWithTime = (str: StringDate) => {
	return DateTime.fromISO(str).setLocale("id").toFormat("dd/LL/yyyy HH:mm 'WIB'");
};

export const formatDateFullWithDay = (str: StringDate) => {
	return DateTime.fromISO(str).setLocale("id").toFormat("cccc, dd LLLL yyyy, HH:mm 'WIB'");
};
