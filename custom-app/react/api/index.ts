import axios from "axios";

const api = axios.create({
    headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.vtex.ds.v10+json",
        "REST-Range": "resources=0-1000",
    },
});
export default api;
