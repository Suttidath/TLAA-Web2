import axios from "axios";
import {API_URL} from "./API";
import BaseAlert from "../components/baseAlert";

let path = API_URL+'addressOption'
const getAddressOption = async () => {
    try {
        return await axios.get( path, ).then(response => {
            if (response.status === 200) {
                return response.data
            } else {
                return BaseAlert("error", "ผิดพลาด", "พบข้อผิดพลาด")
            }
        })
    } catch (e) {
        return false
    }
}
const OptionService = {
    getAddressOption,
}
export default OptionService