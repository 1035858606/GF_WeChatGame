/**
 * Created by a on 2015/12/7.
 */

//loading
loading()
function loading(){
    var $bol = true;
    var num = 0;
    var $imgs = $("#loading").find("div img");
    var $timer = setInterval(function(){
        num++;
        if(num == 5){
            clearInterval($timer);
            $("#loading").hide();
            $("#scene_one").show();
            scene_one()
            return;
        }
        if($bol){
            $imgs.eq(1).show();
            $imgs.eq(0).hide();
            $bol = false;
        }else{
            $imgs.eq(0).show();
            $imgs.eq(1).hide();
            $bol = true;
        }
    },200)
}

//场景一
function scene_one(){
    var bol = true;
    var num = 0;
    //人物眨眼动画
    var $timer = setInterval(function(){
        if(bol) {
            $("#scene_one").find(".bailing").attr({src:"images/bailing_01.png"});
            bol = false;
        }else{
            $("#scene_one").find(".bailing").attr({src:"images/bailing_02.png"});
            bol = true;
        }
    },2500);

    //对话浮现
    num++;
    $("#scene_one").find(".duihua"+num).fadeIn();
    var $timer1 = setInterval(function(){
        num++;
        $("#scene_one").find(".duihua"+num).fadeIn();
        if(num == 3){
            clearInterval($timer1);
        }
    },1500)

    //  给钱支付
    $("#pay").on("touchstart", function(){
        $(this).find("img").attr({src:"images/button_01down.png"});

    })
    $("#pay").on("touchend",function(){
        $("#scene_one").hide();
        $("#scene_two").show();
        scene_two()
    });
}

//场景二

function scene_two(){
    var $oldY;
    var $newY;
    $("#tips").on("touchstart", function(e){
        var touch = e.originalEvent.targetTouches[0];
        $oldY = touch.pageY;
        $("#tips").on("touchmove", function(e){
            var touch = e.originalEvent.targetTouches[0];
             $newY = touch.pageY;
        })

    })
    $("#tips").on("touchend", function(e){
        if($newY<$oldY){
            $("#scene_two").hide();
            $("#scene_three").show();
            scene_three();
        }
    })
}

