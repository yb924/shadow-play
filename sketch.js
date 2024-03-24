let video;
let poseNet;
let pose;
let skeleton;

let scal;

//swk photo
let swk_head;
let swk_body;
let swk_l_arm;
let swk_l_hand;
let swk_r_arm;
let swk_r_hand;
let swk_l_leg;
let swk_l_feet;
let swk_r_leg;
let swk_r_feet;

function preload() {
  swk_head = loadImage("assets/swk_head.png");
  swk_body = loadImage("assets/swk_body.png");
  swk_l_arm = loadImage("assets/swk_l_arm.png");
  swk_l_hand = loadImage("assets/swk_l_hand.png");
  swk_r_arm = loadImage("assets/swk_r_arm.png");
  swk_r_hand = loadImage("assets/swk_r_hand.png");
  swk_l_leg = loadImage("assets/swk_l_leg.png");
  swk_l_feet = loadImage("assets/swk_l_feet.png");
  swk_r_leg = loadImage("assets/swk_r_leg.png");
  swk_r_feet = loadImage("assets/swk_r_feet.png");
}

function setup() {
  createCanvas(1880, 800);
  // createCanvas(600, 400);
  background(100, 100, 100);
  video = createCapture(VIDEO);
  // video.size(900, 400);
  video.size(600, 400);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
  // image(swk_head,0,0);
}

function gotPoses(poses) {
  console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log("poseNet ready");
}

