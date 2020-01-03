import { useState, useEffect } from 'react';

export default customAxios => {
    const [error, setError] = useState(null);

    // Want to execute before we render our content, so cant use useEffect
    const requestInterceptor = customAxios.interceptors.request.use(req => {
        setError(null);
        return req;
    });

    const responseInterceptor = customAxios.interceptors.response.use(res => res, errorFromFireBase => {
        setError(errorFromFireBase);
    });

    useEffect(() => {
        return () => {
            customAxios.interceptors.request.eject(requestInterceptor);
            customAxios.interceptors.response.eject(responseInterceptor);     
        };
    }, [requestInterceptor, responseInterceptor]);

    const errorConfirmedHandler = () => {
        setError(null);
    };

    return [error, errorConfirmedHandler];
}