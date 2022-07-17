# 예시 프로젝트

## 1. guide(미완성)

미니 중고마켓의 기능을 가지고 있는 예시

해당 기능을 통해서 간단한 CRUD 방법을 터득하며 됩니다.

`Database`와 `IMGUR API`, `KAKAO API`에 대한 처리들이 먼저 이뤄져야 확인 가능합니다.

### Database

Postgresql을 먼저 설치한 후에 해당 부분을 통해서 DB를 설계해줍니다.

[DB 테이터 설계보기](./dbReadMe.md)

**database.json**

해당 파일에 내용을 맞게 설정해주시면 됩니다.

```json
{
  "user": "postgres",
  "password": "postgres",
  "host": "localhost",
  "dbname": "Guide",
  "port": "5432"
}
```





### IMGUR API

https://api.imgur.com/

**secret.json**

해당 파일에 IMGUR-CLIENT-ID를 넣어주시면 됩니다.

```json
{
    "IMGUR-CLIENT-ID": ""
}
```





### KAKAO API

https://developers.kakao.com/

**place.html**

14line에 KAKAO_API_KEY작성 부분을 키값으로 변경해주시면 됩니다.

해당 설정에서는 플랫폼 앱 설정에서 `localhost:5000`으로 설정하셔야 카카오 맵이나 다른 부분들을 사용하실 수 있습니다.

```
<script
      type="text/javascript"
      src="//dapi.kakao.com/v2/maps/sdk.js?appkey=KAKAO_API_KEY작성">
</script>
```





## 2. password

input값에 대해서 확인을 하는 방법 확인할 수 있는 예시