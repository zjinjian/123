$.ajax({
    type:'get',
    url:'/categories',
    success:function(response){
        console.log(response);
        //接下来拼接字符
       var html= template('categoryTpl',{data:response});
    //    console.log(html);
       //把噢拼接好的内容放到页面上
       $('#category').html(html);
       
    }
});
$('#feature').on('change',function(){
    // 当选择文件时触发事件 获取到选择的文件
    var file=this.files[0];
    // 实现图片上传
    var formData =new FormData();
    // 将选择到的文件追加到fformdata中
    formData.append('cover',file);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        // 关键一步 告诉ajax方法不要出来data属性对应的参数
        processData:false,
        //不需要设置参数类型
        contentType:false,
        success:function(response){
            console.log(response);
            $('#thumbnail').val(response[0].cover);
            
        }

    })
});


$('#addForm').on('submit',function(){
    var formData =$(this).serialize();
    //想服务器端发送请求实现添加文章功能
    $.ajax({
        type:'post',
        url:'/posts',
        data:formData,
        success:function(){
            //如果文章添加成功则挑战到文章列表页面
            location.href ='/admin/posts.html'
        }

    })
    return false;
})
