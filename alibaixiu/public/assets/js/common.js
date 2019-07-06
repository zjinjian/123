// 给登出按钮添加点击事件
$('#logout').on('click',function(){
    // 点击时弹出 确认按钮
    var isConfirm=confirm('确定要退出?');
    if(isConfirm){
        // 如果确认则发送请求
      $.ajax({
        type:'post',
        url:'/logout',
        success:function(){
          //如果成功则跳转登陆界面
          location.href='login.html'
        },
        error:function(){
          alert('退出失败');
        }
      })
    }
  })