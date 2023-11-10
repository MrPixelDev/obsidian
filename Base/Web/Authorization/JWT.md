#jwt #auth 

JWT - #jsonWebToken

nmSibNskEASw.NSGLriIL4uW3vdnv.Sigla34gdg
1. - Header
{
	"alg": "HS512",
	"typ": "JWT"
}
2. Data
{
	id: 1,
	username: "mr.Pixel",
	roles: ["admin", "manager"]
}
3. Signature
secret: "SomeSecretString"


Токены - Access, Refresh
Access Token - живет 15-30 минут (по конфигу), для доступа к сервису, хранится в LocalStorage
Refresh Token - 15-60 дней - Для обновления access, хранится в httpOnly cookie (httpOnly - не изменяются через JS)
Refresh Token + IP in DB = Session

{
email, password
} -> server
server -> {
accessToken, refreshToken
}
GET /api/something
	headers: Authorization: ${accessToken}
If status 401 unauthorized -> intercepter 401 -> 
to /api/refresh cookie: refreshToken

