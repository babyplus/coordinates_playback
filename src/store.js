import { createStore } from 'vuex';
import { INIT } from '@/values'

export default createStore({
state() {
    return {
        play: 0,
        playing: false,
        stop: false,
        pause: false,
        zoom: INIT.zoom,
        interval: INIT.interval,
        selected: INIT.selected,
        current_timestamp: 0,
        current_coordinate: [],
        current_key: "",
        markers_index: INIT.markers_index,
        markers_list_str: JSON.stringify([
            {"timestamp":1722398722,"markers":{"a":{"coordinate":[23.1167395503137,113.30694794654846],"description":"a1","data":{"x":0,"y":1}},"b":{"coordinate":[23.1167395503137,113.30694794654846],"description":"b1","data":{"x":0,"y":1}}}},
            {"timestamp":1722398772,"markers":{"a":{"coordinate":[23.117158913471393,113.30696940422058],"description":"a2","data":{"x":0,"y":1}},"b":{"coordinate":[23.117158913471393,113.30696940422058],"description":"b2","data":{"x":0,"y":1}}}},
            {"timestamp":1722398827,"markers":{"b":{"coordinate":[23.11714904611803,113.3063954114914],"description":"b3","data":{"x":0,"y":1}}}},
            {"timestamp":1722398872,"markers":{"a":{"coordinate":[23.117168780824034,113.3078920841217],"description":"a3","data":{"x":0,"y":1}}}},
            {"timestamp":1722398982,"markers":{"b":{"coordinate":[23.118535402156404,113.30651342868805],"description":"b4","data":{"x":0,"y":1}}}},
            {"timestamp":1722398997,"markers":{"b":{"coordinate":[23.118540335782203,113.30667972564697],"description":"b5","data":{"x":0,"y":1}}}},
            {"timestamp":1722399022,"markers":{"a":{"coordinate":[23.118530468530412,113.30795645713806],"description":"a4","data":{"x":0,"y":1}}}},
            {"timestamp":1722399142,"markers":{"b":{"coordinate":[23.119818138760316,113.30665290355682],"description":"b6","data":{"x":-7,"y":1}}}},
            {"timestamp":1722399197,"markers":{"a":{"coordinate":[23.118535402156404,113.30968916416168],"description":"a5","data":{"x":0,"y":321}}}},
            {"timestamp":1722399272,"markers":{"b":{"coordinate":[23.11985760738448,113.307945728302],"description":"b7","data":{"x":0,"y":1}}}},
            {"timestamp":1722399307,"markers":{"b":{"coordinate":[23.119892142421083,113.30829441547394],"description":"b8","data":{"x":0,"y":1}}}},
            {"timestamp":1722399352,"markers":{"a":{"coordinate":[23.11985760738448,113.30960869789124],"description":"a6","data":{"x":0,"y":1}}}},
            {"timestamp":1722399452,"markers":{"a":{"coordinate":[23.120859119837906,113.30957114696501],"description":"a7","data":{"x":0,"y":1}}}},
            {"timestamp":1722399462,"markers":{"b":{"coordinate":[23.121234068390123,113.30823540687561],"description":"b9","data":{"x":0,"y":1}}}},
            {"timestamp":1722399557,"markers":{"b":{"coordinate":[23.122136900737065,113.30848217010497],"description":"b10","data":{"x":0,"y":1}}}},
            {"timestamp":1722399562,"markers":{"a":{"coordinate":[23.121752087692606,113.30955505371094],"description":"a8","data":{"x":0,"y":1}}}},
            {"timestamp":1722399602,"markers":{"a":{"coordinate":[23.122018496840923,113.30929756164551],"description":"a9","data":{"x":0,"y":1}}}}
            ]),
        custom_hooks_str: JSON.stringify([
            {"actions":["selected","speed_10","zoom_18"],"conditions":[{"GT": [-3, "x"]}]},
            {"actions":["selected","speed_500","zoom_17"],"conditions":[{"EQ": [321, "y"]}]}
            ])
        };
    }
});
