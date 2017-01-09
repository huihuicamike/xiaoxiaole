
//存放页面元素的类型
var arr_ele = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
]

//判断是否可以添加动物头像元素
function couldAdd(row, column ,type){

    var leftCount = 0;
    for(var i=column-1;i>=0;i--)
    {
      if(arr_ele[row][i] == type)
        leftCount ++;
      else break;
    }

    var rightCount = 0;
    for(var i=column+1;i<arr_ele[0].length;i++)
    {
      if(arr_ele[row][i] == type)
        rightCount++;
      else break;
    }

    var topCount = 0;
    for(var i= row-1; i>=0;i--)
    {
      if(arr_ele[i][column] == type)
        topCount++;
      else break;
    }
    var bottomCount = 0;
    for(var i= row+1; i<arr_ele.length;i++)
    {
      if(arr_ele[i][column] == type)
        bottomCount++;
      else break;
    }

    if(leftCount+rightCount+1 >=3 || topCount+bottomCount+1 >=3)
      return false;

    return true;

}

//刚载入游戏场景的层
var myLayer = cc.Layer.extend({
    sprite:null,
    s_sprite:null,
    start_label:null,

    ctor:function(){
      this._super();

      var size = cc.director.getWinSize();

      this.sprite = new cc.Sprite(res_resources[0]);
      this.sprite.setPosition(size.width / 2,size.height / 2);
      this.sprite.setAnchorPoint(0.5,0.5);
      this.addChild(this.sprite,1);



    cc.spriteFrameCache.addSpriteFrames("res/loading@2x.818b1300e2db03f616a53bb8b6172270.plist");
      //var batchNode = new cc.SpriteBatchNode(g_menu);
    //  this.addChild(batchNode)loading_button_blue0000
     this.s_sprite = new cc.Sprite("#loading_button_blue0000");
     this.s_sprite.setPosition(size.width/ 2,size.height * 0.3);
     this.s_sprite.setAnchorPoint(0.5,0.5);
     this.addChild(this.s_sprite,1);

     this.start_label = new cc.LabelTTF("开始游戏","宋体",32);
     this.start_label.setPosition(30,20);
     this.start_label.setAnchorPoint(0,0);
     this.s_sprite.addChild(this.start_label,2);

     if('mouse' in cc.sys.capabilities){
       cc.eventManager.addListener({
         event:cc.EventListener.MOUSE,
         onMouseDown:function(event){
           var pos = event.getLocation();
           var target = event.getCurrentTarget();

           cc.director.runScene(new cc.TransitionSlideInL(2,new gameScene()));

         }
       },this.start_label)
     }

    },
})

//点击开始游戏进入场景中的层
var gameLayer = cc.Layer.extend({
    ui:null,
    steps : 0,
    level : 0,
    score : 0,
    limitStep : 0,
    left_space:0,

  ctor:function(){
    this._super();

    var size = cc.director.getWinSize();

    var background = new cc.Sprite(res_resources[0]);
    background.setPosition(size.width / 2, size.height / 2);
    background.setAnchorPoint(0.5,0.5);

    this.addChild(background,0);

    cc.spriteFrameCache.addSpriteFrames(g_homelist);
    cc.spriteFrameCache.addSpriteFrames(g_ele);
    //buffalo 水牛  "#target.order1_1 instance 10000"
    //flog  青蛙   "#target.order1_2 instance 10000"
    //bear 熊  "#target.order1_3 instance 10000"
    //owl 猫头鹰  "#target.order1_4 instance 10000"
    //fox 狐狸  "#target.order1_5 instance 10000"
    //chick 小鸡  "#target.order1_6 instance 10000"
    //blackbear 黑熊  "#target.order2_1 instance 10000"
    //start blackbeag 有星星的黑熊  "#target.order2_2 instance 10000"

      //存放动物精灵元素图片
    var arrs = ["#target.order1_1 instance 10000","#target.order1_2 instance 10000","#target.order1_3 instance 10000","#target.order1_4 instance 10000","#target.order1_5 instance 10000","#target.order1_6 instance 10000",]

   //存放精灵元素阵列

    for(var i = 0; i < 6; i++){

      for(var j = 0; j < 10; j++){

        //存放动物头像的框子
        var y= new cc.Sprite("#area_icon_360000");
          ANIMALS_WIDTH = y.width * 0.6;
        y.setPosition(ANIMALS_WIDTH * (j) + ANIMALS_WIDTH * 2,size.height - ANIMALS_WIDTH * (i+1.5));

        this.addChild(y,1);

       //随机取出一个动物元素
       //先判断该元素是否符合规则，如果符合规则，则添加到框子层中
        var h = Math.floor(Math.random() * Constant.ANIMALS_TYPE_COUNT);

          //循环，取出的图片可以添加则退出，否则继续循环
        while(!couldAdd(i,j,h+1))
        h = Math.floor(Math.random() * Constant.ANIMALS_TYPE_COUNT);

          //存放动物类型
        arr_ele[i][j] = h+1;

        var m = y.width / 2.1;                  //终点横坐标
        var n = y.height / 2;                   //终点纵坐标
        var flog = new Animal(arrs[h],m,n);    //new一个精灵

        flog.setPosition(flog.finalX,flog.finalY + ANIMALS_WIDTH * 6);     //设置精灵的起始坐标
        flog.setScale(0.9);                                                        //精灵的缩放
        flog.action = cc.moveTo(1.5,cc.p(flog.finalX,flog.finalY));              //精灵定义一个动作
        flog.action.easing(cc.easeIn(1.5));
        y.addChild(flog,2);                                                        //精灵添加到层上
        animals[animals.length] = flog;                                           //新建的精灵存到一个数组里，以便统一管理


      }
    }

    this.scheduleOnce(function(){
      for(var i =0;i<animals.length;i++)
      {
          animals[i].runAction(animals[i].action)
      }
    },1.5)

      this.ui = new GameUI(this);
      this.addChild(this.ui,3);


  },



    //成功通关提示框
    showSuccess:function(){

        var ses = new cc.LayerColor(cc.color(255,255,255),250,200);
        var size = cc.director.getWinSize();
        ses.setPosition(size.width / 2 - 125,size.height / 2 -100);
        ses.setAnchorPoint(0.5,0.5);
        this.addChild(ses,2);

        var sucText = new cc.LabelTTF("恭喜你,已通过第" + this.levelText +"关","arial",20);
        sucText.setColor(cc.color(0,0,0));
        sucText._setWidth(250);
        sucText.x = 125;
        sucText.y = 100;
        ses.addChild(sucText,2);
    },

    //通关失败提示框
    showFail:function(){
        var fail = new cc.LayerColor(cc.color(255,255,255),250,200);
        var size = cc.director.getWinSize();
        fail.setPosition(size.width / 2 - 125,size.height / 2 - 100);
        this.addChild(fail,1);

        var sucText = new cc.LabelTTF("很遗憾,没通过第" + this.levelText+"关","arial",20);
        sucText.setColor(cc.color(0,0,0));
        sucText.x = 125;
        sucText.y = 100;
        fail.addChild(sucText,1);
    }
})

