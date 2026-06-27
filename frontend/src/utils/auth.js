export const saveTokens = (tokenPair) => {
    localStorage.setItem('access_token', tokenPair.access);
    localStorage.setItem('refresh_token', tokenPair.refresh);
};

export const clearTokens = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

export const getAccessToken = () => {
    return localStorage.getItem('access_token');
};

export const authFetch = (url, options = {}) => {
    const accessToken = getAccessToken();
    const headers = options.headers ? { ...options.headers } : {};

    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
    }

    if (!headers['Content-Type'] && !headers['content-type']) {
        headers['Content-Type'] = 'application/json';
    }

    return fetch(url, { ...options, headers });
};
