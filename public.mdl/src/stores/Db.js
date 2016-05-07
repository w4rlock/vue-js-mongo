import http from '../services/http'

export default {
    add(data){
        //http.post(
    
    },

    getStats(){
        return new Promise((res, rej) => {
            http.get('/Local/gamedb', res, rej);
        });
    },

    getModels(){
        return new Promise((res, rej) => {
            http.post('/api/Local/gamedb/model/1', {}, res, rej);
        });
    },

    /*
     *
     * Function: find documents from collection
     *
     * @param {String} c the collection name
     * @param {Number} p the page number
     * @return {Promise}
     *
     */
    getDocuments(c, p = 1){
        return new Promise((res, rej) => {
            http.post(`/api/Local/gamedb/${c}/${p}`, {}, res, rej);
        });
    }
}
