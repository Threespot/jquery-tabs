(function($){
	
	/*
	 * Function: jquery-tabs
	 * Generates menu of links from structured content. Can be flexibly used for customizeable tab interfaces, among other things.
	 *
	 * Parameters:
	 *     title - jQuery selector used within each tab to find element whose HTML will be copied to menu item's HTML.
	 *     options - Plugin options (all optional).
	 *     options.tabHref - jQuery selector used within tab to find element whose href will be copied to menu item. (If undefined, menu item's href is '#')
	 *     options.click - Function called when menu item is clicked. function(event, $menuItem, $newTab, $otherTabs){}
	 *     options.mouseenter - Function called when mouseenter event is fired on tab. function(event, $menuItem, $newTab, $otherTabs){}
	 *     options.mouseleave - Function called when mouseleave event is fired on tab. function(event, $menuItem, $newTab, $otherTabs){}
	 *     options.before - Function called before tab menu is assembled. function($tabs){}
	 *     options.after - Function called after tab menu is assembled. function($tabs, $menuItemList){}
	 *     options.beforeAppend - Function called immediately before tab menu item is appended to the return list. function($menuItem, $tab){}
	 *     options.html5 - If true, wraps the returned list in a <nav> element (default true).
	 * 
	 * Returns:
	 *     jQuery element containing navigation
	 * 
	 * Example:
	 *     > <ul id="greetings">
	 *     >     <li><h2>Hello</h2><p>This is where I say hello.</p></li>
	 *     >     <li><h2>Goodbye</h2><p>This is where I say goodbye.</p></li>
	 *     > </ul>
	 *     > 
	 *     > $greetings = $('#greetings');
	 *     > $greetings.children('li').tabs('h2').insertBefore($greetings);
	 *     > // Returns:
	 *     > // <nav>
	 *     > //     <ul>
	 *     > //         <li><a href="#">Hello</a></li>
	 *     > //         <li><a href="#">Goodbye</a></li>
	 *     > //     </ul>
	 *     > // </nav>
	 * 
	 * Author:
	 *     Chuck Harmston chuck@chuckharmston.com
	 * 
	 * Version:
	 *     0.1
	 */
	$.fn.tabs = function(title, options){
		var settings = $.extend({
			'click': null,
			'mouseenter': null,
			'mouseleave': null,
			'before': null,
			'after': null,
			'tabHref': null,
			'beforeAppend': null,
			'html5': true
		}, options);
		var returnElem = $('<nav></nav>'),
		    list = $('<ul></ul>');
		
		var tabs = $(this);
		if(settings['before']) settings['before'](tabs);
		for(var i = 0; i < tabs.length; i++){
			var $tab = $(tabs[i]),
			    listItem = $('<li></li>', {
					'class': $tab.attr('class')
				});
			$('<a></a>',{
				'html': $tab.find(title).html(),
				'href': !!settings['tabHref'] ? $tab.find(settings['tabHref']).attr('href') : '#',
				'click': function(evt){
					var thisTab = $(this).data('tab');
					settings['click'](evt, $(this), thisTab, tabs.not(thisTab));
				},
				'mouseenter': function(evt){
					var thisTab = $(this).data('tab');
					settings['mouseenter'](evt, $(this), thisTab, tabs.not(thisTab));
				},
				'mouseleave': function(evt){
					var thisTab = $(this).data('tab');
					settings['mouseleave'](evt, $(this), thisTab, tabs.not(thisTab));
				}
			}).data('tab', $tab).appendTo(listItem);
			if(settings['beforeAppend']) settings['beforeAppend'](listItem.children('a'), $tab);
			listItem.appendTo(list);
		}
		if(settings['html5']){
			list.appendTo(returnElem);
		}else{
			returnElem = list;
		}
		if(settings['after']) settings['after']($tabs, returnElem);
		return returnElem
	}
	
})(jQuery);