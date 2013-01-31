<!DOCTYPE html>
<html lang="en">
<head>
<meta content="text/html; charset=utf-8" http-equiv="content-type">
<title>CSS Sprites online by SimpReal</title>
<link href="/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.9.1/themes/base/jquery-ui.css" />
    <script src="http://code.jquery.com/jquery-1.8.2.js"></script>
    <script src="http://code.jquery.com/ui/1.9.1/jquery-ui.js"></script>

	<script src="/bootstrap/js/bootstrap.min.js"></script>
    <script type='text/javascript' src='/js/knockout-2.2.0.debug.js'></script>
    <script type='text/javascript' src='js/knockout-sortable.js'></script>
    
    	
	<script src="/js/packer.growing.js" type="text/javascript"></script>
    <script src="/js/packer.js" type="text/javascript"></script>
    
    <script src="/js/base64.js" type="text/javascript"></script>
	<script src="/js/canvas2image.js" type="text/javascript"></script> 
	<script type="text/javascript" src="/js/canvastogif/LZWEncoder.js"></script>
	<script type="text/javascript" src="/js/canvastogif/NeuQuant.js"></script>
	<script type="text/javascript" src="/js/canvastogif/GIFEncoder.js"></script>
	
	<script type="text/javascript" src="/js/jszip/jszip.js"></script>
	<script type="text/javascript" src="/js/jszip/jszip-load.js"></script>
    <script src="js/csssprites.js"></script>
    <style>
		/*.input-append .active, .input-prepend .active {
			border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
		}*/
	</style>
</head>
<body>


<script type="text/html" id="empty">

</script>
<script type="text/html" id="imageControls">
	<div class="control-group warning">
		<div class="input-prepend">
			<span class="add-on">Image</span>
			<input class="" type="text" data-bind="value: name">
		</div>
		<div class="input-prepend input-append">
			<span class="add-on">Scale</span>
			<input class="input-mini" type="text" data-bind="value: scale">
			<span class="add-on">%</span>
		</div>
		<button type="button" class="btn btn-success" data-bind="click: $root.onClickAddRectToImage">Add Rectangle</button>
		<button type="button" class="btn btn-danger" data-bind="click: $root.onClickRemoveImage">Remove</button>
	</div>
	<canvas data-bind="canvas:{canvas:img, scale:scale, rects:rectsInCanvas}" style="border:1px solid blue;"></canvas>
</script>
<script type="text/html" id="rectControls">
	<div class="control-group warning">
		<div class="input-prepend">
			<span class="add-on">Rectangle</span>
			<input class="" type="text" data-bind="value: name">
		</div>
		<div class="input-prepend">
			<span class="add-on" data-bind="text: group.name"></span>
		</div>
		<button type="button" class="btn btn-success" data-bind="click: $root.onClickDublicateRect">Dublicate</button>
		<button type="button" class="btn btn-danger" data-bind="click: $root.onClickDeleteRect">Delete</button>
	</div>
	<div class="control-group info">
		<div class="input-prepend input-append">
			<span class="add-on">X</span>
			<input class="input-mini" type="text" data-bind="value: x, event:{keydown: keydownX}">
			<span class="add-on">px</span>
		</div>	
		<div class="input-prepend input-append">
			<span class="add-on">Y</span>
			<input class="input-mini" type="text" data-bind="value: y, event:{keydown: keydownY}">
			<span class="add-on">px</span>
		</div>	
		<div class="input-prepend input-append">
			<span class="add-on">Width</span>
			<input class="input-mini" type="text" data-bind="value: w, event:{keydown: keydownW}">
			<span class="add-on">px</span>
		</div>	
		<div class="input-prepend input-append">
			<span class="add-on">Height</span>
			<input class="input-mini" type="text" data-bind="value: h, event:{keydown: keydownH}">
			<span class="add-on">px</span>
		</div>
	</div>
	<canvas data-bind="canvas:{canvas:image().img, scale:image().scale, rects:rectsInCanvas}" style="border:1px solid blue;"></canvas>
