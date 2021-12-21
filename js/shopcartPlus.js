/**
 * 购物车js文件
*/
/*$(function () {
    //1.全选
    /*
    1.点击表头的全选框 获取表头全选框的选中状态
    2.表格中的选择框状态需要一致
    3.结算中的全选状态一致

   //定义三个变量
   var $theadInput = $('table thead input[type=checkbox]');//头部选择框
   var $bodyInput =  $('table tbody input[type=checkbox]');//中间选择框
   var $allPriceInput = $('.totalPrice input[type=checkbox]');//结算选择框
   $theadInput.change(function () {
       //获取选中状态
       var state = $(this).prop('checked');
       //让表格中的选择框状态保持一致 且 结算中的选择框状态保持一致
       $bodyInput.prop('checked',state);
       $allPriceInput.prop('checked',state);

       //调用计算总价函数
       calcTotalPrice();
   })

    //2.结算中的选择框，也需要有相同的选择功能
    $allPriceInput.change(function (){
        //获取选中状态
        var state = $(this).prop('checked');
        //上面的全选 和 表格中的input 需要状态一致
        $bodyInput.prop('checked',state);
        $theadInput.prop('checked',state);

         //调用计算总价函数
         calcTotalPrice();
    })
    
    //表单中的选中状态 反过来影响全选
    $bodyInput.change(function () {
        //顶一个标杆
        var flag = true;
        //循环表格中所有选择框的选中状态
    $bodyInput.each(function (i,input) {
        if (!$(input).prop('checked')) {  //只要有一个选择框没有选中 那么状态就变为false
            flag = false;
            } 
        })
        //把状态用来改变全选框
        $theadInput.prop('checked',flag)
        $allPriceInput.prop('checked',flag)

         //调用计算总价函数
          calcTotalPrice();
        // //渲染到总价对应的位置
        // $('.total').text(totalPrice.toFixed(2))
    })
    //数量的加减
    $('.add').on('click', function() {
        //下一个input节点
        var $nextInput = $(this).next();

        //获取输入框的值
        var oldVal = parseInt($nextInput.val());
        //自增
        oldVal++;

        //重新赋值给这个输入框
        $nextInput.val(oldVal);

        //小计
        subTotalPrice(oldVal, $(this));
         //调用计算总价函数
         calcTotalPrice();
    })
     //减少
     $('.reduce').on('click', function() {
        //上一个input节点
        var $prevInput = $(this).prev();

        //获取输入框的值
        var oldVal = parseInt($prevInput.val());
        //自减
        oldVal--;
        oldVal = oldVal < 1 ? 1 : oldVal; //如果小于1 那么就等于一 否则就等于自己

        //重新赋值给这个输入框
        $prevInput.val(oldVal);

        //小计
        subTotalPrice(oldVal, $(this));
         //调用计算总价函数
         calcTotalPrice();
    })
    //抽取一个小计的函数
    function subTotalPrice(val, dom) {
        var subtotal = val * parseFloat(dom.closest('tr').find('.price').text());
        //把小计的结果 放入dom对应的位置
        dom.closest('tr').find('.subprice').text(subtotal.toFixed(2));
    }
    //删除
    $('.del').click(function() {
            //删除整行
            $(this).closest('tr').remove();
            calcGoodsCount() //调用商品总数量
        })
        //计算总价和选中数量的函数
        function calcTotalPrice() {
            //定义一个数量
            var count = 0;
            //定义变量 保持总价格
            var totalPrice = 0;

            //循环表格中的所有选择框 如果是选中的状态 那么计算总价
            $('table tbody input[type=checkbox]').each(function(i,input){
                if($(this).prop('checked')) {
                    //自增
                    count++;
                    //累加价格
                    totalPrice += parseFloat($(input).closest('tr').find('.subprice').text() )
                }
            })
            //把总价渲染到对应位置
            $('.total').text(totalPrice.toFixed(2) )
            //把数量渲染到对象的dom位置
            $('.count').text(count)
        }
        //全部商品
        function calcGoodsCount() {
            $('.goodsCount').text($('table tbody tr').length);
        }
        calcGoodsCount();//一进入页面 就自定义调用一次

        //删除选中商品
        $('.deleteChecked').on('click',function (){
            //循环单选框 如果选中 干掉自己（删除的是一行）
            $bodyInput.each(function (i, input) {
                if ($(this).prop('checked')) {
                    $(this).closest('tr').remove();
                }
            })
            //计算总价
            calcTotalPrice();
            //计算商品数量
            calcGoodsCount();
        })
})*/







/**
 * 购物车功能JS Plus版
 * 2021-12-14
 */

