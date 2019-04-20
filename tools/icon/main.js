/* global html2canvas,_ */
var lazyLayout = _.debounce(generate, 500);

function generate() {
  html2canvas(document.querySelector('.color-chip'), {

    scale: 0.5
  }).then(function (canvas) {
    // document.body.appendChild(canvas);
    // console.log(canvas.toDataURL());
    // console.log(tpl.replace('{url}', canvas.toDataURL()));
    // document.querySelector('img').src = canvas.toDataURL();
    // var win = window.open();
    // win.document.documentElement.innerHTML = tpl.replace('{url}', canvas.toDataURL()).replace('{tit}', document.querySelector('.color-chip__subtitle').innerHTML);
    // console.log(win);
    document.querySelector('#make').href=tpl.replace('{url}', canvas.toDataURL()).replace('{tit}', document.querySelector('.color-chip__subtitle').innerHTML)
  });
}

var tpl = `
data:text/html;charset=utf-8,<head>
<meta name='viewport' content='width=320, user-scalable=no' />

<link rel='apple-touch-icon-precomposed' href='{url}' />

<title>{tit}</title>

<meta name='apple-mobile-web-app-capable' content='yes'/>

</head>

<body>Safari浏览器底部箭头分享按钮，然后“添加到主屏幕”<br><img style="width:150px;display:block;margin:0 auto;" src="https://bobscript.com/usr/uploads/tools/icon/tip.gif"></body>
`

Vue.component('editable',{
  template:'<div contenteditable="true" @input="update"></div>',
  props:['content'],
  mounted:function(){
    this.$el.innerText = this.content;
  },
  methods:{
    update:function(event){
      this.$emit('update',event.target.innerText);
    }
  }
})

