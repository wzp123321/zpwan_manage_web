import { getRequest, postRequest } from "../request"

const CatalogModule = {
    async getCatalogList(params: { [key: string]: any }) {
        const url = "/dictionary/list";
        return getRequest(url, params);
    }
}

export default CatalogModule