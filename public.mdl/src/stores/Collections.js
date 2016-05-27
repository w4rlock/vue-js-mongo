import http from '../services/http'

export default {

    /*
     * Function: create a new mongo collection
     *
     * @param {String} name is collection name
     * @return Promise Object
     */
    create(name){
        return new Promise((res, rej) => {
            let o = { collection_name: name };
            http.post('/Local/gamedb/coll_create', o, res, rej);
        });
    },


    /*
     * Function: remove a new mongo collection
     *
     * @param {String} name is collection name
     * @return Promise Object
     */
    remove(name){
        return new Promise((res, rej) => {
            let o = { collection_name: name };
            http.post('/Local/gamedb/coll_delete', o, res, rej);
        });
    },


    /* Function: store json to collection
     *
     * @param {String} col collection name
     * @param {Object} data object to store
     * @return Promise object
     */
    addDocument(col, data){
        return new Promise((res, rej) => {
            if (!data._id){
                data._id = this.getId();
            }

            let o = { objectData: JSON.stringify(data) };
            let url = `/Local/gamedb/${col}/insert_doc`;

            http.post(url, o, res, rej);
        });
    },

    /* Function: update json
     *
     * @param {String} col collection name
     * @param {Object} data object to update
     * @return Promise object
     */
    updateDocument(col, data){
        return new Promise((res, rej) => {
            if (!data._id){
                data._id = this.getId();
            }

            let o = { objectData: JSON.stringify(data) };
            let url = `/Local/gamedb/${col}/edit_doc`;

            http.post(url, o, res, rej);
        });
    },


    updateschema(model, changes){
      return new Promise((res, rej) => {
          let o = { model: model, changes: changes };
          let url = `/Local/gamedb/updateschema`;

          http.post(url, o, res, rej);
      });

    },

    /* Function: remove json
     *
     * @param {String} col collection name
     * @param {Number} id object to remove
     * @return Promise object
     */
    removeDocument(col, id){
        return new Promise((res, rej) => {
            let o = { doc_id: id };
            let url = `/Local/gamedb/${col}/doc_delete`;

            http.post(url, o, res, rej);
        });
    },

    getId(){
        return String(new Date().valueOf());
    }
}
