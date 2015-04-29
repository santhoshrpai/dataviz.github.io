var first=1;
//obama: article1236551
//filename="article09_05_28_1952214";

var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  //alert(query);
  var vars = query.split("&");
  /*for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    	// If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
    	// If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
    	// If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
    return query_string;*/
	var pair = vars[0].split("=");
	
	return pair[1];
} ();

filename=QueryString;
//jsonFileMainView="data/"+filename+".json";
jsonFileMainView="data/convis_questions1.json";
//jsonFileMainView=filename+".json";
revisedTopicFile="revisdTopics.json";
//alert(jsonFileMainView);
function parseNodes(nodes) { // takes a nodes array and turns it into a <ol>
    var ol = document.createElement("ul");
	if(first==1)
	{
		ol.setAttribute('id','comments');	 
		first=0;
	}
	else{
		ol.setAttribute('class','children');
	}
	//alert("Creating OL"+nodes.length);
    for(var i=0; i<nodes.length; i++) {
		//alert("length"+nodes.length);
        ol.appendChild(parseNode(nodes[i]));
    }	
    return ol;
}

function parseNode(node) { // takes a node object and turns it into a <li>
    var li = document.createElement("LI");
	li.setAttribute('id',node.commentid);
	var sentences="";
    for(var i=0; i<node.sent.length; i++) {
		//alert("length"+nodes.length);
		sentences+=node.sent[i].sent+" ";
    }
				
	var imgsrc = getImgSrc("'"+node.commentid+"'");

	var text="<div class=\"comment\""+"id=\"div"+node.commentid+"\"onmouseover=\"commentMouseOver('"+node.commentid+"','"+node.parent+"')\""+
					" onmouseout=\"commentMouseOut('"+node.commentid+"','"+node.parent+"')\""+
					" onclick=\"commentMouseClick("+node.commentid+")\" style=\"border:"+"0px;\">"+
					"<div class=\"comment-author\"><img src=\""+imgsrc+"\" /><a href=\"/\"  style=\"color: rgb(152, 78, 163)\">"+
					node.author+"</a>"+
					drawSentimentbar(node)+
					"</div><div class=\"comment-body\""+"id=\"comment"+node.commentid+"\"><p>"+
					"<a class=\"link-title\" href=\"#"+node.parent+"\">"+node.title+":</a>"+	" "	+sentences+
					"</p>"+				
					"</div>"+
					"<p style=\"color: grey; font-size:12px;\">"+node.date+"</br></p>"+
					"</div>";
	 
    li.innerHTML = text;
    //	li.className = node.class;
    if(node.children) li.appendChild(parseNodes(node.children));
    return li;
}

function getImgSrc(id) {
	if(id.startsWith('\'a')) {
		return 'answer.png';
	} else {
		return 'question.jpg';
	}
}

function drawSentimentbar(node) {
	colorBins=findColor(node);
	var totalWidth=60;
	var sentimentbar="<table border=\"1\" cellpadding=\"0\"><tr style=\"height:"+findCommentHeight(node)+"px;\">";
	if(colorBins[0]>0)
		sentimentbar+="<td style=\"background-color:"+"rgb("+sentimentColors[4]+")"+";\" width=\""+colorBins[0]*totalWidth+"px;\"></td>";
	if(colorBins[1]>0)
		sentimentbar+="<td style=\"background-color:"+"rgb("+sentimentColors[3]+")"+";\" width=\""+colorBins[1]*totalWidth+"px;\"></td>";
	if(colorBins[2]>0)
		sentimentbar+="<td style=\"background-color:"+"rgb("+sentimentColors[2]+")"+";\" width=\""+colorBins[2]*totalWidth+"px;\"></td>";
	if(colorBins[3]>0)
		sentimentbar+="<td style=\"background-color:"+"rgb("+sentimentColors[1]+")"+";\" width=\""+colorBins[3]*totalWidth+"px;\"></td>";
	if(colorBins[4]>0)
		sentimentbar+="<td style=\"background-color:"+"rgb("+sentimentColors[0]+")"+";\" width=\""+colorBins[4]*totalWidth+"px;\"></td>";
		sentimentbar+="</tr></table>";
	return sentimentbar;
}

