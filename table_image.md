

---

## ✅ テーブル構成
### `users`

| カラム名                       | 型      | 備考                          |
| -------------------------- | ------ | --------------------------- |
| id                         | int    | PK                          |
| name                       | string |                             |
| email                      | string |                             |
| image                      | string | 画像URLまたはBase64              |
| desk\_position\_manage\_id | int    | FK → desk\_position\_manage |

---

### `desk_position_manage`

| カラム名            | 型   | 備考              |
| --------------- | --- | --------------- |
| id              | int | PK              |
| x\_position     | int | 横位置（画面上）        |
| y\_position     | int | 縦位置（画面上）        |
| rotation\_angle | int | 0, 90, 180, 270 |

---

### `projects`

| カラム名          | 型      | 備考 |
| ------------- | ------ | -- |
| id            | int    | PK |
| project\_name | string |    |

---

### `user_projects`

| カラム名        | 型   | 備考            |
| ----------- | --- | ------------- |
| id          | int | PK            |
| user\_id    | int | FK → users    |
| project\_id | int | FK → projects |

---

