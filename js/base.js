"use strict";

/**
 * Created by hui on 2015/8/18.
 */

window.Alone = function(dll, otherKey) {
    // data
    this.dll = dll;
    this.otherKey = otherKey;

    this.dllData = [];

    this.results = [];
    //this.results = [
    //    {key: "0_0_0", values: [1, 3, 4]}
    //];

}
// 方法
Alone.prototype.setDll = function(dll) {
    this.dll = dll;
}

Alone.prototype.setDllData = function () {
    var dll = this.dll;
    var tempDllData = [];
    for(var i = 0; i < dll.length; i++) {
        tempDllData.push([]);
        var cate = dll[i];
        var cells = cate.items;
        for(var j = 0; j < cells.length; j++) {
            if(cells[j].enable) {
                tempDllData[i].push(cells[j].name);
            }
        }
    }
    debugger;
    this.dllData = tempDllData;
}

Alone.prototype.setResults = function(data) {
    var other = this;
    var head = '';
    var n = data.length,
        stack = [];
    var html = '';
    var tempResults = [];
    var setRowData = function(l) {
        if(l == n){
            var rowData = {};
            var rowVals = rowData.values = [];

            // 根据dllData的数据生成组合key值
            var key = '';
            for(var i = 0; i < n; i++) {
                key += '_' + stack[i].index;
            }
            key = key.replace(/^_/, '');
            rowData.key = key;

            var results = other.results;
            for(var i = 0; i < results.length; i++) {
                // 如果该key值下的value有值就还原
                if(results[i].key == key) {
                    var values = results[i].values;
                    for(var idx in values) {
                        rowVals.push(values[idx]);
                    }
                    tempResults.push(rowData);
                    return;
                }
            }

            // 将唯独单元值存入结果的行数据
            for(var i = 0; i < stack.length; i++) {
                rowVals.push(stack[i].value);
            }
            for(var i = 0; i < other.otherKey.length; i++) {
                rowVals.push("");
            }

            tempResults.push(rowData);
            return;
        }

        var j = data[l].length;
        for(i = 0; i < j; i++) {
            stack[l] = {'index' : i, 'value' : data[l][i]};
            setRowData(l + 1);
        }
    }
    setRowData(0);
    this.results = tempResults;
}

Alone.prototype.setHiddenData = function () {
    $("[data-dll]").val(JSON.stringify(this.dll));
    $("[data-results]").val(JSON.stringify(this.results));
}

Alone.prototype.render = function() {
    var other = this;
    this.setDllData();
    this.setResults(this.dllData);

    var gettpl = document.getElementById('config-template').innerHTML;
    laytpl(gettpl).render(other, function(html){
        document.getElementById('config-view').innerHTML = html;
    });
    other.eventBind();

    other.setHiddenData();
}


// event （事件）
Alone.prototype.eventBind = function () {
    var other = this;

    // cell 事件
    $(".btn-add-cell").click(function () {
        $(this).hide();
        $(this).siblings().show();
    });
    $(".btn-confirm").click(function() {
        var input = $(this).siblings(".btn-add-input");
        var val = input.val().trim();
        if(val != "" && val != null) {
            var cate = $(this).parents(".cate-box");
            var idx = cate.attr("data-cata-index");
            other.dll[idx].items.push({'name': val, 'enable': false});
            other.render();
        }
    });
    $(".btn-confirm, .btn-cancel").click(function () {
        var inputs = $(this).parents(".btn-add-inputs");
        var addCateBtn = inputs.siblings(".btn-add-cell");
        inputs.hide();
        addCateBtn.show();
    });


    function getCellIdx(obj) {
        var cate, idxI, cell, idxJ;
        cate = $(obj).parents(".cate-box");
        idxI = cate.attr("data-cata-index");
        cell = $(obj).parents(".cell-cont");
        idxJ = cell.attr("data-cell-index");
    }
    $(".cell-cont [type='checkbox'], " +
        ".cell-cont .cell-edit, " +
        ".cate-name").change(function () {
        var cate, idxI, cell, idxJ;
        cate = $(this).parents(".cate-box");
        idxI = cate.attr("data-cata-index");
        cell = $(this).parents(".cell-cont");
        idxJ = cell.attr("data-cell-index");

        var cln = $(this).attr("class");
        if(this.type == "checkbox") {
            if(this.checked) {
                other.dll[idxI].items[idxJ].enable = true;
                other.render();
            } else {
                other.dll[idxI].items[idxJ].enable = false;
                other.render();
            }
        }
        if(cln != undefined) {
            if(cln.search("cell-edit") != -1) {
                var val = $(this).val().trim();
                other.dll[idxI].items[idxJ].name = val;
                other.render();
            }
            if(cln.search("cate-name") != -1) {
                var val = $(this).val().trim();
                other.dll[idxI].name = val;
                other.render();
            }
        }
    });

    // 表格表单数据监听
    $(".cate-group-result tbody input").change(function () {
        var row, rowI, cell, cellJ;
        row = $(this).parents("[data-result-row]");
        rowI = row.attr("data-result-row");
        cell = $(this).parents("[data-result-cell]");
        cellJ = cell.attr("data-result-cell");

        var val = $(this).val();
        other.results[rowI].values[cellJ] = val;
        other.render();
        console.log(other.results);
    });
}
