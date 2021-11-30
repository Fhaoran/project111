$(function() {
    var layer = layui.layer;
    var form = layui.form;
    initArticleCate();

    function initArticleCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })

    }
    //新增分类
    var indexAdd = null;
    $('#btnAddCate').click(function() {
            //弹出对话框添加分类表单
            indexAdd = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类',
                content: $('#dialog-add').html()

            })
        })
        // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArticleCate()
                layer.msg('新增分类成功！')
                    // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    });
    var indexEdit = null;
    //通过代理的形式为btn-edit绑定点击事件
    $('tbody').on('click', '.btn-edit', function() {
            indexEdit = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '修改文章分类',
                content: $('#dialog-edit').html()
                    //发起请求获取当前分类数据，往表单填充数据
            })
            var id = $(this).attr('data-id');
            $.ajax({
                method: 'GET',
                url: '/my/article/cates/' + id,
                success: function(res) {
                    // console.log(res.data);
                    form.val('form-edit', res.data)
                }
            });

        })
        //通过代理的形式，为修改分类的表单绑定submit事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault;
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败')
                }
                layer.msg('跟新成功');
                layer.close(indexAdd);
            }
        })
    })



    $('body').on('submit', '#changed', function(e) {
            e.preventDefault();
            //请求接口
            $.post('/my/article/updatecate', $(this).serialize(), function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新失败')
                }
                layer.msg('成功')
                initArticleCate();
                //关闭弹出层
                layer.close(indexEdit);
            })
        })
        //通过代理的形式，为删除按钮绑定点击事件

    $('tbody').on('click', '#btn-delete', function() {
        var id = $(this).attr('data-id')
            //提示用户是否要删除
        layer.confirm('确定删除吗？', { icon: 3, title: '提示' }, function(indexAdd) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败！');
                    }
                    layer.msg('删除成功');
                    initArticleCate();
                    layer.close(indexAdd);
                }
            })
        })
    })


});