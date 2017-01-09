var Animal = cc.Sprite.extend({
    finalX:null,
    finalY:null,
    type:null,
    mark : 0,               //标志
    active:false,
    action:null,
    tag:"ssss",

    ctor:function(ele,fx,fy){
        this._super(ele);
        this.init(ele,fx,fy);
    },

    init:function(ele,fx,fy){
        this.finalX = fx;                         //初始化精灵的终点横坐标
        this.finalY = fy;                        //初始化精灵的终点纵坐标

        //监听鼠标和触摸事件
        if("touchs" in cc.sys.capabilities){
            cc.eventManager.addListener({
                event:cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan:this._onTouchBegan.bind(this)
            },this);
        }
        else{
            cc.eventManager.addListener({
                event:cc.EventListener.MOUSE,
                onMouseDown:this._onMouseDown.bind(this)
            },this);
        }
    },

    _onTouchBegan:function(){

    },

    _onMouseDown:function(event){
        this.mark ++;
        var size = cc.director.getWinSize();
       var column = Math.round((event.getLocationX() - ANIMALS_WIDTH * 2) / ANIMALS_WIDTH);

        var row = Math.round((size.height - event.getLocationY()) / ANIMALS_WIDTH - 1.5);
        this._popAnimal();


    },

    _popAnimal:function(){
        if(this.mark != 2){
            return;
        }

    }

})
