class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :content, presence: true, unless: :image?
  mount_uploader :image, ImageUploader
  # メッセージテーブルのイメージカラムをキャリアウェイブの画像保存に使う
end