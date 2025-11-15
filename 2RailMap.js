
// Rail Map — Drawing functions for the map rendering.

/*
 Render Order of Layers
 drawSea() — Background panels and small masks.
 drawRails() — Polylines for each route.
 drawStations() — Final station dots placed on the lines.
 drawPolyline() — Helper that connects point arrays with lines.
*/


// Original Size
const original_W = 600;
const original_H = 500;

// Style
let stroke_W = 1;
let dot_R = 6;

// Colors
let c_Base = "#FBFAF8";
let c_Sea = "#D4E8EF";

let c_M1 = "#80FFF7";
let c_T5 = "#FF007F";
let c_T1 = "#FFAE42";
let c_T2 = "#00788D";
let c_T3 = "#FF8000";
let c_T8 = "#008000";
let c_T4 = "#0047AB";
let c_T9 = "#ED1C24";
let c_T6 = "#4D3900";
let c_T7 = "#808080";

let c_Pink = "#FFB6C1";
let c_Gray = "#D3D3D3";


// Path Data
const p_M1 = [
  {x:100,y:150},{x:293,y:150},{x:293,y:170},{x:355,y:170},{x:370,y:200},
  {x:370,y:240},{x:405,y:240},{x:405,y:270},{x:402,y:280},{x:402,y:320},{x:380,y:340}
];
const p_T5 = [
  {x:50,y:50},{x:50,y:190},{x:100,y:215},{x:150,y:215},{x:190,y:250},
  {x:140,y:300},{x:140,y:400},{x:60,y:400}
];
const p_T1 = [
  {x:55,y:50},{x:55,y:185},{x:100,y:210},{x:155,y:210},{x:30,y:210},{x:100,y:210},
  {x:155,y:210},{x:250,y:300},{x:380,y:300},{x:380,y:200},{x:300,y:55},{x:300,y:15}
];
const p_T2 = [
  {x:60,y:405},{x:145,y:405},{x:145,y:305},{x:192,y:258},{x:178,y:245},
  {x:192,y:258},{x:245,y:305},{x:385,y:305},{x:385,y:220},{x:430,y:220},{x:430,y:280},{x:385,y:280}
];
const p_T3 = [
  {x:150,y:380},{x:150,y:340},{x:245,y:340},{x:245,y:310},
  {x:390,y:310},{x:390,y:225},{x:425,y:225},{x:425,y:275},{x:390,y:275}
];
const p_T8 = [
  {x:150,y:450},{x:150,y:395},{x:300,y:395},{x:395,y:310},{x:395,y:230},
  {x:420,y:230},{x:420,y:270},{x:395,y:270},{x:395,y:350},{x:385,y:360},{x:340,y:360}
];
const p_T4_South = [
  {x:370,y:480}, {x:370,y:338},{x:400,y:313},{x:400,y:255},{x:490,y:255}
];
const p_T4_East = [
  {x:370,y:480},{x:370,y:470},{x:440,y:470},{x:370,y:470},
  {x:370,y:338},{x:400,y:313},{x:400,y:255},{x:490,y:255}
];
const p_T9 = [
  {x:300,y:55},{x:300,y:295},{x:375,y:295},{x:375,y:200},{x:330,y:120}
];
const p_T7 = [
  {x:250,y:300},{x:270,y:280},{x:270,y:235}
];
const p_T6 = [
  {x:270,y:355},{x:250,y:340},{x:250,y:312}
];
const p_Pink = [
  {x:270,y:355},{x:310,y:355},{x:330,y:340},{x:355,y:340}
];
const p_PinkWithT6 = [
  {x:250, y:312},{x:250, y:340},{x:270, y:355},
  {x:310, y:355},{x:330, y:340},{x:355, y:340}
];
const p_Gray = [
  {x:165, y:210},{x:190, y:235},{x:370, y:235}
];
const p_WSA = [
  {x:50, y:380},{x:50, y:260},{x:70, y:210}
];
const p_CityCircle = [
  {x:390, y:225},{x:425, y:225},{x:425, y:275},{x:390, y:275},{x:390, y:225}
];

// Layers
function drawSea() {
  noStroke();

  fill(c_Base); rect(-12.5, 0, 12.5, 500);

  // Paper Area
  rect(0, 0, 500, 500);

  // Sea Panels
  fill(c_Sea);
  rect(500, 0, 70, 500, 2); rect(440, 0, 60, 70, 2); rect(440, 350, 130, 120, 2);
  rect(440, 480, 130, 5, 2); rect(440, 0, 10, 100, 2); rect(470, 200, 30, 25, 2);
  rect(190, 220, 100, 5, 2);rect(290, 225, 50, 20, 2); rect(360, 240, 70, 30, 2);

  push(); translate(340,230); rotate(40); rect(0,0,40,10,2); pop();
  push(); translate(420,240); rotate(-20); rect(0,0,60,10,2); pop();
  push(); translate(450,330); rotate(70); rect(0,0,60,20,2); pop();

  // Mask 
  push(); translate(430,450); rotate(45); fill(c_Base); rect(0,0,30,20,2); pop();

  fill(c_Sea);
  rect(570, 0, 12.5, 500); rect(500, 0, 80, 2);
  rect(569, 0, 2, 500); rect(499, 0, 2, 500);
}

