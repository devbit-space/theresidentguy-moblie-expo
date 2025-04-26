import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import * as Clipboard from 'expo-clipboard';
import { customAlphabet } from 'nanoid';

export const showToast = (html: string, type: 'info' | 'success' | 'warning' | 'error' | 'default') => {
    Toast.show({
        type: type === 'default' ? 'info' : type,
        text1: html,
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
    });
};

export const ConfirmModal = async (title: string, text?: string, confirmText: string = 'OK') => {
    return new Promise((resolve) => {
        Alert.alert(
            title,
            text || 'Are you sure you want to proceed?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => resolve(false),
                },
                {
                    text: confirmText,
                    style: 'destructive',
                    onPress: () => resolve(true),
                },
            ],
            { cancelable: true }
        );
    });
};

export const currentTime = () => Math.round(+new Date().getTime() / 1e3);

export const emailEllipse = (email: string) => {
    if (!email) return '';
    const p = email.lastIndexOf('@');
    return email.slice(0, 3) + '***@' + (p > 8 ? email.slice(p + 1) : email.slice(-8));
};

export const copyToClipboard = async (text: string) => {
    try {
        await Clipboard.setStringAsync(text);
        showToast('Copied to clipboard!', 'success');
    } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        showToast('Failed to copy to clipboard', 'error');
    }
};

export const slugify = (t: string) => t.toLowerCase().replace(/[ \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]+/g, '_').replace(/_+/g, '_').replace(/^_+|_+$/g, '');

export const sliceText = (text: string, len: number) => {
    if (!text) return '';
    return (text.length > len ? text.slice(0, len) + '...' : text);
};

export const textEllipsis = (text: string = "", start: number = 7, end: number = 5) => {
    if (text.length > (start + end)) {
        return `${text.slice(0, start)}...${end ? text.slice(-1 * end) : ''}`;
    }
    return text;
};

export const strongPasswordValidator = (password: string) => {
    if (!password) {
        return { status: false, msg: 'Password is required' };
    }

    if (password.length < 8) {
        return { status: false, msg: '8 Characters length!' };
    }

    if (!password.match(/[A-Z]/)) {
        return { status: false, msg: 'A letter in upper case!' };
    }

    if (!password.match(/[0-9]/)) {
        return { status: false, msg: 'A numeral (0-9)!' };
    }

    if (!password.match(/[!@#$%^&*()]/)) {
        return { status: false, msg: 'A letter special character!' };
    }
    return { status: true, msg: 'Password is Strong!' };
};

export const emailValidator = (mail: string) => {
    if (!mail) {
        return { status: false, msg: 'Email is required!' };
    }

    if (
        !mail.match(
            /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi
        )
    ) {
        return { status: false, msg: 'Invalid email type!' };
    } else {
        return { status: true, msg: '' };
    }
};

export const passwordMatch = (password: string, conf_password: string) => {
    if (password !== conf_password) {
        return { status: false, msg: 'The Password and Confirm password fields do not match.' };
    }
    return { status: true, message: '' };
};

export const formatToScientific = (number: number, multiplier = 10, decimalPlaces = 2) => {
    return (number * multiplier).toExponential(decimalPlaces);
};

export const getTruncatedNumber = (number: number, decimalPlaces: number): number => {
    if (number === undefined) return 0;
    return Math.floor(number * 10 ** decimalPlaces) / (10 ** decimalPlaces);
};

export const getFormattedDate = (date: number) => {
    return new Date(date * 1000).toLocaleDateString();
};

export const getCaseSensitive = (v: string) => {
    return v.slice(0, 1).toUpperCase() + v.slice(1);
};

const nanoid = customAlphabet(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    10,
);

export function meetingId(length = 12) {
    return nanoid(length);
}