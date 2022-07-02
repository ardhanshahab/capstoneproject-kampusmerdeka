import Cookies from 'js-cookie';

export default function(context) {
    context.$axios.onRequest(config => {
        if (Cookies.get('t')) {
            config.headers.common.Authorization = `Bearer ${Cookies.get('t')}`;
        }
    });

    if (Cookies.get('t')) {
        context.$axios.setToken(Cookies.get('t'), 'Token');
    }

    context.$axios.onResponseError(res => {
        throw res.response === undefined ? { message: res.message } : res.response.data;
    });

}
