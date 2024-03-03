const { default: axios } = require("axios");




class AxiosInstanceCrator {
    private instance: AxiosInstance;
    constructor(config?:import("axios").AxiosRequestConfig) {
        this.instance =axios.create(config);
        this.interceptors();
    }

    interceptors() {
        this.instance.interceptors.request.use((config)=>{
            const authToken
        })
    }
}