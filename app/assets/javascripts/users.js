$(document).on('turbolinks:load', function(){

  $('#user-search-field').on('keyup', function(e){
    e.preventDefault();
    var input = $("#user-search-field").val();
    $.ajax({
        type: 'get',                // HTTPメソッドはGETで
        url:  '/users',             // /usersのURLに (これによりusersコントローラのindexアクションが起動)
        data: { keyword: input},    // keyword: inputを送信する
        dataType: 'json'            // サーバから値を返す際はjsonである
    })

    .done(function(users){                // usersにjson形式のuser変数が代入される。複数形なので配列型で入ってくる
        $('#user-search-result').empty();
          
        if (input.length !== 0){     // 値が等しくないもしくは型が等しくなければtrueを返す。
            $('#user-search-result').empty();

            users.forEach(function(user){ // users情報をひとつずつとりだしてuserに代入
              appendUser(user)
            });
          }
      

        else {
            $('#user-search-result').empty(); // ユーザーが見つからなければ「見つからない」を返す。
            appendErrMsgToHTML("一致するユーザーが見つかりません");
        }
    })

    .fail(function() {
        alert('ユーザー検索に失敗しました');
    });

    $('#user-search-result').on('click',".user-search-add",function(){
      });
    
  });
  
  var search_list = $("#user-search-result");
  var member_list = $("#user-chat-member");

  function appendUser(user){
      var html = 
                  `<div class="chat-group-user clearfix">
                      <p class="chat-group-user__name">${user.user_name}</p>
                      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.user_id} data-user-name=${user.user_name}>追加</div>
                  </div>`;
                  search_list.append(html);
  }
  function removeUser(user_id,user_name){
    var html = 
                  `<div class="chat-group-user">
                    <input name= 'group[user_ids][]' type='hidden' value=${user_id}>
                      <p class='chat-group-user__name'>${user_name}</p>
                      <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                  </div>`;
                  member_list.append(html);
  }



  function appendErrMsgToHTML(msg){
      var html = 
                  `<div class="chat-group-user clearfix">
                      <p class="chat-group-user__name">${msg}</p>
                  </div>`;
                  search_list.append(html);
  }


$(document).on('click', '.chat-group-user__btn--add', function(){
  removeUser($(this).data('user-id'),$(this).data('user-name'))
  $(this).parent().remove();
  })

  })

$(document).on('click', '.js-remove-btn', function(){
    $(this).parent().remove();

})