</script>
<script type="text/html" id="groupControls">
	<div class="control-group warning">
		<div class="input-prepend">
			<span class="add-on">Group</span>
			<input class="" type="text" data-bind="value: name">
		</div>
		<div class="btn-group">
			<a class="btn btn-success dropdown-toggle" data-toggle="dropdown">
				<span data-bind="text:imageTypeTitle()"></span> <span class="caret"></span>
			</a>
			<ul class="dropdown-menu" data-bind="foreach:imagetypes">
				<li><a data-bind="text:title, click:$parent.onChangeImageType"></a></li>
			</ul>
		</div>
		<div class="input-prepend input-append">
			<span class="add-on">Scale</span>
			<input class="input-mini" type="text" data-bind="value: scale">
			<span class="add-on">%</span>
		</div>
		<button type="button" class="btn btn-success" data-bind="click: $root.onClickAddSubGroup">Add Child Group</button>
		<button type="button" class="btn btn-danger" data-bind="click: $root.onClickRemoveGroup">Remove</button>
	</div>
	<div class="control-group info">
		<div class="input-prepend input-append">
			<span class="add-on">Margin Left</span>
			<input class="input-mini" type="text" data-bind="value: marginLeft, event:{keydown: keydownML}">
			<span class="add-on">px</span>
		</div>	
		<div class="input-prepend input-append">
			<span class="add-on">Width</span>
			<input class="input-mini" type="text" data-bind="value: width, event:{keydown: keydownW}">
			<span class="add-on">px</span>
		</div>	
		<div class="input-prepend input-append">
			<span class="add-on">Margin Right</span>
			<input class="input-mini" type="text" data-bind="value: marginRight, event:{keydown: keydownMR}">
			<span class="add-on">px</span>
		</div>	
	</div>
    <div class="control-group info">
		<div class="input-prepend input-append">
			<span class="add-on">Margin Top</span>
			<input class="input-mini" type="text" data-bind="value: marginTop, event:{keydown: keydownMT}">
			<span class="add-on">px</span>
		</div>	
		<div class="input-prepend input-append">
			<span class="add-on">Height</span>
			<input class="input-mini" type="text" data-bind="value: height, event:{keydown: keydownH}">
			<span class="add-on">px</span>
		</div>	
		<div class="input-prepend input-append">
			<span class="add-on">Margin Bottom</span>
			<input class="input-mini" type="text" data-bind="value: marginBottom, event:{keydown: keydownMB}">
			<span class="add-on">px</span>
		</div>
	</div>
	<div class="control-group success">
		<div class="input-prepend">
			<span class="add-on">Algoritm</span>
			<select data-bind="value:algoritm, foreach: $root.algoritms">
				<option data-bind="text:title, value:value"></option>
			</select>
		</div>

		<div class="btn-group">
			<button data-toggle="dropdown" class="btn dropdown-toggle btn-success">Sort <span class="caret"></span></button>
			<ul class="dropdown-menu">
				<li><a data-bind="event:{click: SortByWidth}">By Width</a></li>
				<li><a data-bind="event:{click: SortByHeight}">By Height</a></li>
				<li><a data-bind="event:{click: SortByArea}">By Area</a></li>
				<li><a data-bind="event:{click: SortByMaxSide}">By Max Side</a></li>
				<li class="divider"></li>
				<li><a data-bind="event:{click: SortByName}">By Name</a></li>
			</ul>
		</div>
	
	</div>
	<canvas data-bind="canvas:{canvas:canvas, scale:scale}" style="border:1px solid blue;"></canvas>
