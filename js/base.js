"use strict";
/**
 * Created by hui on 2015/8/18.
 */

window.Alone = function() {
    // data
    this.dll = [
        {
            name : 'Color',
            items : [
                {'name' : 'red', 'enable' : true},
                {'name' : 'green', 'enable' : true},
                {'name' : 'orange', 'enable' : true}
            ]
        },
        {
            name : 'Spec',
            items : [
                {'name' : 'spec1', 'enable' : true},
                {'name' : 'spec2', 'enable' : true},
                {'name' : 'spec3', 'enable' : false}
            ]
        },
        {
            name : 'Size',
            items : [
                {'name' : 'size1', 'enable' : true},
                {'name' : 'size2', 'enable' : true},
                {'name' : 'size3', 'enable' : false}
            ]
        }
    ];
    this.otherKey = ["市场价", "价格", "库存", "预警值", "商家货号"];

    this.dllData = [
        ['red',  'green', 'orange'],
        ['spec1',  'spec2'],
        ['size1',  'size2']
    ];
    this.values = {
        '0_0_0' :  {'price' : '100', 'price2' : '101'},
        '0_0_1' :  {'price' : '200', 'price2' : '201'}
    };

    this.results = [];
}
// 方法
Alone.prototype.loopN = function(data, values) {
    var other = this;
    var head = '';
    var n = data.length,
        stack = [];
    var html = '';
    var results = [];
    var render = function(l) {
        if(l == n){
            var resultEle = [];
            for(var i = 0; i < stack.length; i++) {
                resultEle.push(stack[i].value);
            }

            var key = '';
            for(var i = 0; i < n; i++) {
                key += '_' + stack[i].index;
            }
            key = key.replace(/^_/, '');

            var vals = values[key];
            var otherVal = [];
            if(vals) {
                for (key in vals) {
                    otherVal.push(vals[key]);
                }
            }
            for(var i = 0; i < other.otherKey.length; i++) {
                var otherCellVal = otherVal[i];
                otherCellVal? resultEle.push(otherVal[i]) : resultEle.push(" ");
            }

            results.push(resultEle);
            return;
        }

        var j = data[l].length;
        for(i = 0; i < j; i++) {
            stack[l] = {'index' : i, 'value' : data[l][i]};
            render(l + 1);
        }
    }
    render(0);
    this.results = results;
    console.log(this.results);
}
Alone.prototype.render = function() {
    var other = this;
    this.loopN(this.dllData, this.values);


    var gettpl = document.getElementById('config-template').innerHTML;
    laytpl(gettpl).render(other, function(html){
        document.getElementById('config-view').innerHTML = html;
    });
}

Alone.prototype.setDll = function(dll) {
    var cates = $(".cate-box");
    var tempDll = [];
    for(var i = 0; i < cates.length; i++) {
        tempDll.push({});
        tempDll[i].name = cates.find(".cate-name").val();
        tempDll[i].items = [];
        var cells = cates.find(".cell-cont");
        for(var j = 0; j < cells.length; j++) {
            tempDll[i].items.push({});
            var cellObj = tempDll[i].items[j];
            var cellDom = $(cells[j]);
            cellObj.name = cellDom.find("span").text();
            cellObj.enable = cellDom.find("input")[0].checked;
        }
    }
    this.dll = tempDll;
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
    this.dllData = tempDllData;
}

// todo
Alone.prototype.setValues = function () {

}

// event （事件）
Alone.prototype.cateWatch = function () {
    $(".cate-box input")
}
Alone.prototype.cellWatch = function () {

}
