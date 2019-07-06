$('#userForm').on('submit', function() {
    // alert('1234');
    var formData = $(this).serialize();
    //    console.log(formData);
    //    向服务器端发送添加用户的请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function() {
            // 如果操作成功则刷新页面
            location.reload();
        },
        error: function() {
            alert('用户添加失败');
        }
    })

    // 阻止表单的默认提交行为
    return false;
});

$('#avatar').on('change', function() {
    // 用户选择到的文件
    //    console.log( this.files[0]);
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response)
                //实现头像预览功能
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);

        }
    })


});
// 向服务器端发送请求 索要用户列表信息
$.ajax({
    type: 'get',
    url: '/users',
    success: function(response) {
        console.log(response);

    }
})