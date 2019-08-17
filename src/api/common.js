import request from '@/utils/request';

export default {
    uploadImage(data) {
        return request({
            url: '/public/upload',
            method: 'post',
            data
        });
    },
    getCaptcha() {
        return request.get('/public/getCaptcha');
    }
};