function drawRails() {
   noFill();
  //person：shine
  const baseWeight = 2;// 直接在这里设一个基础线宽
// ===== Rush Hour 增强的倍率 =====
  // 只会在“选中的几条线路”上使用

// ===== M1（黄色） =====
  // Rush Hour 时 M1 加粗：4 → 7（或你自己调）
  if (isRushHour) {
    strokeWeight(baseWeight * 1.8);  // 4 → 7.2，你可以自己再调
  } else {
    strokeWeight(baseWeight);
  }
  drawPolyline(p_M1, c_M1); // 这个是市中心的环线（很适合强调）


  // ===== T5（粉色）→ 不加粗 =====
  strokeWeight(baseWeight);   // 保持正常
  drawPolyline(p_T5, c_T5);


  // ===== T1（浅黄）→ 不加粗 =====
  strokeWeight(baseWeight);
  drawPolyline(p_T1, c_T1);


  // ===== T2（蓝绿）→ 加粗示例 =====
  // 这个是第二条你选中的增强线路
  if (isRushHour) strokeWeight(baseWeight * 1.8);
  else strokeWeight(baseWeight);
  drawPolyline(p_T2, c_T2);




 // 最终线宽
  strokeWeight(baseWeight);
 

 
  
  drawPolyline(p_T5, c_T5);
  drawPolyline(p_T1, c_T1);
  drawPolyline(p_T3, c_T3);
  drawPolyline(p_T8, c_T8);

  drawPolyline(p_T4_South, c_T4);
  drawPolyline(p_T4_East,  c_T4);

  drawPolyline(p_T9, c_T9);
  drawPolyline(p_T7, c_T7);
  drawPolyline(p_T6, c_T6);
  drawPolyline(p_Pink, c_Pink);
  
  drawPolyline(p_Gray,c_Gray);
  drawPolyline(p_WSA, c_Gray);

}
// ===== Time-based: Rush Hour 期间车站“呼吸”动画（个人部分） =====
// 这个函数用来根据时间和 offset 返回当前车站的直径
function stationRadius(offset) {
  // baseR：基础直径，优先使用团队原来定义好的 dot_R
  const baseR = (typeof dot_R !== 'undefined') ? dot_R : 6;

  // 如果现在不是 Rush Hour，就保持原来的大小，不做动画
  if (!isRushHour) {
    return baseR;
  }

  // 高峰期时，用时间 + 偏移量做一个正弦波，让点有“呼吸感”
  // millis() / 220 控制闪烁速度，数字越小闪得越快
  const t = millis() / 220.0 + offset;

  // scale 在 1.0 ~ 1.3 之间变化（放大 0%~30%）
  const scale = 1.0 + 0.3 * sin(t);

  // 返回当前时刻的直径（注意 p5.js 的 circle 第三个参数是直径）
  return baseR * scale;
}


function drawStations() {
  noStroke();

  // M1
  fill(c_M1); 
  circle(100,150, stationRadius(0.1)); // offset 0.1：节奏 A
  circle(380,340, stationRadius(0.4));// offset 0.1：节奏 A

  // T5
  fill(c_T5); 
  circle(50,50, stationRadius(0.7));
   circle(60,400, stationRadius(1.0));

  // T1
  fill(c_T1); 
  circle(55,50, stationRadius(1.3));
  circle(300,15, stationRadius(1.3));
  circle(30,210, stationRadius(1.3));

  // T2
  fill(c_T2); 
  circle(385,280, stationRadius(1.3));
  circle(60,405, stationRadius(2.5));

  // T3
  fill(c_T3); 
  circle(390,275, stationRadius(2.8));
  circle(150,380, stationRadius(3.1));

  // T8
  fill(c_T8); 
  circle(150,450, stationRadius(3.4));
  circle(340,360, stationRadius(3.7));

  // T4
  fill(c_T4); 
  circle(370,480, stationRadius(4.0));
  circle(440,470, stationRadius(4.3));
  circle(490,255, stationRadius(4.6));

  // T9
  fill(c_T9); 
  circle(300,55, stationRadius(4.9));
  circle(330,120, stationRadius(5.2));

  // T7
  fill(c_T7); 
  circle(250,300, stationRadius(5.5));
  circle(270,235, stationRadius(5.8));
  // T6
  fill(c_T6); 
  circle(270,355, stationRadius(6.1));
  circle(250.5,310, stationRadius(6.4));

  // Pink
  fill(c_Pink); 
  circle(270,355, stationRadius(6.7));
  circle(355,340, stationRadius(7.0));

  // Gray
  fill(c_Gray); 
  circle(165,210, stationRadius(7.3));
  circle(370,235, stationRadius(7.6));

  // WSA
  fill(c_Gray); 
  circle(50,380, stationRadius(7.9));
  circle(70,210, stationRadius(8.2));
}

function drawPolyline(points, color) {
  if (!points || points.length < 2) return;
  stroke(color);
  for (let i = 0; i < points.length - 1; i++) {
    let a = points[i], b = points[i + 1];
    line(a.x, a.y, b.x, b.y);
  }
}
