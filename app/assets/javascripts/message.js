$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    if (message.content || message.image) {

    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img class="lower-message__image" src= ${ message.image }>` : "";
    var html = `<div class="his1" data-message-id="${message.id}">
                  <div class="his1-up">
                      ${message.user_name}
                  </div>
                  <div class="his1-up2">
                    ${message.date}
                  </div>
                  <div class="his1-down">
                    ${message.content}
                  </div>
                    ${img}
                </div>`
      return html;
    };
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = (window.location.href);
    $.ajax({  
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    
    .done(function(data){
      var html = buildHTML(data);
      $('.chat__his').append(html);
      $('#new_message')[0].reset(); //input内のメッセージを消しています。
      $('.chat__his').animate({ scrollTop: $('.chat__his')[0].scrollHeight});
      // return false

      })

    
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.send').prop('disabled', false);//ここで解除している


    })
  });
// done関数の中で変数htmlを定義しappendメソッドを使い作成したHTMLを
// 追加しています。





// ↓message.jsを以下のように編集しましょう

  //省略
  $(function() {
    var reloadMessages = function() {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      var last_message_id = $('.his1:last').data('message-id');
      var group_id = $('.right').data('group-id')
      
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: `/groups/${group_id}/api/messages`,
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })

      .done(function(messages) {
        var insertHTML = '';
        
        messages.forEach(function(message){
    
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
       
          var html = buildHTML(message);

      //メッセージが入ったHTMLを取得
          $('.chat__his').append(html);
          $('.chat__his').animate({ scrollTop: $('.chat__his')[0].scrollHeight});


      //メッセージを追加
      ;})
      })
      // .fail(function() {

      //   alert('error');

      // });



    };
      setInterval(reloadMessages, 5000);
   })
})
