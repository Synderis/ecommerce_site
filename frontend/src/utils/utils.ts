// import exp from 'constants';
import { useMediaQuery } from 'react-responsive';

export function truncate(str: string, length: number): string {
    return str.length > length ? str.substring(0, length) + '...' : str;
}

export function useIsLargeScreen() {
    const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });
    return isLargeScreen
}
// export const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

// export const token = localStorage.getItem('token');

export const themeToggle = document.getElementById('theme-toggle');

// export const api_url = `http://localhost:8000`;
export const api_url = `${window.location.hostname !== 'localhost' ? 'https:' : 'http:'}//${window.location.hostname !== 'localhost' ? 'api.' : ''}${window.location.hostname}${window.location.hostname === 'localhost' ? ':8000' : ''}`;

// export const local_url = `http://localhost:3000`;
export const local_url = `https://${window.location.hostname}${window.location.hostname === 'localhost' ? ':3000' : ''}`;

export const s3_bucket_url = 'https://vfjujjiyruqjgjkbdedu.supabase.co/storage/v1/object/public/supercrazychick-assets/product_images';