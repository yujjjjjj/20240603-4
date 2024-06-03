/* MoveNet Skeleton - Steve's Makerspace (most of this code is from TensorFlow)

MoveNet is developed by TensorFlow:
https://www.tensorflow.org/hub/tutorials/movenet

*/

function preload(){
 dogImg =loadImage("dog.gif")
}

let video, bodypose, pose, keypoint, detector;
let poses = [];

async function init() {
  const detectorConfig = {
    modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
  };
  detector = await poseDetection.createDetector(
    poseDetection.SupportedModels.MoveNet,
    detectorConfig
  );
}

async function videoReady() {
  console.log("video ready");
  await getPoses();
}

async function getPoses() {
  if (detector) {
    poses = await detector.estimatePoses(video.elt, {
      maxPoses: 2,
      //flipHorizontal: true,
    });
  }
  requestAnimationFrame(getPoses);
}

async function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, videoReady);
  video.size(width, height);
  video.hide();
  await init();

  stroke(255);
  strokeWeight(5);
}

function draw() {
  image(video, 0, 0);
  drawSkeleton();
  // flip horizontal
  cam = get();
  translate(cam.width, 0);
  scale(-1, 1);
  image(cam, 0, 0);
}

function drawSkeleton() {
  // Draw all the tracked landmark points
  for (let i = 0; i < poses.length; i++) {
    pose = poses[i];
    // shoulder to wrist
    partA = pose.keypoints[0]
    push()
      textSize(40)
      text("412730649吳羽婕",partA.x, partA.y-250)
    pop()
  }
  
    for (j = 5; j < 9; j++) {
      if (pose.keypoints[j].score > 0.1 && pose.keypoints[j + 2].score > 0.1) {
        partA = pose.keypoints[j];
        partB = pose.keypoints[j + 2];
        line(partA.x, partA.y, partB.x, partB.y);
      }
    }
 
    //眉毛
    partA = pose.keypoints[1];
    partB = pose.keypoints[2];
    if (partA.score > 0.1 && partB.score > 0.1) {
      push()
        Image = (dogImg,partA.x-width, partA.y, dogImg.width, dogImg.height)
        Image = (dogImg,partB.x-width, partB.y, dogImg.width, dogImg.height)
      pop()
    }
    
    // 肩膀
    partA = pose.keypoints[5];
    partB = pose.keypoints[6];
    if (partA.score > 0.1 && partB.score > 0.1) {
      //line(partA.x, partA.y, partB.x, partB.y);
      push()
        Image = (dogImg,partA.x-width, partA.y, dogImg.width, dogImg.height)
        Image = (dogImg,partB.x-width, partB.y, dogImg.width, dogImg.height)
      pop()
  }        
}
