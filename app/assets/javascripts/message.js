$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="his1" data-id="${message.id}">
                  <div class="his1-up">
                      ${message.user_name}
                  </div>
                  <div class="his1-up2">
                    ${message.date}
                  </div>
                  <div class="his1-down">
                    ${content}
                    ${img}
                  </div>
                </div>`
  return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = (window.location.href);
    console.log(url)
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
      return false


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
});

