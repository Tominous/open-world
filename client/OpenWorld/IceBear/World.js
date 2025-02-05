/*******************************************************
*World keeps track of the whole world and actors in it.*
*******************************************************/

var IB = IB || new Object();

IB.world = IB.world || Object.create(IB.object);

////////////////////////////////////////////////

IB.world.actors = [];

IB.world.scene = {};

IB.world.tick = function () {
	for (target in this.actors) {
		OW.world.actors[target].callTick();
	}
};

IB.world.spawn = function (template, position, rotation, owner, extras, newName) {
	"use strict";
	
	var i;

	if (typeof template === "object") {
		this.actors.push(Object.create(template, (extras || {})));
		var actor = this.actors[this.actors.length - 1];
		if (typeof position === "object") actor.setPosition(position);
		else actor.setPosition(new THREE.Vector3());
		if (typeof rotation === "object") actor.setRotation(rotation);
		else actor.setRotation(new THREE.Vector3());
		if (typeof owner === "object") actor.setOwner(owner);
		if (typeof newName === "string") {
			actor.setName(newName);
		}
		else {
			actor.setName(template.name + "_" + (this.actors.length - 1));
		}
		if (actor.components.length !== 0) {
			for (i = 0; i < actor.components.length; i++) {
				if (typeof actor.components[i] === "object") {
					this.sceneAdd(actor.components[i]);
				}
			}
		}

		return actor;
	}
	else {
		console.log("template for actor spawn was not an object");
	}
};

IB.world.createScene = function() {
	this.scene = new THREE.Scene();
};

IB.world.loadMap = function(caller, callBack) {
	;
};

IB.world.finishLoadMap = function (info) {
	;
};

IB.world.sceneAdd = function (component) {
	this.scene.add(component);
};

IB.world.preGameStart = function () {
};

IB.world.gameStart = function () {
	for (target in this.actors) {
		target.gameStart();
	}
};