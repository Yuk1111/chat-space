json.id      @message.id
json.content @message.content 
json.date    @message.created_at.strftime("%Y/%m/%d %H:%M")
json.user_name @message.user.name
json.image   @message.image.url


# respond_toで処理を分けたのでjbuilderを使用して返すデータを作成していきます。
# jbuilderはデフォルトで記述されているgemで入力されたデータをJSON形式で出力します。
# jbuilderのファイルを作成していきますが今回はmessagesコントローラの
# createアクションに対応するjbuilderファイルになるので
# views/messages/create.json.jbuilderとしてファイルを作成します。
# jsonファイルでは基本的にjson.KEY VALUEという形で書きます。
# こうすることによりjsファイルに返ってきたデータをjbuilderで定義した
# キーとバリューの形で呼び出して使う事ができます。