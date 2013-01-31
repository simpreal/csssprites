
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var CssSprites= new function(){
	
	
    var lastHash = null;
    var curHash = null;
    var OnHashChange = function () {
        if (curHash != location.hash) {
            lastHash = curHash;
            curHash = location.hash;
        }
        var query = location.hash.split('#!');
        if (query.length < 2) return;
        query.shift();
        query = query.join('#!').split('?');

        //var opts;
        if (query.length > 1) {
            var first = query.shift();
            //query = query.join('?');
            //if (query.length)
            //    opts = JSON.parse('{"' + decodeURI(query.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}');
            //else opts = {};
            query = first;
        }
        else {
            query = query[0];
            //opts = {};
        }

        query = query.split('/');

        var action = query.shift();
		controller[action].apply(null,query);
    };
    var changeHash = function (link) {
        location.hash = link;
    };
    /*var hashBack = function () {
        if (lastHash)
            location.hash = lastHash;
        else
            OnHashChange();
    }
*/
    $(window).bind('hashchange', OnHashChange);
    /*var makeLinkHref = function () {
        return ' href="' + _makeLink(arguments) + '"';
    };*/

	
    var _makeLink = function (_arguments) {
        var a = [];
        var last = '';
		var n=_arguments.length;
        if (n > 1) {
            for (var i = 0, end = n - 1; i < end; i++)
                a.push(_arguments[i]);
            last = _arguments[end];
            if (last) {
                if (last instanceof Array) {
                    last = '/' + last.join('/');
                }
                else if (last instanceof Object) {
                    last = '?' + jQuery.param(last);
                }
                else {
                    last = '/' + last;
                }
            }
            else last = '';
        }
		else if(n==1){
			a.push(_arguments[0]);
		}
        return '#!' + a.join('/') + last;
    };
    var makeLink = function () {
        return _makeLink(arguments);
    };
    
	var controller=new function(){
		this.source=function(){
			vm.tab('source');
			vm.currentImageID(0);
			vm.currentRectID(0);
		};
		this.image=function(imageIndex){
			vm.tab('source');
			vm.currentImageID(imageIndex);
			vm.currentRectID(0);
		};
		this.rect=function(rectIndex){
			vm.tab('source');
			vm.currentImageID(0);
			vm.currentRectID(rectIndex);
		};
		this.configure=function(){
			vm.tab('configure');
			vm.currentGroupID(0);
			vm.currentGroupItemID(0);
		};
		this.group=function(imageIndex){
			vm.tab('configure');
			vm.currentGroupID(imageIndex);
			vm.currentGroupItemID(0);
		};
		this.groupitem=function(rectIndex){
			vm.tab('configure');
			vm.currentGroupID(0);
			vm.currentGroupItemID(rectIndex);
		};
		this.result=function(){
			vm.tab('result');
			vm.resultControlsTemplate('resultcss');
			vm.resultControlsData(vm);
		};
		this.css=function(){
			vm.tab('result');
			vm.resultControlsTemplate('resultcss');
			vm.resultControlsData(vm);
		};
		this.outimages=function(){
			vm.tab('result');
			vm.resultControlsData(vm);
			vm.resultControlsTemplate('resultimages');
		};
		this.project=function(){
			vm.tab('result');
			vm.resultControlsData(vm);
			vm.resultControlsTemplate('resultproject');
		};
	}();	
	
		// base64 encodes either a string or an array of charcodes
		var encodeData = function(data) {
			var strData = "";
			if (typeof data == "string") {
				strData = data;
			} else {
				var aData = data;
				for (var i=0;i<aData.length;i++) {
					strData += String.fromCharCode(aData[i]);
				}
			}
			return btoa(strData);
		};
		var readCanvasData = function(oCanvas) {
			var iWidth = parseInt(oCanvas.width);
			var iHeight = parseInt(oCanvas.height);
			return oCanvas.getContext("2d").getImageData(0,0,iWidth,iHeight);
		};
		// creates a base64 encoded string containing BMP data
		// takes an imagedata object as argument
		var createBMP = function(oData) {
			var aHeader = [];
		
			var iWidth = oData.width;
			var iHeight = oData.height;

			aHeader.push(0x42); // magic 1
			aHeader.push(0x4D); 
		
			var iFileSize = iWidth*iHeight*3 + 54; // total header size = 54 bytes
			aHeader.push(iFileSize % 256); iFileSize = Math.floor(iFileSize / 256);
			aHeader.push(iFileSize % 256); iFileSize = Math.floor(iFileSize / 256);
			aHeader.push(iFileSize % 256); iFileSize = Math.floor(iFileSize / 256);
			aHeader.push(iFileSize % 256);

			aHeader.push(0); // reserved
			aHeader.push(0);
			aHeader.push(0); // reserved
			aHeader.push(0);

			aHeader.push(54); // dataoffset
			aHeader.push(0);
			aHeader.push(0);
			aHeader.push(0);

			var aInfoHeader = [];
			aInfoHeader.push(40); // info header size
			aInfoHeader.push(0);
			aInfoHeader.push(0);
			aInfoHeader.push(0);

			var iImageWidth = iWidth;
			aInfoHeader.push(iImageWidth % 256); iImageWidth = Math.floor(iImageWidth / 256);
			aInfoHeader.push(iImageWidth % 256); iImageWidth = Math.floor(iImageWidth / 256);
			aInfoHeader.push(iImageWidth % 256); iImageWidth = Math.floor(iImageWidth / 256);
			aInfoHeader.push(iImageWidth % 256);
		
			var iImageHeight = iHeight;
			aInfoHeader.push(iImageHeight % 256); iImageHeight = Math.floor(iImageHeight / 256);
			aInfoHeader.push(iImageHeight % 256); iImageHeight = Math.floor(iImageHeight / 256);
			aInfoHeader.push(iImageHeight % 256); iImageHeight = Math.floor(iImageHeight / 256);
			aInfoHeader.push(iImageHeight % 256);
		
			aInfoHeader.push(1); // num of planes
			aInfoHeader.push(0);
		
			aInfoHeader.push(24); // num of bits per pixel
			aInfoHeader.push(0);
		
			aInfoHeader.push(0); // compression = none
			aInfoHeader.push(0);
			aInfoHeader.push(0);
			aInfoHeader.push(0);
		
			var iDataSize = iWidth*iHeight*3; 
			aInfoHeader.push(iDataSize % 256); iDataSize = Math.floor(iDataSize / 256);
			aInfoHeader.push(iDataSize % 256); iDataSize = Math.floor(iDataSize / 256);
			aInfoHeader.push(iDataSize % 256); iDataSize = Math.floor(iDataSize / 256);
			aInfoHeader.push(iDataSize % 256); 
		
			for (var i=0;i<16;i++) {
				aInfoHeader.push(0);	// these bytes not used
			}
		
			var iPadding = (4 - ((iWidth * 3) % 4)) % 4;

			var aImgData = oData.data;

			var strPixelData = "";
			var y = iHeight;
			do {
				var iOffsetY = iWidth*(y-1)*4;
				var strPixelRow = "";
				for (var x=0;x<iWidth;x++) {
					var iOffsetX = 4*x;

					strPixelRow += String.fromCharCode(aImgData[iOffsetY+iOffsetX+2]);
					strPixelRow += String.fromCharCode(aImgData[iOffsetY+iOffsetX+1]);
					strPixelRow += String.fromCharCode(aImgData[iOffsetY+iOffsetX]);
				}
				for (var c=0;c<iPadding;c++) {
					strPixelRow += String.fromCharCode(0);
				}
				strPixelData += strPixelRow;
			} while (--y);

			var strEncoded = encodeData(aHeader.concat(aInfoHeader)) + encodeData(strPixelData);

			return strEncoded;
		};

		var makeDataURI = function(strData, strMime) {
			return "data:" + strMime + ";base64," + strData;
		};	
	var Factory=function(){
		var factory=this;
		var imagesLastID=0;
		var images={};
		var createImage=this.createImage=function(defaults){
			var image={
				type:{name:'C3SImage'},
				id:++imagesLastID,
				rects:ko.observableArray([]),
				img:ko.observable(defaults.img||null),
				name:ko.observable(defaults.name||'noname'),
				scale:ko.observable(100),
				canvas:ko.observable(null)
			};
			image.rects.image=image;
			image.url=makeLink('image',image.id);
			
			image.className=ko.recompute(function() {
				return (vm.currentImageID()==image.id)?'active':'';
			});
			
			image.text=ko.recompute(function() {
				return '<span class="icon-picture"></span>'+image.name();
			});
			image.rectsInCanvas=ko.recompute(function() {
				var outrects=[];
				var rects=image.rects();
				for(var i=0, rect; rect=rects[i];i++){
					outrects.push({
						x:rect.x(),
						y:rect.y(),
						w:rect.w(),
						h:rect.h()
					});
				}
				return outrects;
			});
			

			
			images[image.id]=image;
			return image;
		};
		
		
		this.image=function(id){
			return images[id];
		};
		this.imageByName=function(name){
			for(var id in images){
				var image = images[id];
				if(image.name()==name)
					return image;
			}
			return null;
		};
		
		this.addImage=function(name, img){
			var image=createImage({name:name,img:img});
			factory.addRect(image);	
			return image;	
		};
		
		
		this.delImage=function(image){
			var id=image.id;
			var imagerects=image.rects();
			for(var i=0,n=imagerects.length;i<n;i++){
				var delrectid=imagerects[i].id;
				for(var groupid in groups){
					groups[groupid].items.remove(function(item){
						return (item.type.name=='C3SGroupItem') && (item.rect.id==delrectid);
					});
				}
				delete rects[delrectid];
				delete groupitems[delrectid];
			}
			delete images[id];
		};

		
		
		var rectsLastID=0;
		var rects={};
		var createRect=this.createRect=function(defaults){
			var rect={
				type:{name:'C3SRect'},
				id:++rectsLastID,
				name:ko.observable(defaults.name||('Rectangle '+rectsLastID)),
				x:ko.observable(defaults.x||0),
				y:ko.observable(defaults.y||0),
				w:ko.observable(defaults.w||defaults.image.img().width),
				h:ko.observable(defaults.h||defaults.image.img().height),
				image:ko.observable(defaults.image)
			};
			rect.url=makeLink('rect',rect.id);
			rect.className=ko.recompute(function() {
				return vm.currentRectID()==rect.id?'active':'';
			});

			rect.keydownX=function(data,event){
				return OnNumberKeyDown(event,0,rect.image().img().width-rect.w(),rect.x);
			};
			rect.keydownY=function(data,event){
				return OnNumberKeyDown(event,0,rect.image().img().height-rect.h(),rect.y);
			};
			rect.keydownW=function(data,event){
				return OnNumberKeyDown(event,0,rect.image().img().width-rect.x(),rect.w);
			},
			rect.keydownH=function(data,event){
				return OnNumberKeyDown(event,0,rect.image().img().height-rect.y(),rect.h);
			};
			rect.text=ko.recompute(function() {
				return '<span class="icon-stop"></span>'+rect.name();
			});
			rect.rectsInCanvas=ko.recompute(function() {
				var outrects=[];
				var rects=rect.image().rects();
				for(var i=0, curRect; curRect=rects[i];i++){
					outrects.push({
						x: curRect.x(),
						y: curRect.y(),
						w: curRect.w(),
						h: curRect.h(),
						active: rect.id==curRect.id
					});
				}
				return outrects;
			});
			rect.canvas=ko.recompute(function() {
				var canvas=document.createElement('canvas'),
					x=rect.x(),
					y=rect.y(),
					w=rect.w(),
					h=rect.h();
				
				canvas.width=w;
				canvas.height=h;
				canvas.ctx=canvas.getContext('2d');
				canvas.ctx.drawImage(rect.image().img(),-x,-y);
				return canvas;
			});
			rects[rect.id]=rect;
			return rect;
		};
		

		this.dublicateRect=function(rect){
			var image=rect.image();
			var newrect=createRect({
				image:image, 
				x:rect.x(), 
				y:rect.y(), 
				w:rect.w(), 
				h:rect.h()
			});
			image.rects.push(newrect);
			for(var groupid in groups){
				var group=groups[groupid];
				var groupitem=createGroupItem({group:group,rect:newrect});
				group.items.push(groupitem);
				break;
			}
			return newrect;
		};
		this.addRect=function(image){
			var rect=createRect({image:image});
			image.rects.push(rect);
			for(var groupid in groups){
				var group=groups[groupid];
				var groupitem=createGroupItem({group:group,rect:rect});
				group.items.push(groupitem);
				factory.addCss(groupitem);
				break;
			}
			return rect;
		};
		this.rect=function(id){
			return rects[id];
		};
		this.delRect=function(rect){
			var rectid=rect.id;
			rect.image().rects.remove(function(item) {
				return item.id == rectid;
			});
			delete rects[rectid];
			groupitems[rectid].parentGroup().items.remove(function(item) {
				return (item.type.name=='C3SGroupItem') && (item.rect.id == rectid);
			});
			delete groupitems[rectid];
		};




		var imagetypes=[
		 			{ext:'.png',title:'PNG',mime:'image/png'},
		 			{ext:'.jpg',title:'JPG',mime:'image/jpeg'},
		 			{ext:'.gif',title:'GIF',mime:'image/gif'},
		 			{ext:'.bmp',title:'BMP',mime:'image/bmp'}
		 		];
		this.getImageTypeByExt=function(ext){
			for(var i=0, imageType; imageType=imagetypes[i]; i++)
				if(imageType.ext==ext)
					return imageType;
			return imagetypes[0];
		}
		var compareFunc=function(f,desc){
			return function(left, right) {
				left =f(left);
				right=f(right);
				if(desc)
					return left == right ? 0 : (left > right ? -1 : 1) ;
				else 
					return left == right ? 0 : (left < right ? -1 : 1) ;
			};
		};
		var groupssLastID=0;
		var groups={};
		var createGroup=this.createGroup=function(defaults){
			var group={
				type:{name:'C3SGroup'},
				id:++groupssLastID,
				name:ko.observable(defaults.name||name),
				items:ko.observableArray([]),
				parentGroup:ko.observable(defaults.parentGroup||null),
				algoritm:ko.observable('packer1'),
				scale:ko.observable(100),
				marginLeft:ko.observable(defaults.marginLeft||null),
				marginRight:ko.observable(defaults.marginRight||null),
				width:ko.observable(defaults.width||null),
				marginTop:ko.observable(defaults.marginTop||null),
				marginBottom:ko.observable(defaults.marginBottom||null),
				height:ko.observable(defaults.height||null),
				imagetype:ko.observable(defaults.imagetype||imagetypes[0]),
				imagetypes:imagetypes
			};
			var addItems=function(arr,group){
				var items=group.items();
				for(var i=0, item; item=items[i]; i++)
					if(item.type.name=='C3SGroup')
						addItems(arr,item);
					else
						arr.push(item);
			}
			group.allItems=ko.recompute(function(){
				var arr=[];
				addItems(arr,group);
				return arr;
			});			
			
			group.onChangeImageType=function(imagetype){
				group.imagetype(imagetype);
			};
			group.imageTypeTitle=ko.recompute(function(){
				return group.imagetype().title;
				
			});
			group.fileName=ko.recompute(function(){
				return group.name()+group.imagetype().ext;
				
			});
			group.fileNameBMP=ko.recompute(function(){
				return group.name()+'.bmp';
			});
			group.showImageBMP=ko.recompute(function(){
				return group.imagetype().ext != '.bmp';
			});
			group.url=makeLink('group',group.id);
			group.items.group=group;
			group.className=ko.recompute(function() {
				return vm?((vm.currentGroupID()==group.id)?'active':''):'';
			});
			group.text=ko.recompute(function() {
				return '<span class="icon-th"></span>'+group.name();
			});
			group.keydownW=function(data,event){
				return OnNumberKeyDown(event,1,100000,group.width);
			};
			group.keydownML=function(data,event){
				return OnNumberKeyDown(event,-100000,100000,group.marginLeft);
			};
			group.keydownMR=function(data,event){
				return OnNumberKeyDown(event,-100000,100000,group.marginRight);
			};
			group.keydownH=function(data,event){
				return OnNumberKeyDown(event,1,100000,group.height);
			};
			group.keydownMT=function(data,event){
				return OnNumberKeyDown(event,-100000,100000,group.marginTop);
			};
			group.keydownMB=function(data,event){
				return OnNumberKeyDown(event,-100000,100000,group.marginBottom);
			};
			group.SortByName=function(data,event){
				group.items.sort(compareFunc(function(el){
					return el.name();
				}));
			};
			group.SortByWidth=function(data,event){
				group.items.sort(compareFunc(function(el){
					return el.canvas().width;
				},true));
			};
			group.SortByHeight=function(data,event){
				group.items.sort(compareFunc(function(el){
					return el.canvas().height;
				},true));
			};
			group.SortByArea=function(data,event){
				group.items.sort(compareFunc(function(el){
					return el.canvas().width + el.canvas().height;
				},true));
			};
			group.SortByMaxSide=function(data,event){
				group.items.sort(compareFunc(function(el){
					return Math.max(el.canvas().width,el.canvas().height);
				},true));
			};
			group.canvas=ko.recompute(function() {
					var canvas=document.createElement('canvas'),
						x=0,
						y=0,
						width=parseInt(group.width()),
						marginLeft=parseInt(group.marginLeft()),
						marginRight=parseInt(group.marginRight()),
						height=parseInt(group.height()),
						marginTop=parseInt(group.marginTop()),
						marginBottom=parseInt(group.marginBottom());

					var blocks=[];
					var _items=group.items();
					for(var n=_items.length, i=0; i<n;i++){
						var itemCanvas = _items[i].canvas();
						if(itemCanvas)
							blocks.push(itemCanvas);
					}
					if(!blocks.length) return null;
					algoritms[group.algoritm()].fit(blocks,width,height);
					
					canvas.width=blocks.width;
					canvas.height=blocks.height;
					canvas.ctx=canvas.getContext('2d');

					for(n=blocks.length, i=0; i<n;i++){
						var block=blocks[i],
							fit=block.fit;
						if(fit)
							canvas.ctx.drawImage(block,fit.x,fit.y);
					}

					var canvas2=document.createElement('canvas'),
						canvasWidth=canvas.width,
						canvasHeight=canvas.height,
						insertWidth=canvasWidth,
						insertHeight=canvasHeight;
										
					if(!isNaN(width)){
						if(!isNaN(marginLeft)){
							x=marginLeft;
							if(!isNaN(marginRight)) 
								insertWidth=width-marginRight-marginLeft;
						}
						else{
							if(!isNaN(marginRight))
								x=width-(canvasWidth+marginRight);
							else
								x=(width-canvasWidth)/2;
						}
						canvasWidth=width;
					}
					else{
						if(!isNaN(marginLeft)){
							x=marginLeft;
							canvasWidth+=marginLeft;
						}
						if(!isNaN(marginRight)){
							canvasWidth+=marginRight;
						}
					}
					if(!isNaN(height)){
						if(!isNaN(marginTop)){
							y=marginTop;
							if(!isNaN(marginBottom)) 
								insertHeight=height-marginBottom-marginTop;
						}
						else{
							if(!isNaN(marginBottom))
								y=height-(canvasHeight+marginBottom);
							else
								y=(height-canvasHeight)/2;
						}
						canvasHeight=height;
					}
					else{
						if(!isNaN(marginTop)){
							y=marginTop;
							canvasHeight+=marginTop;
						}
						if(!isNaN(marginBottom)){
							canvasHeight+=marginBottom;
						}
					}



					canvas2.width=canvasWidth;
					canvas2.height=canvasHeight;
					canvas2.ctx=canvas2.getContext('2d');
					if(insertWidth>0 && insertHeight>0)
						canvas2.ctx.drawImage(canvas,0,0,insertWidth,insertHeight,x,y,insertWidth,insertHeight);

					return canvas2;
			});//.extend({ throttle: 100 });
			group.position=ko.recompute(function() {
				var parentGroup=group.parentGroup();
				var x=0, y=0;
				if(parentGroup) {
					var parentGroupPos=parentGroup.position();
					x=parentGroupPos.x;
					y=parentGroupPos.y;
					var fit=group.canvas().fit;
					if(fit){
						x+=fit.x;
						y+=fit.y;
					}
				}
				else{
					var canvas=group.canvas();
				}
				return {x:x,y:y};
			});
			

			group.imageUrl=ko.recompute(function(){
				var canvas=group.canvas();
				
				if(canvas!=null){
					var mime=group.imagetype().mime;
					if(mime=='image/bmp'){
						var oData = readCanvasData(canvas);
						var strImgData = createBMP(oData);
						return makeDataURI(strImgData, 'image/bmp');
					}
					else
						if(mime=='image/gif'){
							var encoder = new GIFEncoder();
							encoder.start();
							encoder.addFrame(canvas.getContext('2d'));
							encoder.finish();
							var binary_gif = encoder.stream().getData();
							return makeDataURI(encodeData(binary_gif), 'image/gif');
						}
					return canvas.toDataURL(mime);
				}
				return null;
			});
			group.imageBMPUrl=ko.recompute(function(){
				var canvas=group.canvas();
				
				if(canvas!=null){
						var oData = readCanvasData(canvas);
						var strImgData = createBMP(oData);
						return makeDataURI(strImgData, 'image/bmp');
				}
				return null;
			});
			group.imageZipUrl=ko.recompute(function(){
				var imageUrl=group.imageUrl();
				if(imageUrl) {
					var zip = new JSZip();
					var imageData=imageUrl.replace(
						/^data\:image\/(bmp|png|gif|jpeg);base64,/i,
						''
					);
					zip.file(group.fileName(), imageData, {base64: true});
					return makeDataURI(zip.generate(), 'application/zip');
				}
				return null;
			});
			group.imageZipBMPUrl=ko.recompute(function(){
				var imageUrl=group.imageBMPUrl();
				if(imageUrl) {
					var zip = new JSZip();
					var imageData=imageUrl.replace(
						/^data\:image\/(bmp|png|gif|jpeg);base64,/i,
						''
					);
					zip.file(group.fileNameBMP(), imageData, {base64: true});
					return makeDataURI(zip.generate(), 'application/zip');
				}
				return null;
			});
			

			
						
			groups[group.id]=group;
			return group;
		};
		this.addGroup=function(name,parentgroup){
			var newgroup=createGroup({name:name,parentGroup:parentgroup});
			if(parentgroup) parentgroup.items.push(newgroup);
			return newgroup;
		};
		this.group=function(groupid){
			return groups[groupid];
		};
		this.delGroup=function(group){
			var groupid=group.id;
			var _groupitems=group.items();
			for(var i=0,n=_groupitems.length;i<n;i++){
				var groupitem=groupitems[_groupitems[i].rect.id];
				if(groupitem.type.name=='C3SGroup'){
					factory.delGroup(groupitem);
				}
				else if(groupitem.type.name=='C3SGroupItem'){
					var rectid=groupitem.rect.id;
					for(var  imageid in images){
						images[imageid].rects.remove(function(item){
							return item.id==rectid;
						});
					}
					delete rects[rectid];
					delete groupitems[rectid];
				}
			}
			if(group.parentGroup())
				group.parentGroup().items.remove(function(item) {
					return (item.type.name=='C3SGroup') && (item.id == groupid);
				});
			delete groups[groupid];
		};
		
		
		
		var groupitems={};
		var createGroupItem = this.createGroupItem = function(defaults){
			var group=defaults.group;
			var rect=defaults.rect;
			var groupitem = {
				type:{name:'C3SGroupItem'},
				name:rect.name,
				rect:rect,
				url:makeLink('groupitem',rect.id),
				cssArray:ko.observableArray([]),
				scale:ko.observable(100),
				marginLeft:ko.observable(defaults.marginLeft||null),
				marginRight:ko.observable(defaults.marginRight||null),
				width:ko.observable(defaults.width||null),
				marginTop:ko.observable(defaults.marginTop||null),
				marginBottom:ko.observable(defaults.marginBottom||null),
				height:ko.observable(defaults.height||null),
				className:ko.recompute(function() {
					return vm?((vm.currentGroupItemID()==rect.id)?'active':''):'';
				}),
				parentGroup:ko.observable(group),
				isGroup:false
			};
			groupitem.text=ko.recompute(function() {
				return '<span class="icon-picture"></span>'+groupitem.name();
			});
			groupitem.keydownW=function(data,event){
				return OnNumberKeyDown(event,1,100000,this.width);
			};
			groupitem.keydownML=function(data,event){
				return OnNumberKeyDown(event,-100000,100000,this.marginLeft);
			};
			groupitem.keydownMR=function(data,event){
				return OnNumberKeyDown(event,-100000,100000,this.marginRight);
			};
			groupitem.keydownH=function(data,event){
				return OnNumberKeyDown(event,1,100000,this.height);
			};
			groupitem.keydownMT=function(data,event){
				return OnNumberKeyDown(event,-100000,100000,this.marginTop);
			};
			groupitem.keydownMB=function(data,event){
				return OnNumberKeyDown(event,-100000,100000,this.marginBottom);
			};
			groupitem.canvas=ko.recompute(function() {
					var rectCanvas=groupitem.rect.canvas(),
						canvas=document.createElement('canvas'),
						x=0,
						y=0,
						canvasWidth=rectCanvas.width,
						canvasHeight=rectCanvas.height,
						insertWidth=canvasWidth,
						insertHeight=canvasHeight,
						width=parseInt(groupitem.width()),
						marginLeft=parseInt(groupitem.marginLeft()),
						marginRight=parseInt(groupitem.marginRight()),
						height=parseInt(groupitem.height()),
						marginTop=parseInt(groupitem.marginTop()),
						marginBottom=parseInt(groupitem.marginBottom());
					
					if(!isNaN(width)){
						if(!isNaN(marginLeft)){
							x=marginLeft;
							if(!isNaN(marginRight)) 
								insertWidth=width-marginRight-marginLeft;
						}
						else{
							if(!isNaN(marginRight))
								x=width-(canvasWidth+marginRight);
							else
								x=(width-canvasWidth)/2;
						}
						canvasWidth=width;
					}
					else{
						if(!isNaN(marginLeft)){
							x=marginLeft;
							canvasWidth+=marginLeft;
						}
						if(!isNaN(marginRight)){
							canvasWidth+=marginRight;
						}
					}
					if(!isNaN(height)){
						if(!isNaN(marginTop)){
							y=marginTop;
							if(!isNaN(marginBottom)) 
								insertHeight=height-marginBottom-marginTop;
						}
						else{
							if(!isNaN(marginBottom))
								y=height-(canvasHeight+marginBottom);
							else
								y=(height-canvasHeight)/2;
						}
						canvasHeight=height;
					}
					else{
						if(!isNaN(marginTop)){
							y=marginTop;
							canvasHeight+=marginTop;
						}
						if(!isNaN(marginBottom)){
							canvasHeight+=marginBottom;
						}
					}
					
					canvas.width=canvasWidth;
					canvas.height=canvasHeight;
					canvas.ctx=canvas.getContext('2d');
					if(insertWidth>0 && insertHeight>0)
						canvas.ctx.drawImage(rectCanvas,0,0,insertWidth,insertHeight,x,y,insertWidth,insertHeight);
					return canvas;
			});
			groupitem.position=ko.recompute(function() {
				var parentGroup=groupitem.parentGroup();
				var x=0, y=0;
				if(parentGroup) {
					var parentGroupPos=parentGroup.position();
					x=parentGroupPos.x;
					y=parentGroupPos.y;
					var fit=groupitem.canvas().fit;
					if(fit){
						x+=fit.x;
						y+=fit.y;
					}
				}
				return {x:x,y:y};
			});
			groupitems[rect.id]=groupitem;
			return groupitem;
		};
		this.groupitem=function(groupitemid){
			return groupitems[groupitemid];
		};		
		
		var cssArray={}, CSSlastID=0;
		var repeats=[
			{value:'no-repeat',title:'No repeat'},
			{value:'repeat',title:'Repeat'},
			{value:'repeat-x',title:'Repeat X'},
			{value:'repeat-y',title:'Repeat Y'}
		];

		var createCss=function(groupitem,defaults){
			var css={
				id:++CSSlastID,
				type:{name:'C3SCss'},
				name:ko.observable(defaults.name||'.csssprite'+CSSlastID),
				groupitem:groupitem,
				enableWidth:ko.observable(defaults.enableWidth?defaults.enableWidth:true),
				enableHeight:ko.observable(defaults.enableHeight?defaults.enableHeight:true),
				enableTop:ko.observable(defaults.enableTop?defaults.enableTop:true),
				enableLeft:ko.observable(defaults.enableLeft?defaults.enableLeft:true),
				repeats:repeats,
				repeat:ko.observable(repeats[0].value),
				repeatTitle:ko.observable(repeats[0].title)
			};
			
			css.onChangeRepeat=function(repeat){
				css.repeat(repeat.value);
				css.repeatTitle(repeat.title);
			};
			
			var f=function(){
				var rules=[];
				if(css.enableWidth()){
					rules.push({
						name:'width',
						value:css.groupitem.canvas().width+'px'
					});
				}
				if(css.enableHeight()){
					rules.push({
						name:'height',
						value:css.groupitem.canvas().height+'px'
					});
				}
				var strpos="";
				if(css.enableTop() || css.enableLeft()){
					var pos=css.groupitem.position();
					strpos=(css.enableTop()?(-pos.y):'0')+'px '+(css.enableLeft()?(-pos.x):'0')+'px ';
				}
				rules.push({
						name:'background',
						value:"url('../images/"+css.groupitem.parentGroup().fileName()+"') "+strpos+css.repeat()
				});
				return rules;	
			};
			css.rules=ko.recompute(f);
			
			
			
			cssArray[css.id]=css;
			return css;
		};
		
		this.addCss=function(groupitem,cssData){
			var css=createCss(groupitem,cssData||{});
			groupitem.cssArray.push(css);
			return css;
		};
		this.delCss=function(css){
			css.groupitem.cssArray.remove(css);
			delete cssArray[css.id];
		};
		
	};
	

	
	

	
	
	
	
	

	
	var algoritms={
		row:{
			title:'Row',
			fit:function(blocks,width,height){
				var x=0,y=0,w=0, h=0;
				for(var i=0,block=blocks[i];block=blocks[i];i++){
					if(!isNaN(width) && x!=0 && (x+block.width)>=width){
						x=0;
						y+=h;
						h=0;
					}
					block.fit={x:x,y:y};
					x+=block.width;
					h=Math.max(h,block.height);
					w=Math.max(w,x);
				}
				blocks.width=w;
				blocks.height=y+h;
										
			}
		},
		collumn:{
			title:'Collumn',
			fit:function(blocks,width,height){
				var x=0,y=0,w=0, h=0;
				for(var i=0,block=blocks[i];block=blocks[i];i++){
					if(!isNaN(height) && y!=0 && (y+block.height)>=height){
						y=0;
						x+=w;
						w=0;
					}
					block.fit={x:x,y:y};
					y+=block.height;
					w=Math.max(w,block.width);
					h=Math.max(h,y);
				}
				blocks.width=x+w;
				blocks.height=h;
										
			}
		},
		packer1:{
			title:'Packer 1',
			fit:function(blocks,width,height){
				var packer = new GrowingPacker();
				packer.fit(blocks);

				blocks.width=packer.root.width;
				blocks.height=packer.root.height;
										
			}
		}
	};
	

	
	

	

	var OnNumberKeyDown= function(event, lowerBound, upperBound, obs ) {
		var input=event.target;
		var value = parseInt(input.value, 10),
			keyCode;
	
		if (isNaN(value)) 
			value = 0;
		
		if (window.event) 
			keyCode = event.keyCode;
		else if (event.which)
			keyCode = event.which;
		
		if (keyCode == 38) 
		   value++;
		else if (keyCode == 40)
		   value--;  
		else
			return true;

		if (value > upperBound)
			value = upperBound;
		else if (value < lowerBound)
		   value = lowerBound;
			
		event.preventDefault();
		obs(value);
		return false;
	};
	
	var byid=function(id){
		return document.getElementById(id);
	};
	var Tab=function(tab,name,title){
		this.title=title;
		this.url=ko.observable(makeLink(name));
		this.className=ko.recompute(function() {
			return (name==tab())?'active':'';
		});
	};


	var VM = function(){
		//local
		var vm=this;
		var factory=new Factory();
		
		var tab=ko.observable('source');
		vm.tabs=[
			new Tab(tab,'source','Source'),
			new Tab(tab,'configure','Configure'),
			new Tab(tab,'result','Result')
		];
		var templates={
			sourceControls:{
				'C3SImage':'imageControls',
				'C3SRect':'rectControls'
			},
			configureControls:{
				'C3SGroup':'groupControls',
				'C3SGroupItem':'groupItemControls'
			},
			groupitem:{
				'C3SGroup':'group',
				'C3SGroupItem':'groupitem'
			}
		};
		var getTemplateByType=function(templatesName,data){
			if(data && data.type)
				return templates[templatesName][data.type.name];
			return 'empty';			
		};
		var currentRect=function() {
			return factory.rect(vm.currentRectID());
		};
		var currentImage=function() {
			var imageid=vm.currentImageID();
			if(imageid)
				return factory.image(imageid);
			var rect=currentRect();
			if(rect) return rect.image();
			return null;
		};
		var groupindex=1;


		//public
		this.images=ko.observableArray([]);
		this.groups=ko.observableArray([factory.addGroup("image"+(groupindex++))]);
		this.currentRectID=ko.observable(0);
		this.currentImageID=ko.observable(0);
		this.currentGroupID=ko.observable(0);
		this.currentGroupItemID=ko.observable(0);
		this.tab=tab;

		this.groupItemTemplate=function(data){
			return getTemplateByType('groupitem',data);
		},
		this.sourceControlsTemplate=function(data){
			return getTemplateByType('sourceControls',data);
		};
		this.sourceControlsData=ko.recompute(function(){
			if(vm.currentRectID()) return currentRect();
			if(vm.currentImageID()) return currentImage();
			return null;
		});
		this.configureControlsTemplate=function(data){
			return getTemplateByType('configureControls',data);
		};
		this.configureControlsData=ko.recompute(function(){
			var groupid=vm.currentGroupID();
			if(groupid) return factory.group(groupid);
			var groupitemid=vm.currentGroupItemID();
			if(groupitemid) return factory.groupitem(groupitemid);
			return null;
		});
		this.resultControlsTemplate=ko.observable('resultcss');
		this.resultControlsData=ko.observable(vm);
		
		/*this.isSourceTab=ko.recompute(function() {
			return tab()=='source';
		});
		this.isConfigureTab=ko.recompute(function() {
			return tab()=='configure';
		});
		this.isResultTab=ko.recompute(function() {
			return tab()=='result';
		});*/
		
		
		
		//events
		this.onClickUpload=function(){
			$('#files').click();
		};
		
		var getImageByName=function(name){
			var images=vm.images();
			for(var iImage=0, image; image=images[iImage]; iImage++){
				if(image.name()==name) return image;
			}
			return null;
		};
		var getRectByName=function(image, name){
			var rects=image.rects();
			for(var iRect=0, rect; rect=rects[iRect]; iRect++){
				if(rect.name()==name) return rect;
			}
			return null;
		};
		var getGroupByName=function(items,name){
			items=items();
			for(var i=0, groupitem; groupitem=items[i]; i++){
				if(groupitem.type.name=='C3SGroup' && groupitem.name()==name)
					return groupitem;
			}
			return null;
		}
		
		
		var importGroups=function(out,itemsData){
			for(var iGroup=0, groupData; groupData=itemsData[iGroup]; iGroup++){
				if(groupData.type=='group'){
					var group=getGroupByName(out,groupData.name);
					if(!group){
						group=factory.createGroup({
							name:groupData.name,
							parentGroup:out.group,
							marginLeft:groupData.marginLeft,
							width:groupData.width,
							marginRight:groupData.marginRight,
							marginTop:groupData.marginTop,
							height:groupData.height,
							marginBottom:groupData.marginBottom,
							algoritm:groupData.algoritm,
							imagetype:factory.getImageTypeByExt(groupData.imageExt)
						});
						out.push(group);
					}
					else{
						group.marginLeft(groupData.marginLeft);
						group.width(groupData.width);
						group.marginRight(groupData.marginRight);
						group.marginTop(groupData.marginTop);
						group.height(groupData.height);
						group.marginBottom(groupData.marginBottom);
						group.algoritm(groupData.algoritm);
						group.imagetype(factory.getImageTypeByExt(groupData.imageExt));
					}
					importGroups(group.items,groupData.groupitems);
				}
				else{
					/*
					 						marginLeft:groupitem.marginLeft(),
						width:groupitem.width(),
						marginRight:groupitem.marginRight(),
						marginTop:groupitem.marginTop(),
						height:groupitem.height(),
						marginBottom:groupitem.marginBottom(),
						imageName:groupitem.rect.image().name(),
						rectName:groupitem.rect.name(),
						cssArray:[]
					 */
					var image=getImageByName(groupData.imageName);
					if(!image) continue;
					var rect=getRectByName(image,groupData.rectName);
					if(!rect) continue;
								
			
					var groupitem=factory.createGroupItem({
						group:out.group,
						rect:rect,
						marginLeft:groupData.marginLeft,
						width:groupData.width,
						marginRight:groupData.marginRight,
						marginTop:groupData.marginTop,
						height:groupData.height,
						marginBottom:groupData.marginBottom
					});
					out.push(groupitem);
					
					for(var iCss=0, cssData; cssData=groupData.cssArray[iCss]; iCss++){
						factory.addCss(groupitem,cssData);
					}
				}
			}			
			
		}
		var applyRules=function(rules){
			if(!rules || !rules.images || !rules.groups) return;

			for(var iImage=0, imageData; imageData=rules.images[iImage]; iImage++){
				var image=getImageByName(imageData.name);
				if(!image){
					image=factory.createImage({name:imageData.name});
					vm.images.push(image);
				}
				for(var iRect=0, rectData; rectData=imageData.rects[iRect]; iRect++){
					var rect=getRectByName(image,rectData.name);
					if(rect){
						factory.delRect(rect);
					}
					rect=factory.createRect({
						image:image,
						name:rectData.name,
						x:rectData.x,
						y:rectData.y,
						w:rectData.w,
						h:rectData.h
					});
					image.rects.push(rect);	
				}
				
			}
			importGroups(vm.groups,rules.groups);
		}
		var str2ab =function(str) {
		  var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
		  var bufView = new Uint16Array(buf);
		  for (var i=0, strLen=str.length; i<strLen; i++) {
		    bufView[i] = str.charCodeAt(i);
		  }
		  return bufView;
		}
		this.onFilesSelected=function(vm,evt){
			var files = evt.target.files; // FileList object
			for (var i = 0, f; f = files[i]; i++) {
				if (!(/\.zip$/i.test(f.name)))
					continue;
				var reader = new FileReader();
				reader.onload = function(e) {
					
					var zip = new JSZip(e.target.result);
					var filesInZip=zip.file(/./);
					for(var iFileInZip=0, fileInZip; fileInZip=filesInZip[iFileInZip]; iFileInZip++){
						var fileInZipName=fileInZip.name;
						if(/\.txt$/i.test(fileInZipName)){
							var rules= JSON.parse(fileInZip.data);
							applyRules(rules);
						}
						else {
							var m=fileInZipName.match(/\.(jpg|jpeg|gif|png|bmp)$/i);
							if(m && m.length){
								var imageType=m[1].replace('jpg','jpeg');
								var img=document.createElement('img');
								img.fileInZipName=fileInZipName;
								//var blob=new Blob(str2ab(fileInZip.data),{"type" : "image\/jpeg"});
								img.onload=function(){
									var img=this;
									var name=img.fileInZipName;
									var image=factory.imageByName(name);
									if(image)
										image.img(img);
									else
										vm.images.push(factory.addImage(name,img));
								};
								img.src=makeDataURI(encodeData(fileInZip.data),'image/' + imageType);
							}
						}
					}
					
				}
				reader.readAsBinaryString(f);
			}
			
			for (var i = 0, f; f = files[i]; i++) {
			  if (!f.type.match('image.*'))
				continue;
			
			  var reader = new FileReader();
			  reader.f=f;
			  reader.onload = function(e) {
				var img=document.createElement('img');
				var name=this.f.name;
				img.onload=function(){
					var image=factory.imageByName(name);
					if(image)
						image.img(img);
					else
						vm.images.push(factory.addImage(name,img));
				};
				img.src=e.target.result;
			  };
			  reader.readAsDataURL(f);
			}

			for (var i = 0, f; f = files[i]; i++) {
				if (f.type!='text/plain')
					continue;
				var reader = new FileReader();
				reader.onload = function(e) {
					
					var rules= JSON.parse(e.target.result);
					applyRules(rules);
					
				}
				reader.readAsText(f);
			}
		};
		this.onClickAddRectToImage=function(image){
			var rect=factory.addRect(image);
			changeHash(rect.url);
		};
		this.onClickDublicateRect=function(rect){
			var newrect=factory.dublicateRect(rect);
			changeHash(newrect.url);
		};
		this.onClickDeleteRect=function(rect){
			factory.delRect(rect);
			changeHash(rect.image().url);
		};
		this.onClickRemoveGroupItem=function(groupitem){
			factory.delRect(groupitem.rect);
			changeHash(groupitem.parentGroup().url);
		};
		this.onClickAddSubGroup=function(group){
			var newgroup=factory.addGroup('group',group);
			changeHash(newgroup.url);
		};
		this.onClickRemoveGroup=function(group){
			if(group.parentGroup()==null && vm.groups().length <= 1) return;
			factory.delGroup(group);
			
			vm.groups.remove(group);
			if(group.parentGroup())
				changeHash(group.parentGroup().url);
			else 
				changeHash(vm.tabs[1].url);
			
		};
		this.onClickRemoveImage=function(image){
			factory.delImage(image);
			vm.images.remove(image);
			changeHash(vm.tabs[0].url);
		};
		
		this.onClickAddMainGroup=function(){
			vm.groups.push(factory.addGroup('image'+(groupindex++)));
		};
		this.onClickAddCss=function(groupitem){
			factory.addCss(groupitem);
		};
		this.onClickRemoveCss=function(css){
			factory.delCss(css);	
		};
		this.onAfterMoveRect=function(arg){
			arg.item.image(arg.targetParent.image);
		};
		this.onAfterGroupItem=function(arg){
			arg.item.image(arg.targetParent.image);
		};
		this.onAfterMoveGroupItem=function(arg){
			arg.item.parentGroup(arg.targetParent.group);
		};

		this.css=ko.recompute(function(){
			var s='';
			var groups=vm.groups();
			for(var iGroup=0, group;group=groups[iGroup]; iGroup++){
				s+="/*-- Image " + group.name() + " --*/\r\n";
				var items=group.allItems();
				for(var iItem=0, item;item=items[iItem]; iItem++){

					s+="\t/*-- Rect " + item.name() + " --*/\r\n";
					var cssArray=item.cssArray();
					for(var iCss=0, css;css=cssArray[iCss]; iCss++){
						s+="\t\t" + css.name() + "{\r\n";
						var rules=css.rules();
						for(var iRule=0, rule;rule=rules[iRule]; iRule++){
							s+="\t\t\t"+rule.name+":"+rule.value+";\r\n";
						}
						s+="\t\t}\r\n";
					}					
					
				}
			}
			return s;
		});
		var lastCssUrl=null;
		this.cssUrl=ko.recompute(function(){
			if(lastCssUrl)
				window.URL.revokeObjectURL(lastCssUrl);
			var blob = new Blob([vm.css()],{"type" : "text\/css"});
			return lastCssUrl=window.URL.createObjectURL(blob);
		});
		this.cssZipUrl=ko.recompute(function(){
			var zip=new JSZip();
			zip.file('style.css', vm.css());
			return makeDataURI(zip.generate(), 'application/zip');
		});
		this.zipUrl=ko.recompute(function(){
			var zip=new JSZip();
			zip.folder('css').file('style.css', vm.css());
			var folderImages=zip.folder('images');
			var groups=vm.groups();
			for(var iGroup=0, group;group=groups[iGroup]; iGroup++){
				var imageUrl=group.imageUrl();
				if(imageUrl) {
					var imageData=imageUrl.replace(
						/^data\:image\/(bmp|png|gif|jpeg);base64,/i,
						''
					);
					folderImages.file(group.fileName(), imageData, {base64: true});
				}				
			}
			return makeDataURI(zip.generate(), 'application/zip');
		});
		var getGroupData=function(group){
			var groupData = {
					type:'group',
					name:group.name(),
					marginLeft:group.marginLeft(),
					width:group.width(),
					marginRight:group.marginRight(),
					marginTop:group.marginTop(),
					height:group.height(),
					marginBottom:group.marginBottom(),
					algoritm:group.algoritm(),
					imageExt:group.imagetype().ext,
					groupitems:[]
			};
			var groupitems=group.items();
			for(var iItem=0, groupitem; groupitem=groupitems[iItem]; iItem++){
				if(groupitem.type.name=='C3SGroupItem'){
					var groupitemData={
						marginLeft:groupitem.marginLeft(),
						width:groupitem.width(),
						marginRight:groupitem.marginRight(),
						marginTop:groupitem.marginTop(),
						height:groupitem.height(),
						marginBottom:groupitem.marginBottom(),
						imageName:groupitem.rect.image().name(),
						rectName:groupitem.rect.name(),
						cssArray:[]
					};
					var cssArray=groupitem.cssArray();
					for(var iCss=0, css; css=cssArray[iCss]; iCss++){
						groupitemData.cssArray.push({
							name:css.name(),
							enableWidth:css.enableWidth(),
							enableHeight:css.enableHeight(),
							enableTop:css.enableTop(),
							enableLeft:css.enableLeft(),
							repeat:css.repeat()
						});
					}
					groupData.groupitems.push(groupitemData);
				}
				else
					if(groupitem.type.name=='C3SGroup'){
						groupData.groupitems.push(getGroupData(groupitem));
					}
				 
			}
			return groupData;
		};
		/*var getGroupItemPath=function(targetitem,mainGroupsArray){
			var parent=targetitem.parentGroup();
			var items;
			var path;
			if(parent){
				path=getGroupItemPath(parent,mainGroupsArray);
				items=parent.items();
			}
			else{
				path=[];
				items=mainGroupsArray;
			}
			for(var i=0, item; item=items[i]; i++){
				if(item==targetitem){
					path.push(i);
					break;
				}
			}
			return path;
		}*/
		this.projectData=ko.recompute(function(){
			
			var data={
				images:[],
				groups:[]
			};
			var groups=vm.groups();
			for(var iGroup=0, group; group=groups[iGroup]; iGroup++){
				data.groups.push(getGroupData(group));
							
			}
			var images=vm.images();
			for(var iImage=0, image; image=images[iImage]; iImage++){
				var imageData={
					name:image.name(),
					rects:[]
				};
				data.images.push(imageData);
				var rects=image.rects();
				for(var iRect=0, rect; rect=rects[iRect]; iRect++){
					var rectData={
						name:rect.name(),
						x:rect.x(),
						y:rect.y(),
						w:rect.w(),
						h:rect.h()
					};
					imageData.rects.push(rectData);
					var groupitem=factory.groupitem(rect.id);

				}						
			}
			return JSON.stringify(data, null, "\t");
		});
		this.jsonTxtUrl=ko.recompute(function(){
			vm.projectData();
		});
		var lastJsonTxtUrl=null;
		this.jsonTxtUrl=ko.recompute(function(){
			if(lastJsonTxtUrl)
				window.URL.revokeObjectURL(lastJsonTxtUrl);
			var blob = new Blob([vm.projectData()]);
			return lastJsonTxtUrl=window.URL.createObjectURL(blob);
		});
		this.jsonZipUrl=ko.recompute(function(){
			var zip=new JSZip();
			zip.file('cssSpritesRules.txt', vm.projectData());
			return makeDataURI(zip.generate(), 'application/zip');
		});
		this.sourceImagesUrl=ko.recompute(function(){
			var zip=new JSZip();
			var images=vm.images();
			for(var iImage=0, image; image=images[iImage]; iImage++){
				var imageUrl=image.img().src;
				if(imageUrl) {
					var imageData=imageUrl.replace(
						/^data\:image\/(bmp|png|gif|jpeg);base64,/i,
						''
					);
					zip.file(image.name(), imageData, {base64: true});
				}				
			}
			return makeDataURI(zip.generate(), 'application/zip');
		});		
		this.projectUrl=ko.recompute(function(){
			var zip=new JSZip();
			zip.file('cssSpritesRules.txt', vm.projectData());
			var images=vm.images();
			for(var iImage=0, image; image=images[iImage]; iImage++){
				var imageUrl=image.img().src;
				if(imageUrl) {
					var imageData=imageUrl.replace(
						/^data\:image\/(bmp|png|gif|jpeg);base64,/i,
						''
					);
					zip.file(image.name(), imageData, {base64: true});
				}				
			}
			return makeDataURI(zip.generate(), 'application/zip');
		});
			
		
		this.algoritms=[];
		for(var algoritmname in algoritms){
			this.algoritms.push({value:algoritmname, title:algoritms[algoritmname].title});
		}
	};

	var drawrect=function(ctx,x,y,w,h,scale){
		if(scale){
			x=Math.round(x*scale/100);
			y=Math.round(y*scale/100);
			w=Math.round(w*scale/100);
			h=Math.round(h*scale/100);
		}
		ctx.fillRect(x, y, 1, h);
		ctx.fillRect(x+w-1, y, 1, h);
		ctx.fillRect(x, y, w, 1);
		ctx.fillRect(x, y+h-1, w, 1);
	};
	ko.extenders.async = function(target, timeout) {
		target['throttleEvaluation'] = timeout;
		return target;
	};
		
	var originalUnwrapObservable= ko.utils.unwrapObservable;
	ko.utils.unwrapObservable=function(value){
		return ((value instanceof Object)&&value.val)?value.val():originalUnwrapObservable(value);
	};
	ko.recompute=function(callback){
		var rez=function(){
			return rez.val();
		};
		
		var o={
			deferEvaluation:true,
			read:function(){
				var s=rez.val.getSubscriptionsCount()==0;
				var d=rez.val.getDependenciesCount()==0;
				if(s!=d) {
					setTimeout(function(){
						rez.val.dispose();
						rez.val=ko.computed(o);
					},1);
					return null;
				}
				return callback();			
			}
		};
		rez.val=ko.computed(o);
		return rez;
	};

		ko.onDemandObservable = function(callback) {
			var rez=function(){
				return rez.val();
			};
			var z;
			var _value = ko.observable();
			var loaded = ko.observable(true);
			var checkDispose=function(){
					var s=rez.val.getSubscriptionsCount()==0;
					var d=z.getDependenciesCount()==0;
					if(s!=d) {
						setTimeout(function(){
							rez.val.dispose();
							z.dispose();
							loaded(true);
							_value(null);
							rez.val=ko.computed(o);
							z=ko.computed(oz);
						},1);
						return true;
					}
					return false;
			};
			var oz={
				read: function() {
					if(checkDispose()) return;
					if (!loaded()) 
						callback.call(_value);

				},
        			write: function(newValue) {
            	            		loaded(true);
					_value(newValue);
				},
          			deferEvaluation: true
			};
			var o={
				read: function() {
					if (loaded()) {
						loaded(false);	z();
					}
					return _value();
				},
				deferEvaluation: true
			};
			
			rez.val = ko.computed(o);
			z = ko.computed(oz);
			return rez;
		};
		
		
		/*
		ko.onDemandObservable = function(callback) {
    var _value = ko.observable();  //private observable

    var result = ko.dependentObservable({
        read: function() {
            //if it has not been loaded, execute the supplied function
            if (!result.loaded()) {
                callback.call(result);
            }
            //always return the current value
            return _value();
        },
        write: function(newValue) {
            //indicate that the value is now loaded and set it
            result.loaded(true);
            _value(newValue);
        },
        deferEvaluation: true  //do not evaluate immediately when created
    });

    //expose the current state, which can be bound against
    result.loaded = ko.observable();  
    //load it again
    result.refresh = function() {
        result.loaded(false);
    };

    return result;
};		
		*/
		
		ko.bindingHandlers.toggleClass = {
			init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
				var data=valueAccessor().data;
				$(element).click(function(){
					data(!data());
				});
			},
			update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
				var value=valueAccessor();
				if(value.data())
					$(element).addClass(value.class);
				else
					$(element).removeClass(value.class);
			}
		};
		ko.bindingHandlers.lazyHref = {
			init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
				var value=this.value=valueAccessor();
				var $el=this.$el=$(element);
				var f=this.f=function(){
					
						var v=ko.utils.unwrapObservable(value);
						$el.attr('href',(v && v.length)?v:'#');
						$el.unbind('click');
						return false;
						//setTimeout(function(){$el.click()},200);

				}
				$el.bind('click',f);
			},
			update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
				this.value=valueAccessor();
				this.$el.attr('href','');
				this.$el.bind('click',this.f);
			}
		};
		ko.bindingHandlers.canvas = {
			init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
				//element.width=
				//var canvas=valueAccessor().canvas;
				//$(element).click(function(){
				//	data(!data());
				//});
			},
			update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
				var value=valueAccessor();
				var canvas,scale;
				if(value.canvas){
					canvas=ko.utils.unwrapObservable(value.canvas);
					scale=ko.utils.unwrapObservable(value.scale)||0;
				}
				else{
					canvas=ko.utils.unwrapObservable(value);
					scale=0;
				}
				if(canvas){
					switch(element.tagName.toLowerCase()){
						case 'canvas':
							var width=scale?Math.round(canvas.width*scale/100):canvas.width;
							var height=scale?Math.round(canvas.height*scale/100):canvas.height;
							element.width=width;
							element.height=height;
							var context = element.getContext('2d');
							context.drawImage(canvas, 0, 0,width,height);
							
							var rects=ko.utils.unwrapObservable(value.rects);
							if(rects){
								var activerect=null;
								context.fillStyle='#777777';
								for(var i=0, n=rects.length; i<n; i++){
									var rect=rects[i];
									if(rect.active) activerect=rect;
									
									drawrect(context,rect.x, rect.y, rect.w, rect.h, scale);
								}
								if(activerect){
									context.fillStyle='#00ff00';
									drawrect(context,activerect.x, activerect.y, activerect.w, activerect.h, scale);
								}
							}
							break;
						case 'img':
							
							var blob=null;
							canvas.toBlob(function(b){
								element.src=window.URL.createObjectURL(b);
							},'image/jpeg');
							break;
					}
				}
			}
		};

	var vm=new VM();

	this.init=function(){

		if(location.hash!="#!source")
			changeHash("#!source");
        else{
			changeHash("#!source");
			OnHashChange();
		}
		
		ko.applyBindings(vm);
	};
	return this;
}();

$(function(){
	CssSprites.init();
	
});
