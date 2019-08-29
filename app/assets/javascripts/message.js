// $(function(){
//   function buildHTML(comment){
//     var html = `<p>
//                   <strong>
//                     <a href=/users/${comment.user_id}>${comment.user_name}</a>
//                     ：
//                   </strong>
//                   ${comment.text}
//                 </p>`
//     return html;
//   }
//   $('.new_message').on('submit', function(e){

//     e.preventDefault();
//     var formData = new FormData(this);
//     var href = window.location.href;
//     $.ajax({
//       url: href,
//       type: "POST",
//       data: formData,
//       dataType: 'json',
//       processData: false,
//       contentType: false
//     })
//     .done(function(data){
//       var html = buildHTML(data);
//       $('.comments').append(html)
//       $('.textbox').val('')

//       .fail(function(){
//         alert('error');
//       })
//     })
//   })
// });


$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-id="${message.id}">
                  <div class="message__detail">
                    <p class="message__detail__current-user-name">
                      ${message.user_name}
                    </p>
                    <p class="message__detail__date">
                      ${message.date}
                    </p>
                  </div>
                  <p class="message_body">
                    <div>
                    ${content}
                    </div>
                    ${img}
                  </p>
                </div>`
  return html;
  }
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
      $('.messages').append(html);
      $('#message_content').val(''); //input内のメッセージを消しています。
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
  })
});

// done関数の中で変数htmlを定義しappendメソッドを使い作成したHTMLを
// 追加しています。
