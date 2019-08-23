## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|


### Association
- belongs_to :group
- belongs_to :user


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_name|string|null: false|
|email|string|null: false|
|password|string|null: false|

### Association
- has_many :group
- has_many :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|string|null: false|
|group_name|string|null: false|


### Association
- has_many :group
- has_many :user


## messageテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|uder_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user




