/**
 * @api {post} /api/usr/check_remember_login Recordar Login
 * @apiName users.checkRememberLogin
 * @apiGroup User
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "Bearer token_encriptado"
 *     }
 * @apiSuccess {Boolean} remember Si recordo el login.
 */

/**
 * @api {post} /usr/login Login
 * @apiSampleRequest http://localhost:6661/usr/login
 * @apiName users.login
 * @apiParam {String} email    Email
 * @apiParam {String} password Password
 * @apiGroup User
 * @apiExample {curl} Example usage:
 *     curl -X POST -i http://localhost:6661/usr/login --data '{"email": "aa@aa.com", "password": "aa"}' -H "Content-Type: application/json"
 * @apiError {String} error ERR_LOGIN_INCORRECT
 * @apiSuccess {String} token Token de picoresa
 * @apiSuccess {json} usr Datos del Usuario
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "token":"eyJ0eXAiOiJKV1Qi...etc",
 *      "usr":{
 *             "_id":"5521a010c3697fc046664489",
 *             "email":"aa@aa.com",
 *             "name":"emanuel",
 *             "surname":"rosal",
 *             "sex":"M",
 *             "user_group":null,
 *             "birthday":null,
 *             "category":null,
 *             "cuit":null,
 *             "corporate_name":null,
 *             "iat":1428446077,//fecha creacion del token
 *             "exp":1428449677 //fecha en segundos (expiracion del token)
 *            }
 *     }
 */

/**
 * @api {post} /usr/register Registrarse
 * @apiSampleRequest http://localhost:6661/usr/register
 * @apiName users.register
 * @apiParam {String} name    Nombre
 * @apiParam {String} surname    Apellido
 * @apiParam {String} email    Email
 * @apiParam {String} password Password
 * @apiGroup User
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "status":"OK"
 *     }
 */

/**
 * @api {post} /api/photo/newalbum Nuevo album
 * @apiSampleRequest http://localhost:6661/api/photo/newalbum
 * @apiParam {String} folder    Nombre del album
 * @apiParam {String} user_id    Id del usuario (devuelto en el login)
 * @apiGroup AWS
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "status":"OK"
 *     }
 */

/*
 * @api {post} /api/photo/remove Remove Images Album
 * @apiSampleRequest http://localhost:6661/api/photo/remove
 * @apiParam {Array} keys Arreglo de string con el id de las fotos
 * @apiGroup AWS
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "status":"OK"
 *     }
 */