//开始游戏的场景
var myScene = cc.Scene.extend({
      onEnter:function(){
        this._super();

        this.addChild(new myLayer(),1);

      }
})

//载入游戏的场景
var gameScene = cc.Scene.extend({
  onEnter:function(){
    this._super();

    this.addChild(new gameLayer(),1);
  }
})

var GameUI = cc.Layer.extend({

    levelText:null,
    scoreText:null,
    stepText:null,
    gLayer:null,

    ctor:function(gameLayer){

        this._super();
        this.gLayer = gameLayer;

        this.initInfoPanel();
        this.scheduleUpdate();

    },
    //新建一个私有的方法用来信息栏的初始化数据，显示level，score，step信息
    initInfoPanel:function(){

    var size = cc.director.getWinSize();
    //this.x = size.width / 2;

    this.y = size.height * 0.95;
    this.setAnchorPoint(0.5);

    //this.setPosition(size.width / 2,size.height * 0.95);

    //管卡
    var levelLabel = new cc.LabelTTF("level","arial",36);
    levelLabel.setPosition(size.width / 5,0);
    levelLabel.setColor(cc.color(0,0,0));
    this.addChild(levelLabel,1);


    var levelText = new cc.LabelTTF("level","arial",36);
    var x = levelLabel._getWidth();
    levelText.setPosition(size.width / 5 + x ,0);
    levelText.setColor(cc.color(0,0,0));
    this.addChild(levelText,1);
    this.levelText = levelText;

    //分数
    var scoreLabel = new cc.LabelTTF("score","arial",36);
    scoreLabel.x = size.width / 2 - size.width / 32 ;
    scoreLabel.y = levelLabel.y;
    scoreLabel.setColor(cc.color(0,0,0));
    this.addChild(scoreLabel,1);

    var scoreText = new cc.LabelTTF("score","arial",36);
        var y = scoreLabel._getWidth()/2;
    scoreText.x = size.width /2  + y;
    scoreText.y = levelLabel.y;
    scoreText.setColor(cc.color(0,0,0));
    this.addChild(scoreText,1);
    this.scoreText = scoreText;

    //步数
    var stepLabel = new cc.LabelTTF("step","arial",36);
    stepLabel.x = size.width * 0.75;
    stepLabel.y = levelLabel.y;
    stepLabel.setColor(cc.color(0,0,0));
    this.addChild(stepLabel,1);

    var stepText = new cc.LabelTTF("step","arial",36);
    var z = stepLabel._getWidth();
    stepText.x = stepLabel.x + z;
    stepText.y = levelLabel.y;
    stepText.setColor(cc.color(0,0,0));
    this.addChild(stepText,1);
    this.stepText = stepText;

},

    update:function(){

        this.levelText.setString("" + (this.gLayer.level+1));
        this.scoreText.setString("" + (this.gLayer.score));
        this.stepText.setString("" + (this.gLayer.limitStep -this.gLayer.steps));

    },


})
