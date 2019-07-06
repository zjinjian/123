$('#addCategory').on('submit',function(){
    var formData =$(this).serialize();
    //向服务器发送请求,添加分类
    $.ajax({
        type:'post',
        url:'/categories',
        data:formData,
        //如果成功 进入
        success:function(){
            location.reload();
        }
    })


    //阻止表单默认行为
    return false;
});


//发送ajax请求  向服务器端发送请求
$.ajax({
    type:'get',
    url:'/categories',
    success:function(response){
        console.log(response);
        // 拼接
        var html=template('categorioesTpl',{data: response});
        // console.log(html);
        // 把拼接好的字符串放到盒子里 页面中
         $('#categoryBox').html(html);      
    }
});
// 修改功能  当点击编辑时 进入修改
// 通过事件委托 向 编辑按钮添加 点击事件
// 因为 编辑按钮是动态生生成的  首页不能直接为编辑按钮添加点击事件 首页委托给予 它的父级
//因为 编辑按钮有多个 所以给予添加一个edit类名
$('#categoryBox').on('click','.edit',function(){
    // 为编辑添加 一项id属性
    // 获取修改的分类数据的id
     var id=$(this).attr('data-id');
    $.ajax({
        type:'get',
        url:'/categories/' + id,
        success:function(response){
            console.log(response);
             var html=template('modifyTpl',response);
            //  console.log(html);
             //把拼接好的数据放到页面当中
             $('#formBox').html(html);           
        }
    })
});
// 当修改分类数据表单发生提交行为的时候
$('#formBox').on('submit','#modifyCategory',function(){
    // 第一点 首先阻止表单提交的默认行为
    var id = $(this).attr('data-id');
//第二点获取到 在表单中输入的内容
  var formData=  $(this).serialize();
    // 修改分类数据
  $.ajax({
    type:'put',
    url:'/categories/' + id,
    data:formData,
    success:function(){
        location.reload();
    }
  })
    
    return false;
});
// 删除分类功能
// 1通过事件委托方式为删除按钮添加点击事件
$('#categoryBox').on('click','.delete',function(){
   if( confirm('确定删除吗')){
    //    获取要删除数据的id
    var id=$(this).attr('data-id')
       $.ajax({
           type:'delete',
           url:'/categories/' + id,
        success:function(){
            location.reload();
        }
       })
   }
})