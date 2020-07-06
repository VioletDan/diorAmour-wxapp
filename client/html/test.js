$(document).ready(function () {

  // -----------------------------------------定义和初始化变量----------------------------------------
  var loadBox = $('aside.loadBox')
  var articleBox = $('article')
  var windowScale = window.innerWidth / 750

  // ----------------------------------------有微信授权放这里  授权完在 icom.init(init)----------------------------------------

  icom.init(init); // 初始化
  icom.screenScrollUnable(); // 如果是一屏高度项目且在ios下，阻止屏幕默认滑动行为

  function init () {
    requestAnimationFrame(function () {
      var screenProp = window.innerWidth / window.innerHeight
      console.log('os.screenProp:' + os.screenProp)
      if (screenProp < 0.54) articleBox.addClass('screen189')
      if (screenProp > 0.64) articleBox.addClass('screen159')
      load_handler()
    })
  } // edn func

  // ----------------------------------------加载页面图片----------------------------------------
  function load_handler () {
    var loader = new PxLoader()
    loader.addImage('images/common/turn_phone.png')

    // 实际加载进度
    //		loader.addProgressListener(function(e) {
    //			var per=Math.round(e.completedCount/e.totalCount*50)
    //			loadPer.html(per+'%')
    //		})

    loader.addCompletionListener(function () {
      loadBox.hide()
      icom.fadeIn(articleBox)
      pageInit()
      //			load_timer(50);//模拟加载进度
      loader = null
    })
    loader.start()
  } // end func

  // 模拟加载进度
  function load_timer (per) {
    per = per || 0
    per += imath.randomRange(1, 3)
    per = per > 100 ? 100 : per
    loadPer.html(per + '%')
    if (per == 100) setTimeout(pageInit, 200)
    else setTimeout(load_timer, 33, per)
  } // edn func

  // ----------------------------------------页面逻辑代码----------------------------------------

  /**
   * 页面初始化
   */
  function pageInit () {
    monitor_handler()
    initAni()

  // icom.countdown($('.btnCode'), 60, '#s')
  } // end func
  var leafMax = 23
  var pBoxList = []
  var planeList = []
  var planeListW = [146, 309, 309, 408, 283, 241, 376, 265, 322, 390, 322, 343, 246, 245, 245, 245, 245, 194, 224, 146, 381, 381, 272, 146]
  var s
  function initAni () {
    // 创建场景
    s = new C3D.Stage()
    s.size(window.innerWidth, window.innerHeight).material({
      color: 'transparent'
    }).id('Box')
      .update()
    $('#axisBox').append(s.el)

    // 创建一个三维容器(创建以方便分组使用)
    var sp = new C3D.Sprite()
    sp.position(0, 0, -500)
    s.addChild(sp)

    // 创建60个平面放入容器，并定义鼠标事件
    for (var i = 0; i < 60; i++) {
      var pBox = new C3D.Sprite()
      var p = new C3D.Plane()
      var x = Math.random() * 500 - 250
      var y = Math.random() * 500 - 250
      var z = Math.random() * 500 - 250

      // 装图片的容器
      pBox
        .position(x, y, z)
        .update()

      // 图片容器planeListW[(i) % leafMax] * 42 / 83, 42
      p.size(planeListW[(i) % leafMax] * 42 / 83, 42)
        .position(0, 0, 0)
        .material({
          // color: C3D.getRandomColor()
          image: 'images/barrage/b' + (i) % leafMax + '.png',
          size: 'cover'
        })
        .scale(0.75)
        .update()

      sp.addChild(pBox)
      pBox.addChild(p)

      pBoxList.push(pBox)
      planeList.push(p)
    }

    // 响应屏幕调整尺寸
    function resize () {
      s.size(window.innerWidth, window.innerHeight).update()
    }
    window.onresize = function () {
      resize()
    }
    resize()

    // 刷新场景
    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
    function (callback) {
      setTimeout(callback, 1000 / 60)
    }

    function aniStart () {
      aniPlane()
      setTimeout(function () {
        aniPBox()
        aniSky()
      }, 0)
    }

    // ==================== aniPlane ====================
    function aniPlane () {
      var i, len = planeList.length
      for (i = 0; i < len; i++) {
        (function (index) {
          tweenPlane(planeList[index], index)
        })(i)
      }
    }
    function tweenPlane (plane, index) {
      JT.from(plane, 1, {
        x: 0,
        z: 0,
        scaleX: .01,
        scaleY: .01,
        scaleZ: .01,
        delay: .05 * index,
        ease: JT.Quad.Out,
        onUpdate: function () {
          this.target.updateT()
        },
        onStart: function () {
          this.target.visibility({
            alpha: 1
          }).updateV()
        },
        onEnd() {
          JT.to(this.target, 1, {
            alpha: 0,
            scaleX: 0,
            scaleY: 0,
            scaleZ: 0,
            x: -2.5 * index,
            y:-2.5 * index,
            delay: .05 * index,
            ease: JT.linear,
            onUpdate: function () {
              this.target.updateT()
            }
          })
        }
      })
    }
    // ==================== aniSky ====================
    function aniSky () {
      JT.to(sp, 2, {
        rotationY: -360,
        delay: 2.5,
        repeat: 2,
        ease: JT.linear,
        onUpdate: function () {
          this.target.updateT().updateV()
        }, onEnd: function () {
          this.target.updateT().updateV()
          $('#axisBox').fadeOut()
        }
      })
    }
    function aniPBox () {
      var i, len = pBoxList.length
      for (i = 0; i < len; i++) {
        (function (pBox, i) {
          JT.to(pBox, 2, {
            rotationY: 360,
            delay: 2.5,
            repeat: 2,
            ease: JT.linear,
            onUpdate: function () {
              this.target.updateT().updateV()
            }, onEnd: function () {
              this.target.updateT().updateV()
            }
          })
        })(pBoxList[i], i)
      }
    }
    // ==================== aniSky ====================

    function go (time) {
      // sp.rotate(0, 0.1, 0).updateT()
      // sp.move(0, 1, 0).update()

      requestAnimationFrame(go)

    // TWEEN.update(time)
    }

    // =================

    go()
    aniStart()
  }

  // ----------------------------------------页面监测代码----------------------------------------
  function monitor_handler () {
    //		imonitor.add({obj:$('a.btnTest'),action:'touchstart',category:'default',label:'测试按钮'})
  } // end func
}) // end ready
