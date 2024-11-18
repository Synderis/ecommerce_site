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