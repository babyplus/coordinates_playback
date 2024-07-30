import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      count: 10,
      zoom: 18,
      interval: 500,
      selected: "a",
      markers_index: 0,
      markers_list_str: JSON.stringify([
        {"timestamp": 1722305573, "markers": {"a": {"coordinate": [23.308434503365063,113.21319057216644], "description": "a1"}, "b": {"coordinate": [23.308444503365063,113.21329057216644], "description": "b1"}}},
        {"timestamp": 1722305578, "markers": {"c": {"coordinate": [23.308854503365063,113.21339057216644], "description": "c1"}}},
        {"timestamp": 1722305583, "markers": {"a": {"coordinate": [23.308264503365063,113.21319057216644], "description": "a2"}}},
        {"timestamp": 1722305588, "markers": {"a": {"coordinate": [23.308284503365063,113.21319057216644], "description": "a3"}, "c": {"coordinate": [23.308044503365063,113.21339057216644], "description": "c2"}}}
    ])
    };
  }
});
