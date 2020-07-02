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
    initBarrageAni();
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
  }

  /**立即购买 */
  function btnBuyClick() {
    icom.alert('敬请期待');
  }

  /**开始播放 */
  function btnPlayClick() {
    setTimeout(function () {
      $('#btnPlay').fadeOut();
    }, 100)
    _video.play();
  }

  /**播放动效心 */
  function btnPointerClick() {
    isHeartAni = true;
    $('.heartbox').css({ opacity: 1 }).children('.heartcont').addClass('heart_on');
    setTimeout(function () {
      $('#btnPointer').fadeOut();
      // $('#barragePage').addClass('active');
      initBarrageAni();
    }, 2500);
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
    }, false);
  }

  /**弹幕动画 */
  var leafShell = $('#axisBox');
  var leafBody1 = leafShell.children('.box1');
  var leafBody2 = leafShell.children('.box2');
  var leafBody3 = leafShell.children('.box3');
  var leafBody4 = leafShell.children('.box4');
  var leafChd;
  var leafMax = 23;
  var axiosArr = [];

  function initBarrageAni() {
    // initGirds();
  }
  function initGirds() {
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    var bItemW = $('section.barragePage .tempBox').width() / 1.5;
    var bItemH = $('section.barragePage .tempBox').height();
    //列
    var bcolumn = 2;
    //行
    var brow = parseInt(screenHeight / bItemH);
    var gridSpace1 = 25;
    var gridSpace2 = 35;
    /**创建网格 */
    for (var i = 0; i < brow; i++) {
      for (var j = 0; j < bcolumn; j++) {
        axiosArr.push({
          x: Math.ceil(j * bItemW + j * gridSpace1),
          y: Math.ceil(i * bItemH + i * gridSpace2)
        })
      }
    }
    //打散数组
    dealLeaf(1);
    dealLeaf(2);
    dealLeaf(3);
    dealLeaf(4);
  }
  function dealLeaf(type) {
    axiosArr.sort(function () {
      return 0.5 - Math.random();
    });
    for (var i = 0; i < axiosArr.length; i++) leaf_creat(i, type);
  }
  function leaf_creat(id, type) {
    var num22 = Math.random();
    var scaleNum = num22 >= 0.6 ? num22 : num22 + 0.2;
    var css = { left: axiosArr[id].x, top: axiosArr[id].y, scale: 1};
    switch (type) {
      case 1:
        var leaf = $('<div class="itemBox itemBox' + (id + 1) + '"><img src="images/barrage/b' + (id) % leafMax + '.png" class="item"></div>').appendTo(leafBody1);
        break;
      case 2:
        var leaf = $('<div class="itemBox itemBox' + (id + 1) + '"><img src="images/barrage/b' + (id) % leafMax + '.png" class="item"></div>').appendTo(leafBody2);
        break;
      case 3:
        var leaf = $('<div class="itemBox itemBox' + (id + 1) + '"><img src="images/barrage/b' + (id) % leafMax + '.png" class="item"></div>').appendTo(leafBody3);
        break;
      case 4:
        var leaf = $('<div class="itemBox itemBox' + (id + 1) + '"><img src="images/barrage/b' + (id) % leafMax + '.png" class="item"></div>').appendTo(leafBody4);
        break;
    }
    leaf.css(css);
  }//edn func



  /**owerHoneyedPage */
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
    $('#owerHoneyedPage').addClass('active');
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
