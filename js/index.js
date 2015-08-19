/**
 * Created by hui on 2015/8/19.
 */

$(document).ready(function () {
    var dll = [
        //{
        //    name : 'Color',
        //    items : [
        //        {'id': 0, 'name' : 'red', 'enable' : true},
        //        {'id': 1, 'name' : 'green', 'enable' : true},
        //        {'id': 2, 'name' : 'orange', 'enable' : true}
        //    ]
        //},
        {
            name : 'Spec',
            items : [
                {'id': 0, 'name' : 'spec1', 'enable' : true},
                {'id': 1, 'name' : 'spec2', 'enable' : true},
                {'id': 2, 'name' : 'spec3', 'enable' : false}
            ]
        },
        {
            name : 'Size',
            items : [
                {'id': 0, 'name' : 'size1', 'enable' : true},
                {'id': 1, 'name' : 'size2', 'enable' : true},
                {'id': 2, 'name' : 'size3', 'enable' : false}
            ]
        }
    ];

    var otherKey = ["市场价", "价格", "库存", "预警值", "商家货号"];

    var alone = new Alone(dll, otherKey);
    alone.render();
});