Vue.component("color-picker", {
  template: "#color-picker-template",
  props: ["change", "initial"],
  data: function () {
    var text=localStorage.getItem('icontooltext');
    if(text){
      text=text.replace(/^\s*(.*?)\s*$/g,'$1');
    }
    text=text||'Click To Edit';
    return {
      text: text,
      isVisible: true,
      h: localStorage.getItem('icontoolh') || 63,
      s: localStorage.getItem('icontools') || 99,
      l: localStorage.getItem('icontooll') || 80,
      hf: localStorage.getItem('icontoolhf') || 200,
      sf: localStorage.getItem('icontoollf') || 80,
      lf: localStorage.getItem('icontoolsf') || 99,
      size: localStorage.getItem('icontoolsize') || 40
    }
  },
  computed: {
    color: function () {
      var hsl = hsb2hsl(parseFloat(this.h) / 360, parseFloat(this.s) / 100, parseFloat(this.l) / 100)

      var c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%";

      var s = "hsl(" + c + ")";
      this.change({
        color: s
      });
      return s;
    },
    colorf: function () {
      var hsl = hsb2hsl(parseFloat(this.hf) / 360, parseFloat(this.sf) / 100, parseFloat(this.lf) / 100)

      var c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%";

      var s = "hsl(" + c + ")";
      this.change({
        colorf: s
      });
      return s;
    },
    colorString: function () {
      var c = this.h + ", " + this.s + "%, " + this.l + "%"
      return c;
    },
    gradientH: function () {
      var stops = [];
      for (var i = 0; i < 7; i++) {
        var h = i * 60;

        var hsl = hsb2hsl(parseFloat(h / 360), parseFloat(this.s) / 100, parseFloat(this.l / 100))

        var c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%"
        stops.push("hsl(" + c + ")")
      }

      return {
        backgroundImage: "linear-gradient(to right, " + stops.join(', ') + ")"
      }
    },
    gradientS: function () {
      var stops = [];
      var c;
      var hsl = hsb2hsl(parseFloat(this.h / 360), 0, parseFloat(this.l / 100))
      c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%"
      stops.push("hsl(" + c + ")")

      hsl = hsb2hsl(parseFloat(this.h / 360), 1, parseFloat(this.l / 100))
      c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%"
      stops.push("hsl(" + c + ")")

      return {
        backgroundImage: "linear-gradient(to right, " + stops.join(', ') + ")"
      }
    },

    gradientL: function () {
      var stops = [];
      var c;

      var hsl = hsb2hsl(parseFloat(this.h / 360), 0, 0)
      c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%"
      stops.push("hsl(" + c + ")")

      hsl = hsb2hsl(parseFloat(this.h / 360), parseFloat(this.s / 100), 1)

      c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%"
      stops.push("hsl(" + c + ")")

      return {
        backgroundImage: "linear-gradient(to right, " + stops.join(', ') + ")"

      }
    },
    gradientHf: function () {
      var stops = [];
      for (var i = 0; i < 7; i++) {
        var h = i * 60;

        var hsl = hsb2hsl(parseFloat(h / 360), parseFloat(this.sf) / 100, parseFloat(this.lf / 100))

        var c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%"
        stops.push("hsl(" + c + ")")
      }

      return {
        backgroundImage: "linear-gradient(to right, " + stops.join(', ') + ")"
      }
    },
    gradientSf: function () {
      var stops = [];
      var c;
      var hsl = hsb2hsl(parseFloat(this.hf / 360), 0, parseFloat(this.lf / 100))
      c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%"
      stops.push("hsl(" + c + ")")

      hsl = hsb2hsl(parseFloat(this.hf / 360), 1, parseFloat(this.lf / 100))
      c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%"
      stops.push("hsl(" + c + ")")

      return {
        backgroundImage: "linear-gradient(to right, " + stops.join(', ') + ")"
      }
    },

    gradientLf: function () {
      var stops = [];
      var c;

      var hsl = hsb2hsl(parseFloat(this.hf / 360), 0, 0)
      c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%"
      stops.push("hsl(" + c + ")")

      hsl = hsb2hsl(parseFloat(this.hf / 360), parseFloat(this.sf / 100), 1)

      c = hsl.h + ", " + hsl.s + "%, " + hsl.l + "%"
      stops.push("hsl(" + c + ")")

      return {
        backgroundImage: "linear-gradient(to right, " + stops.join(', ') + ")"

      }
    }
  },
  methods: {

    show: function () {
      this.isVisible = true;
    },
    hide: function () {
      this.isVisible = false;
    },
    toggle: function () {
      this.isVisible = !this.isVisible;
    }
  },
  watch: {
    h: function (val) {
      localStorage.setItem('icontoolh', val);
      lazyLayout();
    },
    s: function (val) {
      localStorage.setItem('icontools', val);
      lazyLayout();
    },
    l: function (val) {
      localStorage.setItem('icontooll', val);
      lazyLayout();
    },
    hf: function (val) {
      localStorage.setItem('icontoolhf', val);
      lazyLayout();
    },
    sf: function (val) {
      localStorage.setItem('icontoolsf', val);
      lazyLayout();
    },
    lf: function (val) {
      localStorage.setItem('icontoollf', val);
      lazyLayout();
    },
    size: function (val) {
      localStorage.setItem('icontoolsize', val);
      lazyLayout();
    },
    text: function (val) {
      localStorage.setItem('icontooltext', val);
      lazyLayout();
      // console.log('watch',val);
    }
  },
  mounted: function () {
    // this.h = localStorage.getItem('icontoolh') || 63;
    // this.l = localStorage.getItem('icontooll') || 80;
    // this.s = localStorage.getItem('icontools') || 99;
    // this.hf = localStorage.getItem('icontoolhf') || 200;
    // this.lf = localStorage.getItem('icontoollf') || 80;
    // this.sf = localStorage.getItem('icontoolsf') || 99;
    // this.size = localStorage.getItem('icontoolsize') || 40;
    // this.text = localStorage.getItem('icontooltext') || 'Click To Edit';
    // this.text=this.text.replace(/^\s*(.*?)\s*$/g,'$1') || 'Click To Edit';
    // console.log('mounted',this.text);
    lazyLayout();
  }
})

var app = new Vue({
  el: "#app",
  data: {
    color: ""
  },
  methods: {
    updateColor: function (event) {
      this.color = event.color;
    }
  }
})

function hsb2hsl(h, s, b) {
  var hsl = {
    h: h
  };
  hsl.l = (2 - s) * b;
  hsl.s = s * b;

  if (hsl.l <= 1 && hsl.l > 0) {
    hsl.s /= hsl.l;
  } else {
    hsl.s /= 2 - hsl.l;
  }

  hsl.l /= 2;

  if (hsl.s > 1) {
    hsl.s = 1;
  }

  if (!hsl.s > 0) hsl.s = 0


  hsl.h *= 360;
  hsl.s *= 100;
  hsl.l *= 100;

  return hsl;
}

