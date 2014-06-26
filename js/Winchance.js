/*
	*作者：Winchance Hank | @GogoNoUsagi
	*版本：Ver 1.06
	*最后更新：2014.06.19
*/
//弹窗插件
(function(jQuery){
	jQuery.fn.showWindow = function (winSrc,winTitle) {
		return this.each(function() {
			jQuery(this).on("click",function(){
				jQuery(this).after("<div id='mask' class='mask'></div>");
				jQuery("#mask").css("height",jQuery(document).height());
				jQuery("#mask").css("width",jQuery(document).width());
				jQuery("#mask").show();
				jQuery(this).after("<div id='tipWin' class='tipWindow'><span class='winClose' onClick='colseWindow()'>×</span><h1>"+winTitle+"</h1><div class='winContent'><iframe frameborder='0' width='450' height='290' src='"+winSrc+"'></iframe></div><span class='winBtn'><a href='#' onClick='colseWindow()' class='submitBtn' id='closeWindow'>确认</a></span></div>");
			});
		});
	};
})(jQuery);
//气泡提示插件
(function(jQuery){
	jQuery.fn.getTips = function () {
		return this.each(function() {
			jQuery(this).on("mouseover",function(){
				var title=jQuery(this).attr("title");
				var X = jQuery(this).offset().top;
				jQuery(".tipTitle").css("top",X);
				jQuery(this).after("<div class='tipTitle'><em></em><span></span>"+title+"</div>");
			});
			jQuery(this).on("mouseout",function(){
				jQuery(".tipTitle").hide();
			});
		});
	};
})(jQuery);
//下拉列表插件
/*(function(jQuery){
	jQuery.fn. = function () {
		return this.each(function() {
			
		});
	};
})(jQuery);*/
//下拉按钮插件
(function(jQuery){
	jQuery.fn.btnList = function (btnId) {
		return this.each(function() {
			btnX=jQuery("#"+btnId+"").css("margin-left");
			btnY=jQuery("#"+btnId+"").css("margin-top");
			listX=btnX;
			jQuery("#"+btnId+"").append("<div class='viewMore' id='"+btnId+"ListBtn' style='z-index:999'>+</div>");
			btnY=parseInt(btnY)+30;
			jQuery("#"+btnId+"List").css("margin-top",btnY);
			jQuery("#"+btnId+"ListBtn").on("mouseover",function(){
				jQuery(".viewBtnList").not("#"+btnId+"List").fadeOut();
				jQuery("#"+btnId+"List").fadeIn();				
			});
			jQuery(document).click(function(){
				jQuery("#"+btnId+"List").fadeOut();
			});
		});
	};
})(jQuery);

//表单提交时间绑定
$(document).ready(function() {
    $("#querySubmit").click(function(){
		$("#queryForm").submit();
	});
});
//右键菜单插件  Author: Chris Domigan
(function($) {

 	var menu, shadow, trigger, content, hash, currentTarget;
  var defaults = {
    menuStyle: {
      listStyle: 'none',
      padding: '1px',
      margin: '0px',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      width: '120px'
    },
    itemStyle: {
      margin: '0px',
      color: '#000',
      display: 'block',
      cursor: 'default',
      padding: '3px',
      border: '1px solid #fff',
      backgroundColor: 'transparent',
	  fontSize: '13px'
    },
    itemHoverStyle: {
      backgroundColor: '#379BE9',
	  color: '#fff'
    },
    eventPosX: 'pageX',
    eventPosY: 'pageY',
    shadow : true,
    onContextMenu: null,
    onShowMenu: null
 	};

  $.fn.contextMenu = function(id, options) {
    if (!menu) {                                      // Create singleton menu
      menu = $('<div id="jqContextMenu"></div>')
               .hide()
               .css({position:'absolute', zIndex:'500'})
               .appendTo('body')
               .bind('click', function(e) {
                 e.stopPropagation();
               });
    }
    if (!shadow) {
      shadow = $('<div></div>')
                 .css({backgroundColor:'#000',position:'absolute',opacity:0.2,zIndex:499})
                 .appendTo('body')
                 .hide();
    }
    hash = hash || [];
    hash.push({
      id : id,
      menuStyle: $.extend({}, defaults.menuStyle, options.menuStyle || {}),
      itemStyle: $.extend({}, defaults.itemStyle, options.itemStyle || {}),
      itemHoverStyle: $.extend({}, defaults.itemHoverStyle, options.itemHoverStyle || {}),
      bindings: options.bindings || {},
      shadow: options.shadow || options.shadow === false ? options.shadow : defaults.shadow,
      onContextMenu: options.onContextMenu || defaults.onContextMenu,
      onShowMenu: options.onShowMenu || defaults.onShowMenu,
      eventPosX: options.eventPosX || defaults.eventPosX,
      eventPosY: options.eventPosY || defaults.eventPosY
    });

    var index = hash.length - 1;
    $(this).bind('contextmenu', function(e) {
      // Check if onContextMenu() defined
      var bShowContext = (!!hash[index].onContextMenu) ? hash[index].onContextMenu(e) : true;
      if (bShowContext) display(index, this, e, options);
      return false;
    });
    return this;
  };

  function display(index, trigger, e, options) {
    var cur = hash[index];
    content = $('#'+cur.id).find('ul:first').clone(true);
    content.css(cur.menuStyle).find('li').css(cur.itemStyle).hover(
      function() {
        $(this).css(cur.itemHoverStyle);
      },
      function(){
        $(this).css(cur.itemStyle);
      }
    ).find('img').css({verticalAlign:'middle',paddingRight:'2px'});

    // Send the content to the menu
    menu.html(content);

    // if there's an onShowMenu, run it now -- must run after content has been added
		// if you try to alter the content variable before the menu.html(), IE6 has issues
		// updating the content
    if (!!cur.onShowMenu) menu = cur.onShowMenu(e, menu);

    $.each(cur.bindings, function(id, func) {
      $('#'+id, menu).bind('click', function(e) {
        hide();
        func(trigger, currentTarget);
      });
    });

    menu.css({'left':e[cur.eventPosX],'top':e[cur.eventPosY]}).show();
    if (cur.shadow) shadow.css({width:menu.width(),height:menu.height(),left:e.pageX+2,top:e.pageY+2}).show();
    $(document).one('click', hide);
  }

  function hide() {
    menu.hide();
    shadow.hide();
  }

  // Apply defaults
  $.contextMenu = {
    defaults : function(userDefaults) {
      $.each(userDefaults, function(i, val) {
        if (typeof val == 'object' && defaults[i]) {
          $.extend(defaults[i], val);
        }
        else defaults[i] = val;
      });
    }
  };

})(jQuery);

$(function() {
  $('div.contextMenu').hide();
});
//表单校验相关
	$(document).on("focus",".input-global",function(){
		$(this).css({"border-color":"#379BE9","background":"#FFF"});
	});
	$(document).on("blur",".input-global",function(){
		if($(this).val()==""){
			$(this).css({"border-color":"#963","background-image":"url(../template/css/winchanceJs-image/notNull.png)","background-repeat":"no-repeat"});
		}
		else{
			$(this).css({"border-color":"#CCC","background":"#FFF"});
		}
		
	});
//表格排序插件
/*$(document).ready(function() {
    if($(document).each(".closeBtn")){
		alert("有");
	}
	else{
		alert("没有");
	}
});*/

//选项卡切换组件

//事件处理

//遮罩窗口关闭
function colseWindow(){	
	jQuery("#mask").remove();
	jQuery("#tipWin").remove();
}