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
  var member_list = $("#member-append");

  function appendUser(user){
      var html = 
                  `<div class="chat-group-user clearfix">
                      <p class="chat-group-user__name">${user.name}</p>
                      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                  </div>`;
                  search_list.append(html);
  }

  function appendErrMsgToHTML(msg){
      var html = 
                  `<div class="chat-group-user clearfix">
                      <p class="chat-group-user__name">${msg}</p>
                  </div>`;
                  search_list.append(html);
  }
  



})