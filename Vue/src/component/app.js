const app = Vue.createApp({});

app.component("div-header", {
  data() {
    return {
      text: "Header",
    };
  },
  template:
    "<div class='header'><div class = 'headerText'>{{ text }}</div></div>",
});

app.component("div-main", {
  data() {
    return {
      internalneeds: [
        {
          orderName: "orderItem 1",
          orderDate: "2021-04-30T23:00:00+0000",
        },
        {
          orderName: "orderItem 2",
          orderDate: "2021-04-30T23:00:00+0000",
        },
        {
          orderName: "orderItem 3",
          orderDate: "2021-04-30T23:00:00+0000",
        },
        {
          orderName: "orderItem 4",
          orderDate: "2021-04-30T23:00:00+0000",
        },
      ],
      shoppingcart: [
        {
          orderName: "orderItem 5",
          orderDate: "2021-04-30T23:00:00+0000",
        },
        {
          orderName: "orderItem 6",
          orderDate: "2021-04-30T23:00:00+0000",
        },
        {
          orderName: "orderItem 7",
          orderDate: "2021-04-30T23:00:00+0000",
        },
        {
          orderName: "orderItem 8",
          orderDate: "2021-04-30T23:00:00+0000",
        },
      ],
    };
  },
  template:
    "<div class='container'>Body<div class='placeHolder'>" +
    "<table ><tr><div><td class = 'internalneeds' style='padding-left:100px;'>Interner Bedarf</td></div><td class = 'shoppingcart' style='padding-left:100px;'>Einkaufswagen</td></tr><tr>" +
    "<td><div-cart  draggable = 'true'  @dragstart='startDrag($event, block, index)'   v-bind:items= 'internalneeds' v-bind:sourceItems= 'shoppingcart'></td>" +
    "<td><div-cart   v-bind:sourceItems= 'internalneeds' v-bind:items= 'shoppingcart'></div-cart></td>" +
    "</tr></table></div></div>",
});

app.component("div-cart", {
  props: {
    title: String,
    items: Array,
    sourceItems: Array,
  },
  methods: {
    startDrag: function (evt, block, index) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("item", JSON.stringify(block));
      evt.dataTransfer.setData("index", index);
    },
    onDrop: function (evt, destList, sourceList) {
      var item = evt.dataTransfer.getData("item");
      destList.push(JSON.parse(item));
      var index = evt.dataTransfer.getData("index");
      sourceList.splice(index, 1);
      evt.stopPropagation();
    },
  },
  template:
    "<div class='test' @dragover.prevent @dragenter.prevent @drop='onDrop($event, items, sourceItems)'><div  v-for= '(block, index) in items'   @dragstart='startDrag($event, block, index)' @drop='onDrop($event, items, sourceItems)'>" +
    "<div class ='item' draggable = 'true'><p class = 'orderName'>{{block.orderName}}<br/>{{block.orderDate.substring(0, 10)}}</p></div></div></div>",
});

app.component("div-footer", {
  data() {
    return {
      text: "Footer",
    };
  },
  template: "<div class='footer'>{{text}}</div>",
});
app.mount("#main");
