/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//
// For projects created with v87 onwards, JavaScript is always executed in strict mode.
//==============================================================================

// How to load in modules
const Scene = require('Scene');
const Animation = require('Animation');
// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require('Diagnostics');

// To use variables and functions across files, use export/import keyword
// export const animationDuration = 10;

// Use import keyword to import a symbol from another file
// import { animationDuration } from './script.js'

(async function () {  // Enables async/await in JS [part 1]


  // To access scene objects
	const [faceRig] = await Promise.all([
		Scene.root.findFirst('Space_FaceMorph')
	])

	const [blendShapes] = await Promise.all([
		faceRig.getBlendShapes()
	])

  const poses = []; 
  const poseTimeDriver = Animation.timeDriver({durationMilliseconds: 12000});
  // const poseDriver = Animation.valueDriver(0, 0, 1);
  const poseSampler = Animation.samplers.linear(0, 12000);
  const poseAnimation = Animation.animate(poseTimeDriver, poseSampler);

	for (var i = blendShapes.length - 1; i >= 0; i--) {
    const pose = blendShapes[i];
		poses.push(pose);
    pose.weight = 0;
	}

  let currentPose = 0;


  // poseTimeDriver.onCompleted().subscribe(function() {
  //   if (currentPose < poses.length - 1) {

  //     poses[currentPose].weight = 0;

  //     currentPose++; 
  //     poses[currentPose].weight = poseAnimation; 

  //     poseTimeDriver.reset();
  //     poseTimeDriver.start();

  //     // Diagnostics.log(currentPose);
  //   } else {
  //     currentPose = 0; 

  //     poses[currentPose].weight = poseAnimation;
  //     poseTimeDriver.reset();
  //     poseTimeDriver.start(); 

  //     Diagnostics.log("RESTART");
  //   }
  // })

  poseAnimation.interval(1000).subscribe((function() {
    // const poseTimeDriver = Animation.timeDriver({durationMilliseconds: 1200});
    let poseDriver = Animation.timeDriver({durationMilliseconds: 1000});
    let poseSampler2 = Animation.samplers.linear(0, 1);
    let poseAnimation2 = Animation.animate(poseDriver, poseSampler2);

    if (currentPose < poses.length - 1) {
      poses[currentPose].weight = 0;
      currentPose++; 
      poses[currentPose].weight = poseAnimation2; 
    } else {
      currentPose = 0; 
      poses[currentPose].weight = poseAnimation2; 
    }
    poseDriver.reset();
    poseDriver.start();
  }))

  poseTimeDriver.start(); 
  Diagnostics.watch('value', poseAnimation);
  // Diagnostics.log(poseAnimation);
})(); // Enables async/await in JS [part 2]
