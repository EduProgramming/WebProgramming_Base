# Database DB Table

```sql
CREATE TABLE IF NOT EXISTS Users(
    id                  SERIAL          PRIMARY KEY,
    code                VARCHAR(20)     UNIQUE NOT NULL,
    password            VARCHAR(300)    NOT NULL,
    name                VARCHAR(100)    NOT NULL,
    email               VARCHAR(120)    NOT NULL,
    grade               INT,
    auth_code           INT             DEFAULT 1,
    major_id            INT             DEFAULT 1,
    status              INT             DEFAULT 1,
    created_at          TIMESTAMP       DEFAULT NOW(),
    updated_at          TIMESTAMP       DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS PlaceCategories(
    id                  SERIAL          PRIMARY KEY,
    category            VARCHAR(30)     UNIQUE
);

CREATE TABLE IF NOT EXISTS Places(
    id                  SERIAL          PRIMARY KEY,
    category_id         INT             DEFAULT 1,
    name                VARCHAR(150)    NOT NULL,
    address             VARCHAR(300),
    url                 VARCHAR(300),
    loc_x               DECIMAL,
    loc_y               DECIMAL,
    tel                 VARCHAR(20),
    CONSTRAINT fk_place_category_id FOREIGN KEY(category_id) REFERENCES PlaceCategories(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Buses(
    id                  SERIAL          PRIMARY KEY,
    user_id             INT,
    code                VARCHAR(3)      DEFAULT 'A-1',
    running_time        TIME            DEFAULT '17:30:00',
    seat                INT,
    reservation_at      TIMESTAMP       DEFAULT '2022-07-20 17:30:00',
    created_at          TIMESTAMP       DEFAULT NOW(),
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS ProductCategories(
    id                  SERIAL          PRIMARY KEY,
    category            VARCHAR(30)     UNIQUE
);

CREATE TABLE IF NOT EXISTS ProductStatus(
    id                  SERIAL          PRIMARY KEY,
    status              VARCHAR(30)     UNIQUE
);

CREATE TABLE IF NOT EXISTS Products(
    id                  SERIAL          PRIMARY KEY,
    category_id         INT,
    user_id             INT,
    title               VARCHAR(150)    NOT NULL,
    content             VARCHAR(1000),
    price               INT,
    status_id           INT             DEFAULT 1,
    created_at          TIMESTAMP       DEFAULT NOW(),
    updated_at          TIMESTAMP       DEFAULT NOW(),
    CONSTRAINT fk_category_id FOREIGN KEY(category_id) REFERENCES ProductCategories(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_status_id FOREIGN KEY(status_id) REFERENCES ProductStatus(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS ProductImages(
    product_id          INT             PRIMARY KEY,
    cnt                 INT             DEFAULT 0,
    img_link1           VARCHAR(200),
    img_hashdelete1     VARCHAR(60),
    img_link2           VARCHAR(200),
    img_hashdelete2     VARCHAR(60),
    img_link3           VARCHAR(200),
    img_hashdelete3     VARCHAR(60),
    img_link4           VARCHAR(200),
    img_hashdelete4     VARCHAR(60),
    img_link5           VARCHAR(200),
    img_hashdelete5     VARCHAR(60),
    CONSTRAINT fk_product_id FOREIGN KEY(product_id) REFERENCES Products(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS ProductViews(
    product_id          INT,
    user_id             INT,
    CONSTRAINT fk_product_id FOREIGN KEY(product_id) REFERENCES Products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT pk_product_views_id PRIMARY KEY(product_id, user_id)
);

CREATE TABLE IF NOT EXISTS ProductLikes(
    product_id          INT,
    user_id             INT,
    CONSTRAINT fk_product_id FOREIGN KEY(product_id) REFERENCES Products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT pk_product_likes_id PRIMARY KEY(product_id, user_id)
);
```





## INSERT SAMPLE DATA

### ProductCategories

```sql
INSERT INTO ProductCategories(category)
VALUES('도서/티켓/문구');

INSERT INTO ProductCategories(category)
VALUES('생활/가공식품');

INSERT INTO ProductCategories(category)
VALUES('여성의류');

INSERT INTO ProductCategories(category)
VALUES('남성의류');

INSERT INTO ProductCategories(category)
VALUES('가구/인테리어');

INSERT INTO ProductCategories(category)
VALUES('뷰티/미용');

INSERT INTO ProductCategories(category)
VALUES('디지털/가전');

INSERT INTO ProductCategories(category)
VALUES('반려동물용품');

INSERT INTO ProductCategories(category)
VALUES('기타');

COMMIT;
```



### ProductStatus

```sql
INSERT INTO ProductStatus(status)
VALUES('판매중');

INSERT INTO ProductStatus(status)
VALUES('예약됨');

INSERT INTO ProductStatus(status)
VALUES('판매완료');

COMMIT;
```



### PlaceCategories

```sql
INSERT INTO PlaceCategories(category)
VALUES('한식');

INSERT INTO PlaceCategories(category)
VALUES('양식');

INSERT INTO PlaceCategories(category)
VALUES('일식');

INSERT INTO PlaceCategories(category)
VALUES('중식');

INSERT INTO PlaceCategories(category)
VALUES('패스트푸드');

INSERT INTO PlaceCategories(category)
VALUES('분식');

COMMIT;
```



### Places

```sql
INSERT INTO Places(category_id, name, address, url, loc_x, loc_y, tel)
VALUES(4, '소룡각', '전북 익산시 무왕로4길 12-17', 'http://place.map.kakao.com/1921165737', '126.956548217834', '35.9630463801059', '063-837-9993');

INSERT INTO Places(category_id, name, address, url, loc_x, loc_y, tel)
VALUES(3, '하나요리당고', '전북 익산시 익산대로70길 46', 'http://place.map.kakao.com/386349373', '126.958082562259', '35.9629063325092', '');

INSERT INTO Places(category_id, name, address, url, loc_x, loc_y, tel)
VALUES(5, '버거킹 원광대점', '전북 익산시 무왕로 893', 'http://place.map.kakao.com/2111592453', '126.957975418997', '35.9642653637354', '063-851-0111');

INSERT INTO Places(category_id, name, address, url, loc_x, loc_y, tel)
VALUES(3, '백야', '전북 익산시 익산대로68길 27', 'http://place.map.kakao.com/1438262355', '126.956544100525', '35.9624677829788', '010-2459-0444');

INSERT INTO Places(category_id, name, address, url, loc_x, loc_y, tel)
VALUES(2, '오아시스', '전북 익산시 신용동 7-1', 'http://place.map.kakao.com/1860344399', '126.961583228901', '35.9725002876457', '');

INSERT INTO Places(category_id, name, address, url, loc_x, loc_y, tel)
VALUES(6, '떡두껍집', '전북 익산시 익산대로68길 36', 'http://place.map.kakao.com/16281376', '126.95739127253007', '35.962048109196765', '063-853-2203');

INSERT INTO Places(category_id, name, address, url, loc_x, loc_y, tel)
VALUES(5, '맥도날드 원광대점', '전북 익산시 신동 762-17', 'http://place.map.kakao.com/8357988', '126.957088746867', '35.9638901344925', '070-7017-0571');

COMMIT;
```

