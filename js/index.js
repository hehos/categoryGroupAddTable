/**
 * Created by hui on 2015/8/19.
 */

$(document).ready(function () {
    var alone = new Alone();

    alone.render();

    $(".btn-add-cate").click(function () {
        $(this).hide();
        $(this).siblings().show();
    });
    $(".btn-confirm").click(function() {
        var input = $(this).siblings(".btn-add-input");
        var val = input.val().trim();
        if(val != "" && val != null) {
            var cate = $(this).parents(".cate-box");
            var idx = cate.attr("data-cata-index");
            alone.dll[idx].items.push({'name': val, 'enable': false});
            alone.render();
        }
    });
    $(".btn-confirm, .btn-cancel").click(function () {
        var inputs = $(this).parents(".btn-add-inputs");
        var addCateBtn = inputs.siblings(".btn-add-cate");
        inputs.hide();
        addCateBtn.show();
    });


    // cell 事件
    $(".cell-cont [type='checkbox']").change(function () {
        var cate = $(this).parents(".cate-box");
        var idxI = cate.attr("data-cata-index");
        var cell = $(this).parents(".cell-cont");
        var idxJ = cell.attr("data-cell-index");
        var val = cell.text().trim();

        debugger;
        if(this.checked) {
            alone.dll[idxI].items[idxJ].enable = true;
            alone.setDllData();
            alone.render();
        } else {
            alone.dll[idxI].items[idxJ].enable = false;
            alone.setDllData();
            alone.render();
        }
    });


});