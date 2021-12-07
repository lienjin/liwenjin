//购物车js文件
$(function () {
    //全选
    var $theadInput = $('table thead input[type=checkbox]');
    var $bodyInput = $('table tbody input[type=checkbox');
    var $allPriceInput = $('.totalPrice input[type=checkbox]');
    $theadInput.change(function () {
        var state = $(this).prop('checked');
        $bodyInput.prop('checked', state);
        $allPriceInput.prop('checked', state);
    })

    $bodyInput.change(function () {
        //第一个标杆
        var flag = true;
        //总价
        var totalPrice = 0;

        $bodyInput.each(function (i, input) {
            if (!$(input).prop('checked')) {  //只要有
                flag = false;
            } else {
                totalPrice += parseFloat($(this).closest('tr').find('.subprice').text());
            }
        })
        $allPriceInput.prop('checked', flag);
        $theadInput.prop('checked', flag);

        //渲染到总价相应的位置
        $('.total').text(totalPrice.toFixed(2))
    })

    $allPriceInput.change(function () {
        var state = $(this).prop('checked');
        $bodyInput.prop('checked', state);
        $theadInput.prop('checked', state);
    })

    //数量的加减
    //加
    $('.add').on('click', function () {
        //获取输入框的值
        var oldVal = parseInt($(this).next().val());
        //自增 
        oldVal++;
        //重新赋值给输入框
        $(this).next().val(oldVal);

        // 小计
        subTotalPrice(oldVal, $(this));
        // var subtotal = oldVal * parseFloat($(this).closest('tr').find('.price').text());
        // $(this).closest('tr').find('.subprice').text(subtotal.toFixed(2));
    })
    //减
    $('.reduce').on('click', function () {
        //获取输入框的值
        var oldVal = parseInt($(this).prev().val());
        //自增 
        oldVal--;
        oldVal = oldVal < 1 ? 1 : oldVal;
        //重新赋值给输入框
        $(this).prev().val(oldVal);

        // 小计
        subTotalPrice(oldVal, $(this));
        // var subtotal = oldVal * parseFloat($(this).closest('tr').find('.price').text());
        // $(this).closest('tr').find('.subprice').text(subtotal.toFixed(2));
    })

    //抽取一个小计的函数
    function subTotalPrice(old, dom) {
        //小计
        var subtotal = old * parseFloat(dom.closest('tr').find('.price').text());
        //把小计放入dom对应的设置
        dom.closest('tr').find('.subprice').text(subtotal.toFixed(2));
    }
    //删除
    $('.del').click(function () {
        $(this).closest('tr').remove();
    })
})

