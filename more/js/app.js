const reqjson=function(t){const e=new XMLHttpRequest;e.open(t.methode,t.url),e.setRequestHeader("accept","application/json"),e.setRequestHeader("content-type","application/json"),e.send(t.data),e.onload=t.onload},responsetext=function(t){return t.target.responseText},req=function(t){const e=new XMLHttpRequest;"get"===t.methode?(e.open(t.methode,t.url+t.data,!0),e.send(),e.onload=t.onload):(e.open(t.methode,t.url),e.setRequestHeader("content-type","application/x-www-form-urlencoded"),e.send(t.data),e.onload=t.onload)},createelement=function(t,e,n){if(e&&n){const i=document.createElement(t);return i.setAttribute(e,n),i}return document.createElement(t)},get=function(t){return document.querySelector(t)},event=function(t,e,n){get(t).addEventListener(e,n)},multichoices={choices:[],a:null},question=[],system={type:null,userans:[],finish(){const t={username:system.username,answer:system.userans,pointofmc:system.getthepointofmc(),clear:system.isclear,key:get("#qidinput").value};req({methode:"post",url:"more/php/donttouchthisfile.php?edit=a",data:JSON.stringify(t),onload:function(e){"ok"===responsetext(e)&&saveok(t.pointofmc)}})},match:(t,e)=>t===e},ansbox=[],build=function(){get("#bodysection").innerHTML="";const t=createelement("div");t.setAttribute("id","buildpage"),t.innerHTML='\n\t\t<div id=settings>\n\t\t\t<div style=background:white;color:blue;margin-bottom:10px;>Simple settings.</div>\n\t\t\t<div>Subject</div>\n\t\t\t<div>\n\t\t\t\t<input id=subject>\n\t\t\t</div>\n\t\t\t<div>Password(For admin auth)</div>\n\t\t\t<div>\n\t\t\t\t<input id=password>\n\t\t\t</div>\n\t\t\t<div>Qpass(optional)</div>\n\t\t\t<div>\n\t\t\t\t<input id=qpass>\n\t\t\t</div>\n\t\t\t<div>From</div>\n\t\t\t<div>\n\t\t\t\t<input id=from>\n\t\t\t</div>\n\t\t\t<div id=questionsection>\n\t\t\t\t<div style=margin-top:20px;margin-bottom:10px;;background:white;color:blue>You have <span id=qcount>0</span> question</div>\n\t\t\t\t<div>\n\t\t\t\t\t<textarea id=question placeholder="type here" style=width:100%;float:left;></textarea>\n\t\t\t\t\t<div>\n\t\t\t\t\t\ttype\n\t\t\t\t\t\t<button id=typeessay>Essay</button>\n\t\t\t\t\t\t<button id=multichoices>Multiple choice</button>\n\t\t\t\t\t\t<button id=add>ADD</button>\n\t\t\t\t\t\t<button id=finish>FINISH</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t',get("#bodysection").appendChild(t),get("#typeessay").addEventListener("click",(function(t){type.essay(t)})),event("#multichoices","click",type.multichoice),event("#add","click",type.add),event("#finish","click",type.finish)},type={finish(){const t={};system.id=generateid(),t[system.id]={subject:get("#subject").value||"undefined",pass:get("#password").value||"undefined",qpass:get("#qpass").value||"undefined",from:get("#from").value||"undefined",questions:question,answer:[]},req({methode:"post",url:"more/php/donttouchthisfile.php?edit=q",data:JSON.stringify(t),onload:function(t){console.log(t),"ok"===t.target.responseText?finished():alert("sorry there is something wrong!")}})},essay(t){t.target.innerHTML="ok",get("#multichoices").style.display="none",system.type=0},multichoice(){const t=`\n\t\t\t<style>\n\t\t\t\t#multichoicespage{\n\t\t\t\t\tposition:fixed;\n\t\t\t\t\ttop:30%;\n\t\t\t\t\tleft:0;\n\t\t\t\t\twidth:90%;\n\t\t\t\t\tbackground:white;\n\t\t\t\t\tcolor:black;\n\t\t\t\t\tpadding:5%;\n\t\t\t\t\tborder:1px solid #FFC300;\n\t\t\t\t}\n\t\t\t\t#multichoicesarea{\n\t\t\t\t\twidth:100%;\n\t\t\t\t\tmax-width:100%;\n\t\t\t\t\tbackground:white;\n\t\t\t\t\tborder:3px solid #FFC300;\n\t\t\t\t\tborder-radius:5px;\n\t\t\t\t}\n\t\t\t\t.simplebutton{\n\t\t\t\t\tbackground:#FFC300;\n\t\t\t\t\tcolor:white;\n\t\t\t\t\tpadding:10px;\n\t\t\t\t\tmargin-top:30px;\n\t\t\t\t\tborder:none;\n\t\t\t\t\tborder-radius:5px;\n\t\t\t\t}\n\t\t\t</style>\n\t\t\t<div>Give a choices for ${get("#question").value}</div>\n\t\t\t<div><span id=multichoicestyped>0</span> Choices u typed</div>\n\t\t\t<textarea placeholder='Type here' id=multichoicesarea></textarea>\n\t\t\t<button id=addbuttonmultichoices class=simplebutton>add</button>\n\t\t\t<div>Enter the index of the correct answer!(start from 0)</div>\n\t\t\t<input type=number id=answerindex>\n\t\t\t<button id=savethischoices class=simplebutton style=margin:0>save</button>\n\t\t\t<button id=btnclose class=simplebutton style=margin:0>Close</button>\n\t\t`,e=createelement("div");e.setAttribute("id","multichoicespage"),e.innerHTML=t,get("#bodysection").appendChild(e),event("#btnclose","click",(function(t){t.target.parentNode.remove()})),event("#addbuttonmultichoices","click",(function(){multichoices.choices.push(get("#multichoicesarea").value),get("#multichoicesarea").value="",get("#multichoicestyped").innerHTML=multichoices.choices.length})),event("#savethischoices","click",(function(){multichoices.a=Number(get("#answerindex").value),get("#multichoices").innerHTML="ok",get("#typeessay").style.display="none",get("#multichoicespage").remove()})),system.type=1},add(){if(null===system.type)return void alert("Ur data is not complete!");const t={q:get("#question").value,type:system.type};1==system.type&&(t.answerchoices=multichoices.choices,t.a=multichoices.a,multichoices.choices=[],multichoices.a=null),question.push(t),get("#qcount").innerHTML=question.length,get("#question").value="",get("#typeessay").innerHTML="Essay",get("#typeessay").style.display="inline-block",get("#multichoices").style.display="inline-block",get("#multichoices").innerHTML="Multiple choice",system.type=null}},init=function(){null!=localStorage.getItem("blablablaok")&&(getquestion(localStorage.getItem("blablablaok")),localStorage.removeItem("blablablaok")),get("#addqbutton img").addEventListener("click",build),get("#qidbutton").addEventListener("click",(function(){getquestion()}))},generateid=function(){let t="";const e="AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";for(let n=0;n<10;n++)t+=e[Math.floor(Math.random()*e.length)];return t},finished=function(){const t=`\n\t\t<style>\n\t\t\t#finishedsubmitting{\n\t\t\t\tfloat:left;\n\t\t\t\twidth:100%;\n\t\t\t\tfont-size:20px;\n\t\t\t\ttext-align:center;\n\t\t\t}\n\t\t\t#finishedsubmitting div{\n\t\t\t\tmargin-top:10px;\n\t\t\t}\n\t\t\t#finishedsubmitting #one{\n\t\t\t\tfloat:left;\n\t\t\t\twidth:100%;\n\t\t\t\tborder:3px solid #FFC300;\n\t\t\t\tmargin-bottom:10px;\n\t\t\t\tborder-radius:5px;\n\t\t\t}\n\t\t\t#finishedsubmitting input{\n\t\t\t\twidth:30%;\n\t\t\t\tborder:none;\n\t\t\t\tborder-bottom:1px solid #FFC300;\n\t\t\t}\n\t\t\t#finishedsubmitting #two button{\n\t\t\t\tmargin:20px;\n\t\t\t\tbackground:#FFC300;\n\t\t\t\tcolor:white;\n\t\t\t\tpadding:10px;\n\t\t\t\tborder:1px solid #FFC300;\n\t\t\t\tcursor:pointer;\n\t\t\t\tborder-radius:5px;\n\t\t\t}\n\t\t</style>\n\t\t<div id=one>\n\t\t\t<div>Successfull!!!</div>\n\t\t\t<div>Your question saved.</div>\n\t\t\t<div style=margin-bottom:10px;>\n\t\t\t\t<input value=${system.id}> is Ur question id.\n\t\t\t\t<input value=${location.href+"q/?qid="+system.id}> or copy that link for share ur question!\n\t\t\t</div>\n\t\t</div>\n\t\t<div id=two>\n\t\t\t<button onclick=location.reload();>home</button>\n\t\t</div>\n\t`,e=createelement("div");e.setAttribute("id","finishedsubmitting"),e.innerHTML=t,get("#buildpage").remove(),get("#bodysection").appendChild(e)},getquestion=function(t){const e=t||get("#qidinput").value;""!==e||null!==e?req({methode:"get",url:"more/php/mrsfathma.php",data:"?mode=read&qid="+e,onload:function(t){display(t.target.responseText)}}):alert("Sorry, please put the correct data!")},display=function(t){system.next=function(){0===i.questions[system.qindexis].type&&(system.userans[system.qindexis]=get("#ansforthe0datas").value),system.qindexis++,system.putthequestion(),get("#buttonback").style.display="inline-block",system.qindexis===system.qlength&&(get("#buttonnext").style.display="none",get("#buttonfinish").style.display="inline-block")},system.back=function(){system.qindexis--,system.putthequestion(),0===system.qindexis?get("#buttonback").style.display="none":get("#buttonback").style.display="inline-block"},system.manage=function(){const t=createelement("div","id","managepage");t.innerHTML="\n\t\t\t<h3>Please type your admin pass!</h3>\n\t\t\t<div style=float:left;width:100%;>\n\t\t\t\t<input id=adminpass class=goofinput style><button class=goofbutton style=margin:0>next</button>\n\t\t\t</div>\n\t\t",t.querySelector("button").addEventListener("click",(function(){const t=i.pass;if(system.match(t,get("#adminpass").value)){const t=function(){const t=createelement("div","id","managingpage");t.innerHTML=`\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<h3>Hai, ${i.from||"User"}!</h3>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<div><h4>${i.subject}</h4></div>\n\t\t\t\t\t\t\t<h4>Ini adalah kumpulan jawaban dari mereka untuk pertanyaan anda.</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t`,cleanpage("#bodysection"),get("#bodysection").appendChild(t),req({methode:"get",url:"more/php/mrsfathma.php",data:"?mode=getansofthis&key="+get("#qidinput").value,onload:function(t){const e=responsetext(t);if(-1===e.indexOf("<")){const t=JSON.parse(e);console.log(t);const n=createelement("div","id","ansdatasection");t.forEach((function(t,e){n.innerHTML+=`<div>${e+1}. ${t.username}-><span>${t.pointofmc}</span></div><p>`})),get("#managingpage").appendChild(n)}}})};t()}else alert("wrong pass!")})),cleanpage("#bodysection"),get("#bodysection").appendChild(t)},system.putthequestion=function(){void 0===system.qindexis&&(system.qindexis=0);const t=`\n\t\t\t<div id=questionis>${system.qindexis+1}. ${i.questions[system.qindexis].q}</div>\n\t\t\t<div id=theansweris></div>\n\t\t\t<div id=qbodyfoot>\n\t\t\t\t<button onclick=system.back() style=display:none id=buttonback class=buttonhoveryellow>back</button>\n\t\t\t\t<button onclick=system.next() id=buttonnext class=buttonhoveryellow>next</button>\n\t\t\t\t<button onclick=system.finish() id=buttonfinish style=display:none class=buttonhoveryellow>finish</button>\n\t\t\t</div>\n\t\t`;system.getthepointofmc=function(){let t=0;return system.userans.forEach((function(e,n){if("number"==typeof e){i.questions[n].a===e&&(t+=10)}else system.isclear||(system.isclear=!1)})),t};const e=createelement("div");if(e.innerHTML=t,1===i.questions[system.qindexis].type){const t=createelement("div");t.setAttribute("id","multichoicesdiv"),i.questions[system.qindexis].answerchoices.forEach((function(e,n){t.innerHTML+="<button><span>"+e+"</span></button><p>"})),t.querySelectorAll("button").forEach((function(t,e){t.addEventListener("click",(function(){system.userans[system.qindexis]=e,get("#multichoicesdiv").querySelectorAll("button").forEach((function(t){t.querySelector("span").style.background="#FFC300"})),t.querySelector("span").style.background="yellow"}))})),e.querySelector("#theansweris").appendChild(t)}else{const t=createelement("textarea");t.placeholder="type here...",t.setAttribute("id","ansforthe0datas"),e.querySelector("#theansweris").appendChild(t)}get("#questionbody").innerHTML="",get("#questionbody").appendChild(e)};const e=function(){""!==get("#username").value?(system.username=get("#username").value,get("#getpass")&&get("#getpass").remove(),get("#questionbody").innerHTML="loading...",setTimeout(system.putthequestion,1e3)):alert("Please type your name!")},n=function(t){get("#thisisthepasstyped").value===t?e():function(){const t=createelement("div");t.innerHTML="Wrong pass.",t.setAttribute("id","wrongpass"),get("#questionbody").appendChild(t),setTimeout((function(){get("#wrongpass").remove()}),2e3)}()};if(-1!==t.indexOf("<"))return void alert("sorry, something wrong!");const i=JSON.parse(t);system.qlength=i.questions.length-1;const s=`\n\t\t<div style=margin-top:10px;>\n\t\t\t<div>from ${i.from}</div>\n\t\t\t<h3>${i.subject}</h3>\n\t\t</div>\n\t\t<div>\n\t\t\t<span id=msg>this question scured by the author, type the pass!</span><p>\n\t\t\t<b>What is your name:</b><br>\n\t\t\t<input id=username><p>\n\t\t\t<span id=getpass><b>Pass:</b><br><input id=thisisthepasstyped></span><button>next</button>\n\t\t\t<button id=ownerbutton>manage</button><span style=float:right;padding:10px;font-size:20px;margin-top:10px;>owner? -></span>\n\t\t</div>\n\t`,o=createelement("div");o.setAttribute("id","questionbody"),o.innerHTML=s,"undefined"==i.qpass?(o.querySelector("#msg").innerHTML="no pass required, just type ur name!",o.querySelector("#getpass").remove(),o.querySelector("button").addEventListener("click",(function(){e()}))):o.querySelector("button").addEventListener("click",(function(){n(i.qpass)})),o.querySelector("#ownerbutton").addEventListener("click",system.manage),get("#bodysection").innerHTML="",get("#bodysection").appendChild(o)},saveok=function(t){const e=`\n\t\t<h3>Cool your answer has been sended.</h3>\n\t\t<div>Your point</div>\n\t\t<div id=pointdiv>\n\t\t\t<span>${t}</span>\n\t\t</div>\n\t\t<button onclick=location.reload()>home</button>\n\t`,n=createelement("div");n.setAttribute("id","successsended"),n.innerHTML=e,cleanpage("#bodysection"),get("#bodysection").appendChild(n)},cleanpage=function(t){get(t).childNodes.forEach((function(t){t.remove()}))};null!=localStorage.getItem("blablablaok")&&(getquestion(localStorage.getItem("blablablaok")),localStorage.removeItem("blablablaok")),get("#addqbutton img").addEventListener("click",build),get("#qidbutton").addEventListener("click",(function(){getquestion()}));