function draw() {
  background(100, 100, 100);

  image(video, 0, 0);

  
  
  
  
  push();
  // translate(width*0.2,height*0.2);
  // scale(0.5);
  if (pose) {
//     for (let i = 0; i < pose.keypoints.length; i++) {
//       let x = pose.keypoints[i].position.x;
//       let y = pose.keypoints[i].position.y;
//       // fill(255, 0, 0);
//       // ellipse(x, y, 16, 16);
//     }

//     for (let i = 0; i < skeleton.length; i++) {
//       let a = skeleton[i][0];
//       let b = skeleton[i][1];
//       line(a.position.x, a.position.y, b.position.x, b.position.y);
//     }

    scal =
      (dist(
        pose.keypoints[2].position.x,
        pose.keypoints[2].position.y,
        pose.keypoints[1].position.x,
        pose.keypoints[1].position.y
      ) *
        5) /
      swk_head.width;

    //head
    if(pose.keypoints[2].score>0.3 && pose.keypoints[1].score>0.3){
    let angleHead1 = createVector(
      pose.keypoints[2].position.x - pose.keypoints[1].position.x,
      pose.keypoints[2].position.y - pose.keypoints[1].position.y
    );

    let angleHead2 = createVector(10, 0);

    let angleHead = angleHead2.angleBetween(angleHead1);

    // console.log(angleHead);
    push();
    translate(
      (pose.keypoints[5].position.x + pose.keypoints[6].position.x) / 2,
      (pose.keypoints[6].position.y + pose.keypoints[5].position.y) / 2
    );
    rotate(angleHead);
    scale(scal);
    image(swk_head, -swk_head.width * 0.7, 0, swk_head.width, swk_head.height);
    // fill(0, 255, 0);
    // ellipse(0, 0, 30, 30);
    pop();
      
      }

    //l-leg
    if(pose.keypoints[2].score>0.3 && pose.keypoints[1].score>0.3){
    let angleLLeg1 = createVector(
      pose.keypoints[13].position.x - pose.keypoints[11].position.x,
      pose.keypoints[13].position.y - pose.keypoints[11].position.y
    );

    let angleLLeg2 = createVector(0, 10);

    let angleLLeg = angleLLeg2.angleBetween(angleLLeg1);

    push();
    translate(
      pose.keypoints[11].position.x ,
      pose.keypoints[11].position.y + swk_body.width * 0.2
    );

    rotate(angleLLeg);
    scale(scal);
    image(
      swk_l_leg,
      -swk_l_leg.width * 0.5,
      -swk_l_leg.height * 0.05,
      swk_l_leg.width,
      swk_l_leg.height
    );
    pop();

    //l-foot
    let angleLFoot1 = createVector(
      pose.keypoints[15].position.x - pose.keypoints[13].position.x,
      pose.keypoints[15].position.y - pose.keypoints[13].position.y
    );

    let angleLFoot2 = createVector(0, 10);

    let angleLFoot = angleLFoot2.angleBetween(angleLFoot1);

    push();
    translate(
      pose.keypoints[13].position.x,
      pose.keypoints[13].position.y+swk_l_leg.height * 0.1
    );
    
    // fill(0, 255, 0);
    // ellipse(0, 0, 30, 30);

    rotate(angleLFoot-0.1);
    scale(scal);
    image(
      swk_l_feet,
      -swk_l_feet.width * 0.5,
      -swk_l_feet.height*0.1,
      swk_l_feet.width,
      swk_l_feet.height
    );
    pop();

    // r-leg
    let angleRLeg1 = createVector(
      pose.keypoints[14].position.x - pose.keypoints[12].position.x,
      pose.keypoints[14].position.y - pose.keypoints[12].position.y
    );

    let angleRLeg2 = createVector(0, 10);

    let angleRLeg = angleRLeg2.angleBetween(angleRLeg1);

    push();
    translate(
      pose.keypoints[12].position.x ,
      pose.keypoints[12].position.y + swk_body.width * 0.2
    );

    rotate(angleRLeg);
    scale(scal);
    image(
      swk_r_leg,
      -swk_r_leg.width * 0.5,
      -swk_r_leg.height * 0.05,
      swk_r_leg.width,
      swk_r_leg.height
    );
    pop();
    
    
    
    //r-foot
    let angleRFoot1 = createVector(
      pose.keypoints[16].position.x - pose.keypoints[14].position.x,
      pose.keypoints[16].position.y - pose.keypoints[14].position.y
    );

    let angleRFoot2 = createVector(0, 10);

    let angleRFoot = angleRFoot2.angleBetween(angleRFoot1);

    push();
    translate(
      pose.keypoints[14].position.x,
      pose.keypoints[14].position.y+swk_l_leg.height * 0.1
    );
    
    // fill(0, 255, 0);
    // ellipse(0, 0, 30, 30);

    rotate(angleRFoot-0.1);
    scale(scal);
    image(
      swk_r_feet,
      -swk_r_feet.width * 0.5,
      -swk_r_feet.height*0.1,
      swk_r_feet.width,
      swk_r_feet.height
    );
    pop();
    

    //body
    let anglebody1 = createVector(
      pose.keypoints[6].position.x - pose.keypoints[5].position.x,
      pose.keypoints[6].position.y - pose.keypoints[5].position.y
    );

    let anglebody2 = createVector(10, 0);

    let angleBody = anglebody2.angleBetween(anglebody1);

    // console.log(angleHead);
    push();
    translate(
      (pose.keypoints[5].position.x + pose.keypoints[6].position.x) / 2,
      (pose.keypoints[6].position.y + pose.keypoints[5].position.y) / 2
    );
    rotate(PI + angleBody);
    scale(scal);
    image(
      swk_body,
      -swk_body.width / 2,
      -swk_body.height * 0.1,
      swk_body.width,
      swk_body.height
    );
    pop();

    // l-arm
    let angleLArm1 = createVector(
      pose.keypoints[7].position.x - pose.keypoints[5].position.x,
      pose.keypoints[7].position.y - pose.keypoints[5].position.y
    );

    let angleLArm2 = createVector(0, 10);

    let angleLArm = angleLArm2.angleBetween(angleLArm1);

    push();
    translate(
      (pose.keypoints[5].position.x + pose.keypoints[6].position.x) / 2,
      (pose.keypoints[6].position.y + pose.keypoints[5].position.y) / 2
    );

    rotate(angleLArm);
    scale(scal);
    image(
      swk_l_arm,
      -swk_l_arm.width * 0.2,
      -swk_l_arm.height * 0.05,
      swk_l_arm.width,
      swk_l_arm.height
    );
    pop();

    // r-arm
    let angleRArm1 = createVector(
      pose.keypoints[8].position.x - pose.keypoints[6].position.x,
      pose.keypoints[8].position.y - pose.keypoints[6].position.y
    );

    let angleRArm2 = createVector(0, 10);

    let angleRArm = angleRArm2.angleBetween(angleRArm1);

    push();
    translate(
      (pose.keypoints[5].position.x + pose.keypoints[6].position.x) / 2,
      (pose.keypoints[6].position.y + pose.keypoints[5].position.y) / 2
    );

    rotate(angleRArm);
    scale(scal);
    image(
      swk_r_arm,
      -swk_r_arm.width * 0.2,
      -swk_r_arm.height * 0.05,
      swk_r_arm.width,
      swk_r_arm.height
    );
    pop();

    // l-hand
    let angleLHand1 = createVector(
      pose.keypoints[9].position.x - pose.keypoints[7].position.x,
      pose.keypoints[9].position.y - pose.keypoints[7].position.y
    );

    let angleLHand2 = createVector(0, 10);

    let angleLHand = angleLHand2.angleBetween(angleLHand1);

    push();
    translate(pose.keypoints[7].position.x-swk_body.width*0.05, pose.keypoints[7].position.y+swk_body.width*0.05);
    // fill(0, 255, 0);
    // ellipse(0, 0, 30, 30);
    scale(scal);
    rotate(-PI * 2 + angleLHand);
    image(
      swk_l_hand,
      -swk_l_hand.width * 0.45,
      -swk_l_hand.height * 0.04,
      swk_l_hand.width,
      swk_l_hand.height
    );
    pop();

    // r-hand
    let angleRHand1 = createVector(
      pose.keypoints[10].position.x - pose.keypoints[8].position.x,
      pose.keypoints[10].position.y - pose.keypoints[8].position.y
    );

    let angleRHand2 = createVector(0, 10);

    let angleRHand = angleRHand2.angleBetween(angleRHand1);

    push();
    translate(
      pose.keypoints[8].position.x + swk_body.width*0.15,
      pose.keypoints[8].position.y
    );

    // fill(0, 255, 0);
    // ellipse(0, 0, 30, 30);
    scale(scal);
    rotate(-PI * 2 + angleRHand);
    image(
      swk_r_hand,
      -swk_r_hand.width * 0.5,
      -swk_r_hand.height * 0.05,
      swk_r_hand.width,
      swk_r_hand.height
    );
    pop();
  }
  pop();
}
