//= require rails-ujs
//= require activestorage
//= require jquery
//= require popper
//= require bootstrap-sprockets
//= require bootstrap

//= require turbolinks
//= require_tree .


scroll_bottom = function(){
  if($('.messages').length > 0)
  $('.messages').scrollTop($('.messages')[0].scrollHeight);
};

update_unread = function(){
  let messages = document.querySelector('.messages');
  let roomId = 0;
  if(document.querySelector('.messages')){
    roomId = document.querySelector('.messages').dataset.roomId;
  }
  if( messages && roomId && document.querySelector(`#room-${roomId}`)){
    jQuery.ajax({
      url: "/reset_unread",
      type: "GET",
      data: {room_id: roomId},
      dataType: "json",
      success: function(data){
        if(document.querySelector(`#room-${roomId} .badge`)){
          let count = parseInt(document.querySelector(`#room-${roomId} .badge`).innerText); 
          document.querySelector(`#room-${roomId}`).removeChild(document.querySelector(`#room-${roomId} .badge`));
          let all_messages = document.querySelector('#all-messages');
          all_messages.querySelector('.badge').textContent = parseInt(all_messages.querySelector('.badge').textContent ) - count;
        }
      }
    });
  }
}

$(document).on('turbolinks:load', function(ev){
  let links=document.querySelectorAll('.sidenav-link');
  links.forEach(link => {
    link.className = `opacity-half list-group-item list-group-item-action sidenav-link ${link.href.split('/')[3] === window.location.pathname.slice(1) ? "active" : ""}`;
  });
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  if($("#tweet_text")){
    $("#tweet_text").keyup(function(){
      $("#info-tweet").text(`${(250 - $(this).val().length)}/250`);
    });
  }

  scroll_bottom();
  update_unread();
});



let actionsf={};
let actionsu={};