$(function () {
    //把三个类型的input分别先获取
    var $theadInput = $('thead input[type=checkbox]');  //表头中的全选框
    var $tbodyInputs = $('tbody input[type=checkbox]');  //表格中的每一行的选择框
    var $totalPriceInput = $('.totalPrice input[type=checkbox]');  //计算总价中的全选框

    /*全选*/
    /*
     1.给表头中的全选按钮 绑定点击事件 点击的时候 获取到它的选中状态 （true/false）
     2.给表格中的每一行的数据input选择框，赋值为表头的选中状态（true/false）
     3.给计算总价的全选框，也赋值为表头的选中状态（true/false）
    */
    //表头的全选
$theadInput.change(function () {
    var  checkState = $(this).prop('checked');  //获取全选框的选中状态
    $tbodyInputs.prop('checked',checkState);   //把状态给表格中的选择框
    $totalPriceInput.prop('checked',checkState);  //把状态给计算总价中的全选框
    allTotal();  //总计
});

/*
    计算总价的全选
      1.给计算总价的全选按钮 绑定点击事件，获取选择状态（true/false）
      2.把状态给表头的全选框
      3.把状态给表头的选择框
 */

$totalPriceInput.change(function () {
    var checkState = $(this).prop('checked');  //获取计算总价的全选状态
    $theadInput.prop('checked',checkState);  //赋值给表头
    $tbodyInputs.prop('checked',checkState);  //赋值给表格中全选框
    allTotal();  //总计
})

/*
    表格中的选择框 反过来影响两个全选框
      1.给表格中选择框绑定点击事件
      2.定一个标杆 flag = true
      3.循环表格中的选择框
      4.获取每一个选择框的选中状态
           判断：如果有一个false 那么就不是全选， flag = false
      5.把falg的值赋值给两个全选框（因为flag就是对应选中状态）
 */
$tbodyInputs.change(function () {   //给表格总单选框绑定事件
    var flag = true;   //定义标杆为true
    $tbodyInputs.each(function (index,input) {  //循环表格input
        var checkState = $(this).prop('checked');  //获取选中状态
        if (checkState === false) {      //如果有一个等于false
            flag = false;    //标杆变为false（全选的状态变为falsde）
        }
    })
    $theadInput.prop('checked',flag);  //把状态赋值给头部全选框
    $totalPriceInput.prop('checked',flag);  //把状态赋值给计算价格全选框
    allTotal();  //总计
})

/*
    加法功能：
      1.获取+按钮，绑定点击事件
      2. 点击的时候，获取后面输入框的值
      3.输入框的值自增
      4.把自增的值，重新赋值给后面的输入框
 */
$('.add').click(function () {
    var count = parseInt($(this).next().val());  //取后面输入框的值
    count++; //自增
    $(this).next().val(count);  //把自增的值 赋值给后面输入框

    //调用小计函数
    subTotal($(this),count);
    allTotal();  //总计
})

/*
    减法功能
      1.给- 绑定点击事件
      2.获取前面输入框的值
      3.值自减，边界判断，如果小于1，那么等于1 否则等于自己
      4.把减少后的值 重新赋值给前面的输入框
 */
$('.reduce').click(function () {  //绑定事件.
    var count = parseInt($(this).prev().val());  //获取前面输入的值
    count--;  //自减
    count = count < 1 ? 1 : count;  //边界判断
    $(this).prev().val(count);  //把减少后的值 重新赋值给前面的输入框

    //调用小计函数
    subTotal($(this),count);
    allTotal();  //总计
})

/*
    封装一个小计函数：（点击 + 或 - 的时候 需要调用小计功能）
 */
function subTotal (dom,count) {
    var singlePrice = parseFloat(dom.closest('tr').find('.price').text());  //找到单价
    var subTotalPrice = singlePrice * count;  //单价 * 数量 = 小计
    dom.closest('tr').find('.subprice').text(subTotalPrice.toFixed(2))  //把小计的结果渲染对应位置 保留两位小数
    }

 /*
    总计功能实现：（头部全选 计算总价全选 表格的选择框 + - 删除 六个地方用总计）
        1.定义一个变量 用于保存总价 定义一个变量 用于保存已选商品 数量
        2.获取所有表格中的选择框，循环，获取选中状态，判断，
        3.如果选中，那么就要累加这一行的小计
*/
    function allTotal() {
        var allPrice = 0;  //定义一个变量 用于保存总价
        var selectedCount = 0;  //定义一个变量 用于保存已选商品 数量

        $('tbody input[type=checkbox]').each(function () {  //获取表格中的选择框 循环
            var checkState = $(this).prop('checked');   //获取选中状态
            if (checkState) {   //如果是true
                allPrice += parseFloat($(this).closest('tr').find('.subprice').text());   //累加这一行的小计
                selectedCount++;  //数量+1
            }
        })
         //渲染
         $('.total').text(allPrice.toFixed(2));  //渲染总价
         $('.count').text(selectedCount);  //渲染数量
    }

/*
    关于下面的删除功能：模拟，不是正确的逻辑，是“伪”的
*/
    //删除
    $('.del').click(function () {
        $(this).closest('tr').remove()
        getGoodsCount(); //重新计算商品数量
        allTotal(); //计算总价
    })

    //删除选中
    $('.deleteChecked').click(function () {
        $('tbody input[type=checkbox]').each(function () {  //获取表格中的选择框 循环
            var checkState = $(this).prop('checked');  //获取选中状态
            if (checkState) {  //如果是rtue
                $(this).closest('tr').remove(); //干掉自己
            }
        })
        allTotal(); //计算总价
        getGoodsCount(); //重新计算商品数量
    })

    //封装一个获取全部商品的函数
    function getGoodsCount() {
        //获取数量
        var goodsCount = $('table tbody tr').length;
        //渲染
        $('.goodsCount').text(goodsCount);
    }
    getGoodsCount(); //页面加载调用一次

})