</script>
<script type="text/html" id="groupItemControls">
	<div class="control-group warning">
		<div class="input-prepend">
			<span class="add-on">Item</span>
			<input class="" type="text" data-bind="value: name">
		</div>
		<div class="input-prepend input-append">
			<span class="add-on">Scale</span>
			<input class="input-mini" type="text" data-bind="value: scale">
			<span class="add-on">%</span>
		</div>
		<button type="button" class="btn btn-danger" data-bind="click: $root.onClickRemoveGroupItem">Remove</button>
	</div>
    <div class="control-group info">
		<div class="input-prepend input-append">
			<span class="add-on">Margin Left</span>
			<input class="input-mini" type="text" data-bind="value: marginLeft, event:{keydown: keydownML}">
			<span class="add-on">px</span>
		</div>	
		<div class="input-prepend input-append">
			<span class="add-on">Width</span>
			<input class="input-mini" type="text" data-bind="value: width, event:{keydown: keydownW}">
			<span class="add-on">px</span>
		</div>	
		<div class="input-prepend input-append">
			<span class="add-on">Margin Right</span>
			<input class="input-mini" type="text" data-bind="value: marginRight, event:{keydown: keydownMR}">
			<span class="add-on">px</span>
		</div>	
	</div>
    <div class="control-group info">
		<div class="input-prepend input-append">
			<span class="add-on">Margin Top</span>
			<input class="input-mini" type="text" data-bind="value: marginTop, event:{keydown: keydownMT}">
			<span class="add-on">px</span>
		</div>	
		<div class="input-prepend input-append">
			<span class="add-on">Height</span>
			<input class="input-mini" type="text" data-bind="value: height, event:{keydown: keydownH}">
			<span class="add-on">px</span>
		</div>	
		<div class="input-prepend input-append">
			<span class="add-on">Margin Bottom</span>
			<input class="input-mini" type="text" data-bind="value: marginBottom, event:{keydown: keydownMB}">
			<span class="add-on">px</span>
		</div>	
	</div>
	<div class="control-group success" data-bind="foreach:{data:cssArray}">
		<div class="input-prepend input-append">
			<span class="add-on">CSS</span>
			<input class="" type="text" data-bind="value: name">
		</div>	
		<div class="btn-group">
			<button class="btn btn-success" data-bind="toggleClass:{data:enableWidth,class:'active'}">Width</button>
			<button class="btn btn-success" data-bind="toggleClass:{data:enableHeight,class:'active'}">Height</button>
			<button class="btn btn-success" data-bind="toggleClass:{data:enableTop,class:'active'}">Top</button>
			<button class="btn btn-success" data-bind="toggleClass:{data:enableLeft,class:'active'}">Left</button>
		</div>
		<div class="btn-group">
			<a class="btn btn-success dropdown-toggle" data-toggle="dropdown">
				<span data-bind="text:repeatTitle"></span> <span class="caret"></span>
			</a>
			<ul class="dropdown-menu" data-bind="foreach:repeats">
				<li><a data-bind="text:title, click:$parent.onChangeRepeat"></a></li>
			</ul>
		</div>		
		<button type="button" class="btn btn-danger" data-bind="click: $root.onClickRemoveCss">Remove CSS</button>
	</div>
	<div class="control-group">
		<button type="button" class="btn btn-success" data-bind="click: $root.onClickAddCss">Add CSS</button>
	</div>
	<canvas data-bind="canvas:{canvas:canvas, scale:scale}" style="border:1px solid blue;"></canvas>
</script>
<script type="text/html" id="group">
	<li data-bind="attr:{class:className }"><a data-bind="html: text,attr: { href: url }"> </a>
		<ul style="padding-bottom:2px; border:1px solid #0088CC;" class="nav nav-list" data-bind="sortable: {template:$root.groupItemTemplate,data:items,connectClass:'groupitemlist',afterMove:$root.onAfterMoveGroupItem}">
		</ul>
	</li>
</script>
<script type="text/html" id="groupitem">
	<li data-bind="attr:{class:className}">
		<a data-bind="html: text, attr:{href:url}" > </a>
	</li>
</script>
<script type="text/html" id="resulthome">
result
</script>
<script type="text/html" id="resultcss">
<div class="control-group success">
	<a class="btn btn-success" data-bind="attr:{href:cssUrl}" download="style.css" target="_blank" >Save CSS</a> 
	<a class="btn btn-success" target="_blank" download="style.zip" data-bind="attr:{href: cssZipUrl}">ZIP</a>
</div>
 
<pre data-bind="foreach:{data:groups}">
<span class="muted">/*-- Image <span data-bind="text:name"></span> --*/</span><!-- ko foreach:{data:allItems} -->
	<span class="muted">/*-- Item <span data-bind="text:name"></span> --*/</span><!-- ko foreach:{data:cssArray} -->
		<a class="text-success" data-bind="text:name, attr:{href:$parent.url}"></a> {<!-- ko foreach:{data:rules} -->
			<span class="text-info" data-bind="text:name"></span>: <span class="text-warning" data-bind="text:value"></span>;<!-- /ko -->
		}