function drawSentimentLegend(filter) {
	var totalWidth=100;
	var polaritywidth=(0.2)*totalWidth;
	var sentimentbar="<table><tr style=\"height:3px;width:100px\">"; 
	sentimentbar+="<td align=center width=\"2%\"><font size=\"1\">Less "+ filter +"</font> </td>";	 
	sentimentbar+="<td width=\"2%\" style=\"background-color:"+"rgb("+sentimentColors[4]+")"+";\" width=\""+polaritywidth+"px; \"></td>";	 
	sentimentbar+="<td width=\"2%\" style=\"background-color:"+"rgb("+sentimentColors[3]+")"+";\" width=\""+polaritywidth+"px;\"></td>";	 
	sentimentbar+="<td width=\"2%\" style=\"background-color:"+"rgb("+sentimentColors[2]+")"+";\" width=\""+polaritywidth+"px;\"></td>";	 
	sentimentbar+="<td width=\"2%\" style=\"background-color:"+"rgb("+sentimentColors[1]+")"+";\" width=\""+polaritywidth+"px;\"></td>";	 
	sentimentbar+="<td width=\"2%\" style=\"background-color:"+"rgb("+sentimentColors[0]+")"+";\" width=\""+polaritywidth+"px;\"></td>";
	sentimentbar+="<td width=\"2%\" align=center><font size=\"1\">Highly "+filter+"</font> </td>";
	sentimentbar+="<td width=\"2%\"/>";
	sentimentbar+="<td width=\"2%\"/>";
	sentimentbar+="<td width=\"82%\"/></tr></table>";	

	return sentimentbar;
}

if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
  };
}

	function commentMouseOver(commentid,parent){
		if(commentid.startsWith('a')) {
			if(parent!=null) {
			commentid = parent;
			}
		}
		$("#div"+commentid).css("border-top", "2px solid");
		$("#div"+commentid).css("border-bottom", "2px solid");
		var node;
        for (i = 0; i < nodes.length; i++) {
            if (nodes[i].commentid === commentid) {
				node=nodes[i];
                break;
            }
        }
		
		drawLineMouseOver(node);
		
        commentsList = [];
        commentsList.push(node.commentid);
		//a();
		//alert(commentsList.length);
        //highlightAuthorsbytopic("dummy");
        highlightAuthorsLinks();
        highlightTopicsbyAuthor(node.author);
        highlightTopicLinks();		
		 	
	}
	
	function commentMouseOut(commentid,parent){	

		if(commentid.startsWith('a')) {
			if(parent!=null) {
			commentid = parent;
			}
		}		
		
		vis.selectAll("line").remove();
		$("#div"+commentid).css("border-top", "0px solid");		
		$("#div"+commentid).css("border-bottom", "0px solid");			
		var nodeMouseOut;
        for (i = 0; i < nodes.length; i++) {
            if (nodes[i].commentid == commentid) {
				nodeMouseOut=nodes[i];
                break;
            }
        }	
        undoHighlightCommentsbyAuthor(nodeMouseOut.author);
		// undoHighlightAuthorsLinks();
		// undoHighlightTopicLinks();	
        //undoHighlightCommentsbyAuthor(nodeMouseOut.author);			
		
	}

	function commentMouseClick(commentid){
	
		var node;
        for (i = 0; i < nodes.length; i++) {
            if (nodes[i].commentid == commentid) {
				node=nodes[i];
                if (nodes[i].clickcomment == "1")
                    nodes[i].clickcomment = "0";
                else
                    nodes[i].clickcomment = "1";
                break;
            }
        }	
		nodeEnter.transition()
		.duration(0)
		.selectAll("rect")
		.style("stroke-width",function(s,i){
			var stroke="0.15px";
			if(commentid==s.commentid){
					if(s.clickcomment=="0"){
						stroke="0.15px";
						//$("#div"+commentid).css("border", "0px solid");						

						 /*$("#comment" + node.commentid).html("<p>" +
                            "<a href=\"#" + node.parent + "\">" + node.title + ":</a>" + " " +
                            node.sentences +
                            "</p>");*/
						//$("#div"+commentid).css("border", "0px solid");	
					}
					else{
						//stroke="2px";
						//s.clickstate="1";
						$("#div"+commentid).css("border-top", "2px solid");
						$("#div"+commentid).css("border-bottom", "2px solid");
						$("#comment" + node.commentid).html("<p>" +
                            "<a href=\"#" + node.parent + "\">" + node.title + ":</a>" + " " +
                            node.colorText +
                            "</p>");	
					}
			}
			//else if(s.clickstate=="1") {stroke="2px";}
			
			return stroke;
			});
	}

	

	
	$.getJSON(jsonFileMainView, function(data) {
				data="["+JSON.stringify(data)+"]"; 
				jsonObj=JSON.parse(data);		// get back to json object again
				da=parseNodes(jsonObj);
				document.getElementById("content").appendChild(da);

 				var legendDiv = document.getElementById("sentiment_legend");
				var legendHTML = drawSentimentLegend('Coherent');	
				//alert(legendHTML);
				legendDiv.innerHTML= legendHTML;
	});


	$(window).load(function(){
		$('#comments').collapsible({xoffset:'-20', yoffset:'30', defaulthide: false, imagehide: 'arrow-down.png', imageshow: 'arrow-right.png'});
	});