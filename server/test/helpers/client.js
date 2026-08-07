import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

const jar = new CookieJar();

const client = wrapper(

    axios.create({

        baseURL: "http://localhost:5000/api",

        withCredentials: true,

        validateStatus: () => true,

        jar

    })

);

export { jar };

export default client;