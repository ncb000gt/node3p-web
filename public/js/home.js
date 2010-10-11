var myMooFlowPage = {
  start: function(){
    var mf = new MooFlow($('MooFlow'), {
			   bgColor: '#fff',
			   header: 'Recent Downloads',
			   useResize: true,
			   useSlider: true,
			   useCaption: true,
			   useMouseWheel: true,
			   useKeyInput: true,
			   useViewer: true,
			   onClickView: function(obj){
			     var img = new Element('img',{src:obj.src, title:obj.title, alt:obj.alt, styles:obj.coords}).setStyles({'position':'absolute','border':'none'});
			     var link = new Element('a',{'class':'remooz-element','href':obj.href,'title':obj.title, styles:{'border':'none'}});
			     document.body.adopt(link.adopt(img));
			     var remooz = new ReMooz(link, {
						       centered: true,
						       resizeFactor: 0.8,
						       origin: link.getElement('img'),
						       onCloseEnd: function(){link.destroy();}
						     });
			     remooz.open();
			   }
			 });
  }

};

window.addEvent('domready', myMooFlowPage.start);