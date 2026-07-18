/**
 * Sprunki Pyramixed Arena — Self-contained browser game
 * WASD move, Mouse aim & shoot, RMB build, 1/2/3 build types, E harvest
 * No external dependencies, no hotlinked assets
 */
(function(){
'use strict';
var canvas=document.getElementById('arenaCanvas');
var ctx=canvas.getContext('2d');
var container=document.getElementById('gameIframe');
var overlay=document.getElementById('previewOverlay');
var playBtn=document.getElementById('launchGameBtn');
var ui=document.getElementById('gameUI');
var W,H, running=false, over=false, animId, shake=0;
var mouse={x:0,y:0,down:false,right:false};
var keys={};
var proj=[], parts=[], structs=[], nodes=[], drops=[], feed=[];
var player, enemies=[], kills=0, alive=10;
var res={wood:30,stone:10,metal:0};
var buildMode=false, buildType='wall', preview=null;
var zoneC, zoneR, zoneTC, zoneTR, zoneShrink=0;
var timer=120, timerInt;

// Enemies
function mkE(x,y,r,s,hp,c,t,n,ai){
    return {x:x,y:y,vx:0,vy:0,r:r,s:s,hp:hp,maxHp:hp,color:c,team:t,name:n,alive:true,
        shootCd:0,shootRate:ai==='s'?18:ai==='t'?35:25, dmg:ai==='s'?15:ai==='t'?22:10,
        bSpeed:ai==='s'?10:ai==='t'?7:9, aiType:ai, buildCd:0, res:{wood:20,stone:10}};
}

function init(){
    player={x:0.15,y:0.5,r:14,s:4.8,hp:100,maxHp:100,color:'#05b4d3',team:'blue',name:'YOU',alive:true,isPlayer:true,shootCd:0,shootRate:18,dmg:14,bSpeed:9,buildCd:0,inv:0,flash:0};
    enemies=[]; var na=['ShadowX','Blitz99','Raptor_','VoidFang','NovaStar','Kryp7ik','ZenMaster','ApexHawk','Ryu_Blade','PhantomX'];
    var types=['s','t','b','p']; var cmap={s:'#e74c3c',t:'#c0392b',b:'#e67e22',p:'#8e44ad'};
    for(var i=0;i<10;i++){var t=types[Math.floor(Math.random()*4)];enemies.push(mkE(0.8+(Math.random()-0.5)*0.1,0.3+Math.random()*0.4,14,{s:4.3,t:3,b:3.6,p:5}[t],{s:100,t:160,b:110,p:80}[t],cmap[t],'red',na[i%10]+Math.floor(Math.random()*100),t));}
    proj=[]; parts=[]; structs=[]; nodes=[]; drops=[]; feed=[]; kills=0; alive=10; timer=120; shake=0;
    res={wood:30,stone:10,metal:0}; buildMode=false; preview=null; over=false;
    // Resources
    for(var i=0;i<25;i++){var ty=['wood','stone','metal'][Math.floor(Math.random()*3)];nodes.push({x:0.1+Math.random()*0.8,y:0.1+Math.random()*0.8,type:ty,icon:{wood:'▲',stone:'■',metal:'◆'}[ty],amt:25+Math.floor(Math.random()*35),r:16});}
    // Loot drops
    for(var i=0;i<5;i++){drops.push({x:0.2+Math.random()*0.6,y:0.15+Math.random()*0.7,open:false,has:{wood:25,stone:15},glow:Math.random()*6});}
    // Zone
    zoneC={x:0.5,y:0.5}; zoneR=0.55; zoneTC={x:0.35+Math.random()*0.3,y:0.35+Math.random()*0.3}; zoneTR=0.15; zoneShrink=0;
    if(timerInt) clearInterval(timerInt);
    timerInt=setInterval(function(){if(running&&!over){timer--;if(timer%30===0&&timer>0){zoneTR=Math.max(0.08,zoneR-0.1);zoneTC={x:Math.max(0.15,Math.min(0.85,zoneC.x+(Math.random()-0.5)*0.3)),y:Math.max(0.15,Math.min(0.85,zoneC.y+(Math.random()-0.5)*0.3))};zoneShrink=150;feed.push({t:'Storm shrinking!',cd:120,c:'#f1c40f'});}
    if(timer<=0) end('time');}},1000);
}

function end(r){over=true; running=false; if(timerInt)clearInterval(timerInt); feed.push({t:r==='win'?'VICTORY ROYALE!':r==='death'?'Eliminated!':'Time Up!',cd:300,c:r==='win'?'#f1c40f':'#e74c3c'});}

// Input
function kd(e){keys[e.key.toLowerCase()]=true;if(e.key==='1'){buildType='wall';buildMode=true;}if(e.key==='2'){buildType='ramp';buildMode=true;}if(e.key==='3'){buildType='floor';buildMode=true;}if(e.key==='q'){buildMode=false;preview=null;}if(['arrowup','arrowdown','arrowleft','arrowright',' '].indexOf(e.key.toLowerCase())!==-1)e.preventDefault();}
function ku(e){keys[e.key.toLowerCase()]=false;}
function mm(e){var r=canvas.getBoundingClientRect();mouse.x=(e.clientX-r.left)*(W/r.width);mouse.y=(e.clientY-r.top)*(H/r.height);if(buildMode)upPreview();}
function md(e){if(e.button===0)mouse.down=true;if(e.button===2){mouse.rightDown=true;buildMode=!buildMode;if(!buildMode)preview=null;e.preventDefault();}}
function mu(e){if(e.button===0)mouse.down=false;if(e.button===2)mouse.rightDown=false;}

function upPreview(){
    if(!buildMode||!player.alive){preview=null;return;}
    var a=Math.atan2(mouse.y-player.y*H,mouse.x-player.x*W),d=80;
    var bx=(player.x*W+Math.cos(a)*d)/W,by=(player.y*H+Math.sin(a)*d)/H;
    preview={x:bx,y:by,type:buildType,team:'blue',preview:true,affordable:(res.wood>=(buildType==='ramp'?5:buildType==='floor'?8:10)&&res.stone>=(buildType==='ramp'?5:0))};
}

function tryBuild(){
    if(!buildMode||!preview||!preview.affordable||player.buildCd>0)return;
    var c={wall:{w:10,s:0,m:0},ramp:{w:5,s:5,m:0},floor:{w:8,s:0,m:0}}[buildType];
    res.wood-=c.w;res.stone-=c.s;res.metal-=c.m;
    var dims={wall:{w:0.015,h:0.08},ramp:{w:0.06,h:0.025},floor:{w:0.07,h:0.01}}[buildType];
    structs.push({x:preview.x,y:preview.y,w:dims.w,h:dims.h,type:buildType,team:'blue',hp:buildType==='wall'?150:buildType==='ramp'?100:80,maxHp:buildType==='wall'?150:100,color:'#05b4d3',preview:false});
    player.buildCd=20;
    for(var i=0;i<6;i++)parts.push({x:preview.x+(Math.random()-0.5)*0.04,y:preview.y+(Math.random()-0.5)*0.04,vx:(Math.random()-0.5)*0.003,vy:(Math.random()-0.5)*0.003,life:0.3,color:'#f1c40f',r:2+Math.random()*3});
}

function shoot(sh,tx,ty){
    if(sh.shootCd>0||!sh.alive)return;
    var dx=tx-sh.x*W,dy=ty-sh.y*H,d=Math.sqrt(dx*dx+dy*dy)||1;
    proj.push({x:sh.x,y:sh.y,vx:(dx/d)*sh.bSpeed/W,vy:(dy/d)*sh.bSpeed/H,dmg:sh.dmg,team:sh.team,life:1,r:4});
    sh.shootCd=sh.shootRate;
    for(var i=0;i<3;i++)parts.push({x:sh.x+(dx/d)*0.02,y:sh.y+(dy/d)*0.02,vx:(Math.random()-0.5)*0.004,vy:(Math.random()-0.5)*0.004,life:0.25,color:sh.team==='blue'?'#5dade2':'#f1948a',r:2+Math.random()*3});
}

function rc(rx,ry,rw,rh,cx,cy,cr){var cx2=Math.max(rx,Math.min(cx,rx+rw)),cy2=Math.max(ry,Math.min(cy,ry+rh));return(cx-cx2)*(cx-cx2)+(cy-cy2)*(cy-cy2)<cr*cr;}

function ai(e){
    if(!e.alive)return; if(e.shootCd>0)e.shootCd--; if(e.buildCd>0)e.buildCd--;
    var t=player.alive?player:null; if(!t)return;
    var dx=t.x-e.x,dy=t.y-e.y,d=Math.sqrt(dx*dx+dy*dy),mx=0,my=0;
    if(e.aiType==='t'){if(d>0){mx=dx/d;my=dy/d;}}
    else if(e.aiType==='s'){if(d>0.15){mx=dx/d;my=dy/d;}else if(d>0){mx=-dy/d;my=dx/d;}}
    else if(e.aiType==='p'){var a=Math.atan2(dy,dx)+1.5;mx=Math.cos(a);my=Math.sin(a);if(d<0.2&&d>0){mx=-dx/d;my=-dy/d;}}
    else if(e.aiType==='b'){if(d>0.2&&d>0){mx=dx/d;my=dy/d;}if(d<0.35&&e.buildCd<=0&&e.res.wood>=10){var bx=e.x+dx/d*0.04,by=e.y+dy/d*0.04;structs.push({x:bx,y:by,w:0.015,h:0.08,type:'wall',team:'red',hp:150,maxHp:150,color:'#e74c3c',preview:false});e.res.wood-=10;e.buildCd=60;}}
    var zd=getZoneDmg(e); if(zd>0){var zdx=zoneC.x-e.x,zdy=zoneC.y-e.y,zdist=Math.sqrt(zdx*zdx+zdy*zdy)||1;mx=zdx/zdist;my=zdy/zdist;}
    e.x+=mx*e.s*0.016;e.y+=my*e.s*0.016;e.x=Math.max(e.r/W,Math.min(1-e.r/W,e.x));e.y=Math.max(e.r/H,Math.min(1-e.r/H,e.y));
    for(var i=0;i<structs.length;i++){var s=structs[i];var sw=s.w*W,sh=s.h*H,sx=s.x*W-sw/2,sy=s.y*H-sh/2;if(rc(sx,sy,sw,sh,e.x*W,e.y*H,e.r)){var cx2=Math.max(sx,Math.min(e.x*W,sx+sw)),cy2=Math.max(sy,Math.min(e.y*H,sy+sh)),ddx=e.x*W-cx2,ddy=e.y*H-cy2,dd=Math.sqrt(ddx*ddx+ddy*ddy)||1;e.x+=(ddx/dd)*(e.r-dd+1)/W;e.y+=(ddy/dd)*(e.r-dd+1)/H;}}
    if(d<0.5&&e.shootCd<=0&&t.alive)shoot(e,t.x*W+(Math.random()-0.5)*60,t.y*H+(Math.random()-0.5)*60);
}

function getZoneDmg(e){var dx=(e.x-zoneC.x)*W,dy=(e.y-zoneC.y)*H,d=Math.sqrt(dx*dx+dy*dy);if(d>zoneR*W)return 2+(d-zoneR*W)*0.02;return 0;}

function update(){
    if(!running||over)return;
    if(player.alive){
        var mx=0,my=0; if(keys['w'])my=-1; if(keys['s'])my=1; if(keys['a'])mx=-1; if(keys['d'])mx=1; if(mx&&my){mx*=0.707;my*=0.707;}
        player.x+=mx*player.s*0.016;player.y+=my*player.s*0.016;player.x=Math.max(player.r/W,Math.min(1-player.r/W,player.x));player.y=Math.max(player.r/H,Math.min(1-player.r/H,player.y));
        for(var i=0;i<structs.length;i++){var s=structs[i];var sw=s.w*W,sh=s.h*H,sx=s.x*W-sw/2,sy=s.y*H-sh/2;if(rc(sx,sy,sw,sh,player.x*W,player.y*H,player.r)){var cx2=Math.max(sx,Math.min(player.x*W,sx+sw)),cy2=Math.max(sy,Math.min(player.y*H,sy+sh)),ddx=player.x*W-cx2,ddy=player.y*H-cy2,dd=Math.sqrt(ddx*ddx+ddy*ddy)||1;player.x+=(ddx/dd)*(player.r-dd+1)/W;player.y+=(ddy/dd)*(player.r-dd+1)/H;}}
        if(player.shootCd>0)player.shootCd--; if(player.buildCd>0)player.buildCd--;
        if(mouse.down&&!buildMode&&player.shootCd<=0)shoot(player,mouse.x,mouse.y);
        if(buildMode&&mouse.down)tryBuild();
        if(keys['e']){for(var i=nodes.length-1;i>=0;i--){var n=nodes[i];var nd=Math.sqrt((player.x-n.x)*(player.x-n.x)+(player.y-n.y)*(player.y-n.y));if(nd<40/W){res[n.type]=(res[n.type]||0)+5;n.amt-=5;for(var j=0;j<4;j++)parts.push({x:n.x+(Math.random()-0.5)*0.02,y:n.y+(Math.random()-0.5)*0.02,vx:(Math.random()-0.5)*0.002,vy:-(Math.random()*0.005),life:0.4,color:n.type==='wood'?'#8B4513':n.type==='stone'?'#888':'#aaa',r:2+Math.random()*3});if(n.amt<=0)nodes.splice(i,1);break;}}
        for(var i=drops.length-1;i>=0;i--){var dr=drops[i];if(!dr.open&&Math.sqrt((player.x-dr.x)*(player.x-dr.x)+(player.y-dr.y)*(player.y-dr.y))<40/W){dr.open=true;res.wood+=dr.has.wood;res.stone+=dr.has.stone;feed.push({t:'+'+dr.has.wood+' Wood +'+dr.has.stone+' Stone',cd:120,c:'#2ecc71'});}}
        var zd=getZoneDmg(player);if(zd>0&&Math.floor(Date.now()/500)%2===0){player.hp-=zd;shake=Math.max(shake,1.5);}
        if(player.inv>0)player.inv--; if(player.flash>0)player.flash--;
        if(player.hp<=0){player.alive=false;end('death');}
    }
    if(zoneShrink>0){zoneShrink--;zoneR+=(zoneTR-zoneR)*0.03;zoneC.x+=(zoneTC.x-zoneC.x)*0.03;zoneC.y+=(zoneTC.y-zoneC.y)*0.03;}
    for(var i=0;i<enemies.length;i++){ai(enemies[i]);if(enemies[i].alive){var zdi=getZoneDmg(enemies[i]);if(zdi>0&&Math.floor(Date.now()/500)%2===0){enemies[i].hp-=zdi;if(enemies[i].hp<=0){enemies[i].alive=false;alive--;feed.push({t:enemies[i].name+' died to storm',cd:120,c:'#9b59b6'});}}}}
    for(var i=proj.length-1;i>=0;i--){var p=proj[i];p.x+=p.vx;p.y+=p.vy;p.life-=0.016;var hit=false;
    for(var j=0;j<structs.length;j++){var s=structs[j];var sw=s.w*W,sh=s.h*H,sx=s.x*W-sw/2,sy=s.y*H-sh/2;if(rc(sx,sy,sw,sh,p.x*W,p.y*H,p.r)){s.hp-=p.dmg;hit=true;for(var k=0;k<3;k++)parts.push({x:p.x,y:p.y,vx:(Math.random()-0.5)*0.005,vy:(Math.random()-0.5)*0.005,life:0.2,color:'#aaa',r:2+Math.random()*3});if(s.hp<=0)structs.splice(j,1);break;}}
    if(!hit){var all=[player].concat(enemies);for(var j=0;j<all.length;j++){var e=all[j];if(!e.alive||e.team===p.team||e.inv>0)continue;var ed=Math.sqrt((e.x-p.x)*(e.x-p.x)+(e.y-p.y)*(e.y-p.y));if(ed<e.r/Math.min(W,H)+p.r/Math.min(W,H)){e.hp-=p.dmg;hit=true;shake=Math.max(shake,e.isPlayer?4:1);
    for(var k=0;k<5;k++)parts.push({x:e.x+(Math.random()-0.5)*0.03,y:e.y+(Math.random()-0.5)*0.03,vx:(Math.random()-0.5)*0.005,vy:(Math.random()-0.5)*0.005,life:0.25,color:'#ff4655',r:2+Math.random()*4});
    if(e.hp<=0){e.alive=false;if(!e.isPlayer){alive--;kills++;feed.push({t:'Eliminated '+e.name,cd:120,c:'#2ecc71'});}
    for(var k=0;k<12;k++)parts.push({x:e.x,y:e.y,vx:(Math.random()-0.5)*0.01,vy:(Math.random()-0.5)*0.01,life:0.4,color:e.team==='blue'?'#5dade2':'#e74c3c',r:3+Math.random()*5});}
    if(e.isPlayer){e.flash=8;e.inv=20;} break;}}}
    if(hit||p.life<=0||p.x<-0.1||p.x>1.1||p.y<-0.1||p.y>1.1)proj.splice(i,1);}
    for(var i=parts.length-1;i>=0;i--){parts[i].x+=parts[i].vx;parts[i].y+=parts[i].vy;parts[i].life-=0.016;if(parts[i].life<=0)parts.splice(i,1);}
    for(var i=feed.length-1;i>=0;i--){feed[i].cd--;if(feed[i].cd<=0)feed.splice(i,1);}
    if(alive<=0&&!over)end('win');
    if(shake>0)shake*=0.85;if(shake<0.1)shake=0;
    if(ui&&player){var hpPct=Math.round(Math.max(0,player.hp/player.maxHp*100));ui.innerHTML='<span>HP: <b style="color:'+(hpPct>50?'#2ecc71':hpPct>25?'#f1c40f':'#e74c3c')+'">'+hpPct+'%</b></span> <span>Wood: '+res.wood+'</span> <span>Stone: '+res.stone+'</span> <span>Metal: '+res.metal+'</span> <span>Kills: '+kills+'</span> <span>Left: '+alive+'</span>'+(buildMode?' <span style="color:#f1c40f">['+buildType.toUpperCase()+' MODE]</span>':' <span>[RMB=Build]</span>')+' <span>[E=Harvest]</span>';}
}

function render(){
    ctx.fillStyle='#0d0d1a';ctx.fillRect(0,0,W,H);
    var sx=(Math.random()-0.5)*shake*2,sy=(Math.random()-0.5)*shake*2;ctx.save();ctx.translate(sx,sy);
    ctx.strokeStyle='rgba(255,255,255,0.025)';ctx.lineWidth=1;for(var gx=40;gx<W;gx+=40){ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,H);ctx.stroke();}for(var gy=40;gy<H;gy+=40){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();}
    // Zone
    ctx.save();ctx.beginPath();ctx.arc(zoneC.x*W,zoneC.y*H,zoneR*W,0,Math.PI*2);ctx.clip();ctx.fillStyle='#12122a';ctx.fillRect(0,0,W,H);ctx.restore();
    ctx.strokeStyle='#9b59b6';ctx.lineWidth=3;ctx.shadowColor='#9b59b6';ctx.shadowBlur=15;ctx.beginPath();ctx.arc(zoneC.x*W,zoneC.y*H,zoneR*W,0,Math.PI*2);ctx.stroke();ctx.shadowBlur=0;
    // Outside zone tint
    ctx.fillStyle='rgba(100,0,200,0.08)';ctx.fillRect(0,0,W,H);ctx.save();ctx.beginPath();ctx.arc(zoneC.x*W,zoneC.y*H,zoneR*W,0,Math.PI*2);ctx.clip();ctx.clearRect(0,0,W,H);ctx.restore();
    // Nodes
    for(var i=0;i<nodes.length;i++){var n=nodes[i];ctx.fillStyle=n.type==='wood'?'#5d4037':n.type==='stone'?'#78909c':'#546e7a';ctx.beginPath();ctx.arc(n.x*W,n.y*H,n.r,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.font='14px Rajdhani,sans-serif';ctx.textAlign='center';ctx.fillText(n.icon,n.x*W,n.y*H+5);}
    // Drops
    for(var i=0;i<drops.length;i++){var dr=drops[i];dr.glow+=0.04;ctx.fillStyle='rgba(241,196,15,'+(dr.open?0.3:0.7+Math.sin(dr.glow)*0.3)+')';ctx.shadowColor='#f1c40f';ctx.shadowBlur=dr.open?0:10;ctx.fillRect(dr.x*W-10,dr.y*H-10,20,20);ctx.shadowBlur=0;ctx.fillStyle='#fff';ctx.font='16px Rajdhani,sans-serif';ctx.textAlign='center';ctx.fillText(dr.open?'X':'?',dr.x*W,dr.y*H+6);}
    // Structs
    for(var i=0;i<structs.length;i++){var s=structs[i];ctx.fillStyle=s.preview?(s.affordable?'rgba(46,204,113,0.35)':'rgba(231,76,60,0.35)'):(s.team==='blue'?'rgba(5,180,211,0.4)':s.team==='red'?'rgba(231,76,60,0.4)':'rgba(150,150,150,0.3)');ctx.strokeStyle=s.preview?(s.affordable?'#2ecc71':'#e74c3c'):(s.team==='blue'?'#05b4d3':'#e74c3c');ctx.lineWidth=s.preview?2:1;var sw=s.w*W,sh=s.h*H,sdx=s.x*W-sw/2,sdy=s.y*H-sh/2;
    if(s.type==='ramp'){ctx.beginPath();ctx.moveTo(sdx,sdy+sh);ctx.lineTo(sdx+sw,sdy+sh);ctx.lineTo(sdx+sw,sdy);ctx.fill();ctx.stroke();}else{ctx.fillRect(sdx,sdy,sw,sh);ctx.strokeRect(sdx,sdy,sw,sh);}}
    // Entities
    var all=[player].concat(enemies);all.sort(function(a,b){return a.y-b.y;});
    for(var i=0;i<all.length;i++){var e=all[i];if(!e.alive)continue;if(e.inv>0&&Math.floor(e.inv/4)%2===0)continue;
    ctx.fillStyle=e.flash>0&&Math.floor(e.flash/2)%2===0?'#fff':e.color;ctx.beginPath();ctx.arc(e.x*W,e.y*H,e.r,0,Math.PI*2);ctx.fill();ctx.strokeStyle=e.isPlayer?'#fff':'rgba(255,255,255,0.4)';ctx.lineWidth=e.isPlayer?2.5:1.5;ctx.stroke();
    if(e.hp<e.maxHp){var bw=e.r*2.2,bh=4,by=e.y*H-e.r-10;ctx.fillStyle='rgba(0,0,0,0.6)';ctx.fillRect(e.x*W-bw/2,by,bw,bh);var pct=e.hp/e.maxHp;ctx.fillStyle=pct>0.5?'#2ecc71':pct>0.25?'#f1c40f':'#e74c3c';ctx.fillRect(e.x*W-bw/2,by,bw*pct,bh);}
    if(!e.isPlayer){ctx.fillStyle='#fff';ctx.font='9px Rajdhani,sans-serif';ctx.textAlign='center';ctx.fillText(e.name||'',e.x*W,e.y*H-e.r-16);}
    if(e.isPlayer){var a=Math.atan2(mouse.y-e.y*H,mouse.x-e.x*W);ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(e.x*W+Math.cos(a)*e.r*0.5,e.y*H+Math.sin(a)*e.r*0.5,5,0,Math.PI*2);ctx.fill();}}
    // Projectiles
    for(var i=0;i<proj.length;i++){var p=proj[i];ctx.fillStyle=p.team==='blue'?'#5dade2':'#f1948a';ctx.shadowColor=p.team==='blue'?'#3498db':'#e74c3c';ctx.shadowBlur=6;ctx.beginPath();ctx.arc(p.x*W,p.y*H,p.r,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;}
    // Particles
    for(var i=0;i<parts.length;i++){var pt=parts[i];ctx.fillStyle=pt.color;ctx.globalAlpha=pt.life/0.5;ctx.beginPath();ctx.arc(pt.x*W,pt.y*H,pt.r,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;
    ctx.restore();
    // HUD
    ctx.fillStyle='#fff';ctx.font='bold 20px "Rajdhani",sans-serif';ctx.textAlign='center';var mins=Math.floor(Math.max(0,timer)/60),secs=Math.max(0,timer)%60;ctx.fillText(mins+':'+(secs<10?'0':'')+secs,W/2,26);
    var isWin=alive<=0;if(buildMode){ctx.fillStyle='rgba(241,196,15,0.8)';ctx.font='bold 13px Rajdhani,sans-serif';ctx.fillText('BUILD MODE ['+buildType.toUpperCase()+'] | [1][2][3] | [RMB] Exit | LMB Place',W/2,46);}
    for(var i=0;i<feed.length;i++){var f=feed[i];ctx.fillStyle=f.c;ctx.font='bold 11px Rajdhani,sans-serif';ctx.textAlign='right';ctx.fillText(f.t,W-16,66+i*16);}
    if(over){ctx.fillStyle='rgba(0,0,0,0.75)';ctx.fillRect(0,0,W,H);ctx.fillStyle=isWin?'#f1c40f':'#e74c3c';ctx.font='bold 42px "Rajdhani",sans-serif';ctx.textAlign='center';ctx.fillText(isWin?'#1 VICTORY ROYALE':'ELIMINATED',W/2,H/2-20);ctx.fillStyle='#fff';ctx.font='16px Rajdhani,sans-serif';ctx.fillText('Kills: '+kills+' | Left: '+alive+' | Click to restart',W/2,H/2+24);}
}

function loop(){if(running){update();render();animId=requestAnimationFrame(loop);}else if(over){render();animId=requestAnimationFrame(loop);}}

function resize(){var r=container.getBoundingClientRect();if(r.width===0||r.height===0)return;W=r.width;H=r.height;canvas.width=W;canvas.height=H;}

function start(){
    resize();init();running=true;overlay.style.display='none';canvas.style.cursor='crosshair';
    window.addEventListener('keydown',kd);window.addEventListener('keyup',ku);canvas.addEventListener('mousemove',mm);canvas.addEventListener('mousedown',md);canvas.addEventListener('mouseup',mu);canvas.addEventListener('contextmenu',function(e){e.preventDefault();});
    if(animId)cancelAnimationFrame(animId);loop();
}
function stop(){running=false;if(animId)cancelAnimationFrame(animId);if(timerInt)clearInterval(timerInt);window.removeEventListener('keydown',kd);window.removeEventListener('keyup',ku);canvas.removeEventListener('mousemove',mm);canvas.removeEventListener('mousedown',md);canvas.removeEventListener('mouseup',mu);}

if(playBtn)playBtn.addEventListener('click',start);
canvas.addEventListener('click',function(){if(over){stop();start();}});
var ro=new ResizeObserver(function(){if(running)resize();});ro.observe(container);
resize();

// Attract loop
(function attract(){if(running)return;resize();if(W===0||H===0){requestAnimationFrame(attract);return;}
ctx.fillStyle='#0d0d1a';ctx.fillRect(0,0,W,H);ctx.strokeStyle='rgba(255,255,255,0.025)';ctx.lineWidth=1;for(var gx=40;gx<W;gx+=40){ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,H);ctx.stroke();}for(var gy=40;gy<H;gy+=40){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();}
var t=Date.now()*0.001;ctx.fillStyle='rgba(255,255,255,'+(0.5+Math.sin(t*2)*0.3)+')';ctx.font='bold '+Math.min(W/14,30)+'px "Rajdhani",sans-serif';ctx.textAlign='center';ctx.fillText('Sprunki Pyramixed',W/2,H/2-24);ctx.fillStyle='rgba(255,255,255,'+(0.4+Math.sin(t*1.6)*0.2)+')';ctx.font=Math.min(W/30,15)+'px Rajdhani,sans-serif';ctx.fillText('Building Simulator · Battle Royale',W/2,H/2+12);ctx.fillText('Click Play Now to start',W/2,H/2+36);requestAnimationFrame(attract);})();
})();