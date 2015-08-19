/**
 * Created by hui on 2015/8/19.
 */

$(document).ready(function () {
    var dll = [
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

    var otherKey = ["市场价", "价格", "库存", "预警值", "商家货号"];

    var alone = new Alone(dll, otherKey);
    alone.render();
});