<!-- /ko --><!-- /ko --></pre>
</script>
<script type="text/html" id="resultimages">
<ul class="thumbnails" data-bind="foreach:{data:groups}">
	<li class="span4">
		<div class="thumbnail">
			<img data-bind="attr:{src:imageUrl}" />
			<h3><a data-bind="attr:{href:url},text:name"></a></h3>
			<div class="control-group success">
				<a class="btn btn-success" target="_blank" data-bind="attr:{download:fileName, href: imageUrl},text:imageTypeTitle"></a>
				<a class="btn btn-success" target="_blank" data-bind="visible:showImageBMP, attr:{download:fileNameBMP, href: imageBMPUrl}">BMP</a>
				<a class="btn btn-success" target="_blank" download="image.zip" data-bind="attr:{href: imageZipUrl}">ZIP</a>
				<a class="btn btn-success" target="_blank" download="image.zip" data-bind="visible:showImageBMP, attr:{href: imageZipBMPUrl}">ZIP BMP</a>
			</div>
		</div>
	</li>
</ul>
</script>
<script type="text/html" id="resultproject">
	<div class="control-group success">
		<a class="btn btn-success" target="_blank" download="cssSpritesRules.txt" data-bind="attr:{href: jsonTxtUrl}">Rules</a>
		<a class="btn btn-success" target="_blank" download="cssSpritesRules.zip" data-bind="attr:{href: jsonZipUrl}">ZIP (Rules)</a>
		<a class="btn btn-success" target="_blank" download="sourceImages.zip" data-bind="attr:{href: sourceImagesUrl}">ZIP (Source Images)</a>
		<a class="btn btn-success" target="_blank" download="cssSpritesProject.zip" data-bind="attr:{href: projectUrl}">ZIP (Source Images + Rules)</a>
	</div>
	<pre data-bind="text:projectData"></pre>
</script>
<script type="text/html" id="source">
	<input style="display:none;" type="file" id="files" data-bind="event:{change:onFilesSelected}" name="files[]" multiple />

    <div class="container-fluid">
        <div class="row-fluid">
            <div class="span3">
                <div class="controls controls-row">
                    <button class="btn btn-primary" data-bind="event:{click:onClickUpload}" type="button">+ Add files</button>
                </div>
                <ul id="sourceList" class="nav nav-list" data-bind="sortable: {data:images,connectClass:'imagelist'}">
            		<li data-bind="attr:{class:className}" ><a data-bind="html: text,attr: { href: url }"> </a>
                	<ul style="padding-bottom:3px;" class="nav nav-list" data-bind="sortable:{data: rects,connectClass:'rectlist',afterMove:$root.onAfterMoveRect}">
                		<li data-bind="attr:{class:className}"><a data-bind="html: text,attr: { href: url }"> </a></li>
                	</ul>
                    </li>
            	</ul>
            </div>
            <div class="span9">
                <div class="form-inline" data-bind="template: {name: sourceControlsTemplate, data: sourceControlsData }">
                </div>
            </div>
        </div>
    </div>
</script>
<script type="text/html" id="configure">
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="span3">
    			<ul id="configureList" class="nav nav-list" data-bind="sortable: {template:'group',data:groups}" >
    			</ul>
                <br />
                <div class="control-group">
                    <button type="button" class="btn btn-primary" data-bind="click: $root.onClickAddMainGroup">Add Output</button>
                </div>
            </div>
            <div class="span9">
                <div class="form-inline" data-bind="template: {name: configureControlsTemplate, data: configureControlsData }">
                </div>
            </div>
         </div>
     </div>
</script>
<script type="text/html" id="result">
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="span3">
            	<a class="btn btn-success" target="_blank" download="sprites.zip" data-bind="attr:{href: zipUrl}">Download</a>
                <ul>
                    <li><a href="#!css" >CSS</a></li>
                    <li><a href="#!outimages" >Images</a></li>
                    <li><a href="#!project" >Project</a></li>
                </ul>
            </div>
            <div class="span9">
                <div class="form-inline" data-bind="template: {name: resultControlsTemplate(), data: resultControlsData }">
                </div>
            </div>
         </div>
     </div>
</script>
<div class="containerzzz">
    <ul id="css_sprite_nav" class="nav nav-tabs" data-bind="foreach:tabs">
		<li data-bind="attr:{class:className}"><a data-bind="text:title, attr:{href:url}"></a></li>
    </ul>
    <div id="css_sprite_content" class="tab-content">
        <div data-bind="template: tab">
        </div>
	</div>
</div>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-38115137-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</body>
</html>