//场景三
function scene_three(){
        var bol = true;
        var result = 1;
        var num = 1;
        var addbol = true;
        //物品路径JSON
        var wupin = {
            mid:["wupin_02.png","wupin_05.png","wupin_08.png","wupin_11.png"],
            else:["wupin_01.png","wupin_03.png","wupin_04.png","wupin_06.png","wupin_07.png","wupin_09.png","wupin_10.png","wupin_12.png"]
        };

        //第一次左边物品初始
        $("#scene_three").append("<img src="+getSrc(wupin.else,"images/")+" alt='' class=' wupin left'/>");
        var $left = $("#scene_three").find(".left");
        $left.eq($left.length-1).fadeIn()
        var left = new Parabola({
            el: $left.eq($left.length-1),
            offset: [-300, -400],
            curvature: 0.003,
            duration: 1000
        });
        left.start();

        //第一次中间物品初始
        $("#scene_three").append("<img src="+getSrc(wupin.mid,"images/")+" alt='' class=' wupin mid'/>");
        var $mid = $("#scene_three").find(".mid");
        $mid.eq($mid.length-1).fadeIn()
        var mid = new Parabola({
            el: $mid.eq($mid.length-1),
            offset: [1,-710],
            curvature: 0.005,
            duration: 1500
        });
        mid.start();



        //生成随机路径
        function getSrc(arr,str){
            var $num = Math.floor(Math.random()*arr.length);
            var $src = str+arr[$num];
            arr.splice($num,1);
            return $src;
        }


        //判断向上滑动
        var $oldY
        var $newY
        $("#bag").on("touchstart", function(e){
            var touch = e.originalEvent.targetTouches[0];
            $oldY = touch.pageY;
            $("#bag").on("touchmove", function(e){
                var touch = e.originalEvent.targetTouches[0];
                $newY = touch.pageY;
            })
        })
        var timer1 = setInterval(function(){
            if(num >= 3){
                addbol = false;
            }
        },20)
        var timer2 = setInterval(function(){
            num = 0;
            addbol = true;
        },1000)

        $("#bag").on("touchend", function(e){
            //判断向上滑动
            if($newY<$oldY){
                //如果addbol为假.停止增加,用于限制1s有效点击数为3
                if(addbol){
                    result++;
                    num++;
                    //如果累计有效点击数15次
                    if(result >= 15){
                        var chuanbol = true;
                        var $mid = $("#scene_three").find(".mid");
                        $mid.eq($mid.length-1).fadeOut()
                        var $left = $("#scene_three").find(".left");
                        $mid.eq($left.length-1).fadeOut()
                        var $right = $("#scene_three").find(".right");
                        $right.eq($right.length-1).fadeOut();
                        clearInterval(timer1);
                        clearInterval(timer2);
                        $("#scene_three .bailing").hide();
                        $("#scene_three .chuanqi").show();
                        $("#bag").off("touchstart")
                        $("#bag").off("touchmove")
                        $("#bag").off("touchend")
                        $("#scene_three .chuanqiBtn").show();
                        var timer3 = setInterval(function(){
                            if(chuanbol){
                                $("#scene_three .chuanqi").attr({src:"images/chuanqi_02.png"})
                                chuanbol = false;
                            }else{
                                $("#scene_three .chuanqi").attr({src:"images/chuanqi_01.png"})
                                chuanbol = true;
                            }
                        },800)
                    }
                }

                //右边执行动画
                var $mid = $("#scene_three").find(".mid");
                $mid.eq($mid.length-1).fadeOut()
                if(bol){
                    if(wupin.else.length==0){
                        wupin.else = ["wupin_01.png","wupin_03.png","wupin_04.png","wupin_06.png","wupin_07.png","wupin_09.png","wupin_10.png","wupin_12.png"]
                    }
                    $("#scene_three").append("<img src="+getSrc(wupin.else,"images/")+" alt='' class=' wupin right'/>")
                    $("#scene_three .bailing").attr({src:"images/bailing_right.png"});
                    var $right = $("#scene_three").find(".right");
                    $right.eq($right.length-1).fadeIn()
                    var right = new Parabola({
                        el: $right.eq($right.length-1),
                        offset: [400, -400],
                        curvature: 0.003,
                        duration: 1000
                    });
                    right.start();
                    bol = false;
                }else if(!bol){
                    //左边执行动画
                    if(wupin.else.length==0){
                        wupin.else = ["wupin_01.png","wupin_03.png","wupin_04.png","wupin_06.png","wupin_07.png","wupin_09.png","wupin_10.png","wupin_12.png"]
                    }
                    if(wupin.mid.length==0){
                        wupin.mid = ["wupin_02.png","wupin_05.png","wupin_08.png","wupin_11.png"];
                    }
                    $("#scene_three .bailing").attr({src:"images/bailing_left.png"});
                    $("#scene_three").append("<img src="+getSrc(wupin.else,"images/")+" alt='' class=' wupin left'/>");
                    var $left = $("#scene_three").find(".left");
                    $left.eq($left.length-1).fadeIn()
                    var left = new Parabola({
                        el: $left.eq($left.length-1),
                        offset: [-300, -400],
                        curvature: 0.003,
                        duration: 1000
                    });
                    left.start();


                    //中间执行动画
                    $("#scene_three").append("<img src="+getSrc(wupin.mid,"images/")+" alt='' class=' wupin mid'/>");
                    var $mid = $("#scene_three").find(".mid");
                    $mid.eq($mid.length-1).fadeIn()
                    var mid = new Parabola({
                        el: $mid.eq($mid.length-1),
                        offset: [1,-710],
                        curvature: 0.005,
                        duration: 1500
                    });
                    mid.start();
                    bol = true;
                }
            }
        })



    $("#scene_three .btn1").on("touchstart",function(){
        $(this).find("img").attr({src:"images/button_02down.png"});
        $(this).on("touchend",function(){
            $(this).find("img").attr({src:"images/button_02.png"});
            $("#scene_three").find("img").remove(".wupin")
            $("#scene_three").hide();
            $("#scene_three .chuanqiBtn").hide();
            $("#scene_three .chuanqi").hide();
            $("#scene_three .bailing").attr({src:"images/bailing_left.png"})
            $("#scene_three .bailing").show();
            $("#scene_two").show();
        })
    })
    $("#scene_three .btn2").on("touchstart",function(){
        $(this).find("img").attr({src:"images/button_03down.png"});
        $(this).on("touchend",function(){
            $(this).find("img").attr({src:"images/button_03.png"});
            $("#choice").show();
            choice();
        })
    })
}

