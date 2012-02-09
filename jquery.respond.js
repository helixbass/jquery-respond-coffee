((function(){var a=Object.prototype.hasOwnProperty,b=Array.prototype.indexOf||function(b){for(var c=0,d=this.length;c<d;c++)if(a.call(this,c)&&this[c]===b)return c;return-1};(function(a){var c,d,e,f,g,h,i,j,k,l,m,n;f=a(window),m=a.respond={update:function(){},mediaQueriesSupported:Modernizr.mq("only all")};if(m.mediaQueriesSupported)return;return e=a("head link"),d=e.last(),c=a("base"),l=document.documentElement,j=function(){function b(a){var b,c,d;this.el=a,b=this.el,this.href=b.href,this.rel=b.rel,this.media=b.media;if(this.href in this.parsed)return;this.href_dir=this.href.slice(0,this.href.lastIndexOf("/")+1||9e9),this.text=(c=this.el)!=null?(d=c.styleSheet)!=null?d.rawCssText:void 0:void 0;if(this.text)return this.parse();if(!this.same_domain())return;this.enqueue}return b.prototype.parsed={},b.prototype.queue=[],b.fetching=!1,b.prototype.enqueue=function(){this.queue.push(this);if(!this.fetching)return this.fetch},b.prototype.fetch=function(){var c=this;return b.fetching=!0,a.get(this.href,function(a){var d,e;return c.text=a,c.parse(),(d=(e=c.queue.shift())!=null?e.fetch():void 0)!=null?d:b.fetching=!1})},b.prototype.same_domain=function(){return!/^([a-zA-Z:]*\/\/)/.test(this.href)&&!c.length||this.href.replace(RegExp.$1,"").split("/")[0]===location.host},b.prototype.rule_re=/@media[^\{]+\{([^\{\}]*\{[^\{\}]*\})+/gi,b.prototype.query_block_re=/@media\*([^\{]+)\{([\S\s]+?)$/,b.prototype.parse=function(){var a;return this.types={},this.rules=function(){var b,c,d,e;d=this.text.match(this.rule_re),e=[];for(b=0,c=d.length;b<c;b++)a=d[b],a.match(this.query_block_re)&&e.push(new h(RegExp.$1.split(","),RegExp.$2,this));return e}.call(this),!this.rules.length&&this.media&&(this.rules=[new h(this.media,this.text)]),this.parsed[this.href]=this,this.apply()},b.prototype.apply=function(){var a,b,c,d,e,f,g;f=this.types;for(e in f)g=f[e],d=g.tag,b=g.queries,d!=null&&d.detach(),a=function(){var a,d,e;e=[];for(a=0,d=b.length;a<d;a++)c=b[a],c.applies()&&e.push(c.rule.block);return e}(),a&&(this.types[e].tag=new k(e,a));return!1},b}(),k=function(){function b(b,c){var e,f,g;this.media=b,this.blocks=c,this.text=this.blocks.join("\n"),this.$node=a("<style type='text/css' media='"+this.media+"'>").insertBefore(d.next()),e=this.$node.get(0),(f=(g=e.styleSheet)!=null?g.cssText=this.text:void 0)!=null?f:e.appendChild(document.createTextNode(this.text))}return b.prototype.detach=function(){return this.$node.detach()},b}(),i=function(){function a(a,c){var d,e,f;this.text=a,this.rule=c,this.type=this.text.split("(")[0].match(this.type_re)&&RegExp.$2||"all",this.has_expression=b.call(this.text,"(")>=0,this.text.match(this.min_re)&&(this.min=new g(RegExp.$1,RegExp.$2)),this.text.match(this.max_re)&&(this.max=new g(RegExp.$1,RegExp.$2)),((f=(d=this.rule.sheet.types)[e=this.type])!=null?f:d[e]={queries:[]}).queries.push(this)}return a.prototype.applies=function(){return!this.has_expression||(this.min!=null||this.max!=null)&&(this.min!=null?this.width()>=this.min.px():void 0)&&(this.max!=null?this.width()<=this.max.px():void 0)},a.prototype.type_re=/(only\s+)?([a-zA-Z]+)/,a.prototype.min_re=/\(min\-width:\s*([0-9\.]+)(px|em)\s*\)/,a.prototype.max_re=/\(max\-width:\s*([0-9\.]+)(px|em)\s*\)/,a}(),g=function(){function b(a,b){this.unit=b,this.val=parseFloat(a)}return b.prototype._em_value=function(){var c,d,e,f;return d=a("<div>").css({position:"absolute",fontSize:"1em",width:"1em"}),e=!1,c=((f=document.body)!=null?f:e=!0)&&a("<body>"),c.appendChild(d),l.insertBefore(c,l.firstChild),b.cached_em_value=parseFloat(d.offsetWidth),e?l.removeChild(c):c.removeChild(d),this.cached_em_value},b.prototype.em_value=function(){var a;return(a=this.cached_em_value)!=null?a:this._em_value()},b.prototype.px=function(){return this.val*(this.unit==="em"?this.em_value():1)},b}(),h=function(){function a(a,b,c){var d;this.sheet=c,this.block=this.replace_urls(b),this.queries=function(){var b,c,e;e=[];for(b=0,c=a.length;b<c;b++)d=a[b],e.push(new i(d,this));return e}.call(this)}return a.prototype.replace_urls_re=/url\(['"]?([^\/\)'"][^:\)'"]+)['"]?\)/g,a.prototype.replace_urls=function(a){return a.replace(this.replace_urls_re,"url( "+this.sheet.href_dir+"$1 )")},a}(),(m.update=function(){return e.filter(function(){var a;return!!this.href&&((a=this.rel)!=null?a.toLowerCase():void 0)==="stylesheet"}).each(function(){return new j(this)})})(),(n=f.smartresize)!=null?n:f.resize(function(){var a,b,c,d;c=j.parsed,d=[];for(a in c)b=c[a],d.push(b.apply());return d})})(jQuery)})).call(this);