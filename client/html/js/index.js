$(document).ready(function () {
  //-----------------------------------------定义和初始化变量----------------------------------------
  var loadBox = $('aside.loadBox');
  var articleBox = $('article');
  var windowScale = window.innerWidth / 750;

  var _video = $('#video')[0];
  var isHeartAni = false;
  var soundList;

  //解锁包包
  var packageObj = {}
  var ticketData = '', ticketSrc = '';
  var _secretkey = 'dior-test';//上传到cdn的目录名称，上线后要改为正式地址

  //弹幕动画
  var leafMax = 23
  var pBoxList = []
  var planeList = []
  var planeListW = [146, 309, 309, 408, 283, 241, 376, 265, 322, 390, 322, 343, 246, 245, 245, 245, 245, 194, 224, 146, 381, 381, 272, 146]
  var s;
  //----------------------------------------有微信授权放这里  授权完在 icom.init(init)----------------------------------------

  icom.init(init); //初始化
  icom.screenScrollUnable(); //如果是一屏高度项目且在ios下，阻止屏幕默认滑动行为

  function init() {
    requestAnimationFrame(function () {
      var screenProp = window.innerWidth / window.innerHeight;
      console.log('os.screenProp:' + os.screenProp);
      if (os.screenProp < 0.54) articleBox.addClass('screen189');
      if (os.screenProp > 0.54 && os.screenProp < 0.62)
        articleBox.addClass('screenNormal');
      if (os.screenProp >= 0.62) articleBox.addClass('screen159');
      load_handler();
      sound_handler();
    });
  } //edn func

  //----------------------------------------加载页面图片----------------------------------------
  function load_handler() {
    var loader = new PxLoader();
    loader.addImage('images/common/turn_phone.png');

    //实际加载进度
    //		loader.addProgressListener(function(e) {
    //			var per=Math.round(e.completedCount/e.totalCount*50);
    //			loadPer.html(per+'%');
    //		});

    loader.addCompletionListener(function () {
      loadBox.hide();
      icom.fadeIn(articleBox);
      pageInit();
      //			load_timer(50);//模拟加载进度
      loader = null;
    });
    loader.start();
  } //end func

  //模拟加载进度
  function load_timer(per) {
    per = per || 0;
    per += imath.randomRange(1, 3);
    per = per > 100 ? 100 : per;
    loadPer.html(per + '%');
    if (per == 100) setTimeout(pageInit, 200);
    else setTimeout(load_timer, 33, per);
  } //edn func

  //------------------音乐
  function sound_handler() {
    if (os.weixin) {
      try {
        WeixinJSBridge.invoke('getNetworkType', {},
          sound_creat);
      } catch (e) {
        wx.ready(sound_creat);
      }
    } else sound_creat();
  } // end func
  var soundListArr = [{
    src: 'https://upload.cdn.be-xx.com/cilabo/sound/soundTimer.mp3'
  }];
  function sound_creat() {
    soundList = iaudio.on(soundListArr);
  } // end func



  //----------------------------------------页面逻辑代码----------------------------------------

  /**
   * 页面初始化
   */
  function pageInit() {
    timeUplate();
    videoEnd();
    eventInit();
    monitor_handler();
  } //end func

  function eventInit() {
    $('#btnPlay').on('click', btnPlayClick);
    $('#btnPointer').on('click', btnPointerClick);
    $('#owerHoneyedPage .close').on('click', function () {
      $('#owerHoneyedPage').removeClass('active');
      _video.play();
    });
    $('#sharePage .close').on('click', function () {
      $('#sharePage').removeClass('active');
    });
    //即刻分享
    $('.btnShare').on('click', btnShareClick);
    //立即购买
    $('.btnBuy').on('click', btnBuyClick);
  }

  /**即刻分享 */
  function btnShareClick() {
    $('#sharePage').addClass('active');
    setTimeout(image_combine, 1500);
    imonitor.add({ category: 'button', label: '即刻分享' }); // 监测
    imonitor.add({category: '虚拟页面', label: '即刻分享页'}); // 监测
  }

  /**立即购买 */
  function btnBuyClick() {
    icom.alert('敬请期待');
    imonitor.add({ category: 'button', label: '立即购买' }); // 监测
  }

  /**开始播放 */
  function btnPlayClick() {
    setTimeout(function () {
      $('#poster').fadeOut();
    }, 100)
    _video.play();
    imonitor.add({ category: 'button', label: '开始播放' }); // 监测
  }

  /**播放动效心 */
  function btnPointerClick() {
    isHeartAni = true;
    $('.heartbox').css({ opacity: 1 }).children('.heartcont').addClass('heart_on');
    setTimeout(function () {
      $('#btnPointer').fadeOut();
      $('#barragePage').addClass('active');
      initBarrageAni();
    }, 2200);
    imonitor.add({ category: 'button', label: '点击触点' }); // 监测
  }

  /**检测视频播放时长 */
  function timeUplate() {
    _video.addEventListener("timeupdate", function () {
      var timeDisplay;
      //用秒数来显示当前播放进度
      timeDisplay = Math.floor(_video.currentTime);
      //当视频播放到 4s的时候做处理
      if (timeDisplay == 4 && !isHeartAni) {
        //处理代码
        $('#btnPointer').fadeIn();
        _video.pause();
      }
    }, false);
  }

  /**检测视频播放完毕 */
  function videoEnd() {
    _video.addEventListener('ended', function () {
      //结束
      $('#buyPage').addClass('active');
      imonitor.add({category: '虚拟页面', label: '立即购买/即刻分享页'}); // 监测
    }, false);
  }

  /**弹幕动画 */
  function initBarrageAni() {
    initAni()
  }
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
          $('#axisBox').fadeOut();
          initOwerHoneyedPage();
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
      requestAnimationFrame(go)
    }
    // =================
    go()
    aniStart();
  }


  /**解谜产品*/
  function initOwerHoneyedPage() {
    if (!window.localStorage.packageNum) {
      var num = imath.randomRange(1, 6);
      window.localStorage.packageNum = num;
    } else {
      var num = Number(window.localStorage.packageNum);
    }
    packageObj.title = 'images/package/p' + num + '_tit.png';
    packageObj.txt = 'images/package/p' + num + '_txt.png';
    packageObj.box = 'images/package/p' + num + '.png';
    $('.p_tit').attr('src', packageObj.title);
    $('.p_txt').attr('src', packageObj.txt);
    $('.p_box').attr('src', packageObj.box);
    if ((num == 4 || num == 6)) {
      $('.p_box').parent('.boxCon').addClass('boxCon4');
    } else {
      $('.p_box').parent('.boxCon').removeClass('boxCon4');
    }
    soundList.soundTimer.play();
    $('#owerHoneyedPage').addClass('active');
    imonitor.add({category: '虚拟页面', label: '互动结果页'}); // 监测
  }


  // =======================合成图片
  function image_combine() {
    var imgContent = $('#imgCanvas');
    html2canvas(imgContent[0], {
      logging: false,
      useCORS: true,
      dpi: window.devicePixelRatio,
      scale: 2,
    }).then(canvas => {
      var base = canvas.toDataURL('image/jpeg', 1);
      var img = new Image();
      img.onload = function () {
        $('<img src="' + base + '">').appendTo($('#imgContent'));
        console.log('合并完成');
        loadBox.hide();
        $('#imgContent').show();
        ticketData = base;
        //上传到cdn
        // uolpadBase64();
      };
      img.src = base;
    });
  } // end func

  // 上传到cdn
  function uolpadBase64() {
    base64_send(ticketData, image_combine_complete, _secretkey);
  } // edn func

  function base64_send(data, callback, secretkey) {
    $.post(apirul, { data: data, key: secretkey }, function (resp) {
      var resp = JSON.parse(resp);
      if (resp.errcode == 0) {
        callback(resp.result);
      } // edn if
      else {
        console.log('errmsg:' + resp.errmsg);
        icom.alert(resp.errmsg);
        loadBox.hide();
      } // edn else
    });
  } // end func

  function image_combine_complete(src) {
    ticketSrc = src;
    console.log('ticketSrc:' + ticketSrc);
    loadBox.hide();
    //==上传到后台
  } // end func





  //----------------------------------------页面监测代码----------------------------------------
  function monitor_handler() {
    //		imonitor.add({obj:$('a.btnTest'),action:'touchstart',category:'default',label:'测试按钮'});
  } //end func
}); //end ready