//选择界面
function choice(){
    $btn = $("#choice .btn");
    $btn.eq(0).on("touchstart",function(){
        $(this).find("img").attr({src:"images/button_adown.png"});
        $(this).on("touchend",function(){
            $(this).find("img").attr({src:"images/button_a.png"});
           $("#scene_three").hide();
            $("#choice_a").show();
            choice_a()
        })
    })
    $btn.eq(1).on("touchstart",function(){
        $(this).find("img").attr({src:"images/button_bdown.png"});
        $(this).on("touchend",function(){
            $(this).find("img").attr({src:"images/button_b.png"})
            $("#scene_three").hide();
            $("#choice_b").show();
            choice_b()
        })
    })
    $btn.eq(2).on("touchstart",function(){
        $(this).find("img").attr({src:"images/button_cdown.png"});
        $(this).on("touchend",function(){
            $(this).find("img").attr({src:"images/button_c.png"})
            $("#scene_three").hide();
            $("#choice_c").show();
        })
    })
}

//选择一
function choice_a(){
    $("#choice_a a").on("touchstart",function(){
        $(this).find("img").attr({src:"images/button_04down.png"});
        $(this).on("touchend",function(){
            $(this).find("img").attr({src:"images/button_04.png"});
            $("#scene_three").show();
            $("#choice_a").hide();
        })
    })
}
//选择二
function choice_b(){
   var bol = true;
   var $timer = setInterval(function(){
       if(bol){
           $("#choice_b .bailing").attr({src:"images/tiaowu_02.png"})
           bol = false;
       }else{
           $("#choice_b .bailing").attr({src:"images/tiaowu_01.png"})
           bol = true;
       }
   },2500);

    $("#choice_b a").on("touchstart",function(){
        $(this).find("img").attr({src:"images/button_05down.png"})
        $(this).on("touchend",function(){
            $(this).find("img").attr({src:"images/button_05.png"})
            clearInterval($timer);
            $("#scene_three").show();
            $("#choice_b").hide();
        })
    })
}

//选择三
choice_c();
function choice_c(){
    $("#choice_c .shan").on("touchstart",function(){
        $(this).hide();
        $("#choice_c .light").fadeIn(mobileMove);
    })
}

//移动手机
function mobileMove(){
    setTimeout(function(){
        $("#choice_c").hide();
        $("#topay").show();
        $("#topay .mobile").on("touchstart",function(evt){
            var touch = evt.originalEvent.targetTouches[0];
            var $juliY = touch.pageY- $("#topay .mobile").position().top;
            $("#topay .mobile").on("touchmove",function(evt){
                var touch = evt.originalEvent.targetTouches[0];
                var $newY = touch.pageY;
                $(this).css({"top":$newY-$juliY});
                if($(window).height()*0.280146>$(this).position().top){
                    $("#topay").hide();
                    $("#put_pass").show();
                    put_pass();
                    $(this).off("touchmove")
                }
            });
        })
    },500)
}

//输入密码
function put_pass(){
    var i = 0;
    var $timer = setInterval(function(){
        i++;
        var $con = $("#put_pass").find("span").text()+"*";
        $("#put_pass").find("span").text($con);
        if(i>=6){
            clearInterval($timer);
            $("#put_pass").find(".tips").show();
            $("#put_pass").find(".shou").show();
            $("#put_pass .queren").on("touchstart",function(){
                $("#put_pass .queren").find("img").attr({src:"images/button_06down.png"});
                $("#put_pass .queren").on("touchend",function(){
                    $("#put_pass").hide();
                    $("#weiye").show();
                    $("#put_pass .queren").find("img").attr({src:"images/button_06.png"});
                })
            })
            $("#put_pass .tips").on("touchstart",function(){
                $("#put_pass .queren").find("img").attr({src:"images/button_06down.png"});
                $("#put_pass .queren").on("touchend",function(){
                    $("#put_pass").hide();
                    $("#weiye").show();
                    $("#put_pass .queren").find("img").attr({src:"images/button_06.png"});
                })
            })
            $("#put_pass .shou").on("touchstart",function(){
                $("#put_pass .queren").find("img").attr({src:"images/button_06down.png"});
                $("#put_pass .queren").on("touchend",function(){
                    $("#put_pass").hide();
                    $("#weiye").show();
                    $("#put_pass .queren").find("img").attr({src:"images/button_06.png"});
                })
            })
        }
    },340)
}
