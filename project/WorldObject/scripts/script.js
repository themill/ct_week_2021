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
const T = require("TouchGestures");
const B = require ("Blocks");
// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require('Diagnostics');

// To use variables and functions across files, use export/import keyword
// export const animationDuration = 10;

// Use import keyword to import a symbol from another file
// import { animationDuration } from './script.js'

(async function () {  // Enables async/await in JS [part 1]

  // To access scene objects
  const [dummy, parent, dummy2] = await Promise.all([
    Scene.root.findFirst('dummy'), 
    Scene.root.findFirst('parent'), 
    Scene.root.findFirst('nullObject0')
  ]);

  T.onTap().subscribe(async () => {
  	dummy2.worldTransform.position = dummy.worldTransform.position;
  	// Diagnostics.log(dummy2);
  	// Diagnostics.log(dummy);
  	let block = await B.instantiate("simple", {
  		"name": "planet_A"
  	});

	block.transform.x = dummy2.transform.x.pinLastValue();
	// block.transform.y = dummy2.transform.y.pinLastValue();
	block.transform.y = 2;
	block.transform.z = dummy2.transform.z.pinLastValue();

  	parent.addChild(block);
  });

})(); // Enables async/await in JS [part 2]
