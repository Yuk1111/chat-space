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
|name|string|null: false|
|email|string|null: false|
|password|string|null: false|

### Association
- has_many :groups
- belongs_to :user

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|


### Association
- belongs_to:group
- has_many :users


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




