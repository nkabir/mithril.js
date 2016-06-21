"use strict"

var o = require("../../ospec/ospec")
var domMock = require("../../test-utils/domMock")
var vdom = require("../../render/render")

o.spec("updateNodes", function() {
	var $window, root, render
	o.beforeEach(function() {
		$window = domMock()
		root = $window.document.createElement("div")
		render = vdom($window).render
	})

	o("handles el noop", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "b", key: 2}]
		var updated = [{tag: "a", key: 1}, {tag: "b", key: 2}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(2)
		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("B")
		o(updated[1].dom).equals(root.childNodes[1])
	})
	o("handles el noop without key", function() {
		var vnodes = [{tag: "a"}, {tag: "b"}]
		var updated = [{tag: "a"}, {tag: "b"}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(2)
		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("B")
		o(updated[1].dom).equals(root.childNodes[1])
	})
	o("handles text noop", function() {
		var vnodes = [{tag: "#", children: "a"}]
		var updated = [{tag: "#", children: "a"}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(1)
		o(updated[0].dom.nodeValue).equals("a")
		o(updated[0].dom).equals(root.childNodes[0])
	})
	o("handles text noop w/ type casting", function() {
		var vnodes = [{tag: "#", children: 1}]
		var updated = [{tag: "#", children: "1"}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(1)
		o(updated[0].dom.nodeValue).equals("1")
		o(updated[0].dom).equals(root.childNodes[0])
	})
	o("handles falsy text noop w/ type casting", function() {
		var vnodes = [{tag: "#", children: 0}]
		var updated = [{tag: "#", children: "0"}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(1)
		o(updated[0].dom.nodeValue).equals("0")
		o(updated[0].dom).equals(root.childNodes[0])
	})
	o("handles html noop", function() {
		var vnodes = [{tag: "<", children: "a"}]
		var updated = [{tag: "<", children: "a"}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(1)
		o(updated[0].dom.nodeValue).equals("a")
		o(updated[0].dom).equals(root.childNodes[0])
	})
	o("handles fragment noop", function() {
		var vnodes = [{tag: "[", children: [{tag: "a"}]}]
		var updated = [{tag: "[", children: [{tag: "a"}]}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(1)
		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
	})
	o("handles fragment noop w/ text child", function() {
		var vnodes = [{tag: "[", children: [{tag: "#", children: "a"}]}]
		var updated = [{tag: "[", children: [{tag: "#", children: "a"}]}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(1)
		o(updated[0].dom.nodeValue).equals("a")
		o(updated[0].dom).equals(root.childNodes[0])
	})
	o("reverses els w/ even count", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "b", key: 2}, {tag: "i", key: 3}, {tag: "s", key: 4}]
		var updated = [{tag: "s", key: 4}, {tag: "i", key: 3}, {tag: "b", key: 2}, {tag: "a", key: 1}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(4)
		o(updated[0].dom.nodeName).equals("S")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("I")
		o(updated[1].dom).equals(root.childNodes[1])
		o(updated[2].dom.nodeName).equals("B")
		o(updated[2].dom).equals(root.childNodes[2])
		o(updated[3].dom.nodeName).equals("A")
		o(updated[3].dom).equals(root.childNodes[3])
	})
	o("reverses els w/ odd count", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "b", key: 2}, {tag: "i", key: 3}]
		var updated = [{tag: "i", key: 3}, {tag: "b", key: 2}, {tag: "a", key: 1}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(3)
		o(updated[0].dom.nodeName).equals("I")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("B")
		o(updated[1].dom).equals(root.childNodes[1])
		o(updated[2].dom.nodeName).equals("A")
		o(updated[2].dom).equals(root.childNodes[2])
	})
	o("creates el at start", function() {
		var vnodes = [{tag: "a", key: 1}]
		var updated = [{tag: "b", key: 2}, {tag: "a", key: 1}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(2)
		o(updated[0].dom.nodeName).equals("B")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("A")
		o(updated[1].dom).equals(root.childNodes[1])
	})
	o("creates el at end", function() {
		var vnodes = [{tag: "a", key: 1}]
		var updated = [{tag: "a", key: 1}, {tag: "b", key: 2}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(2)
		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("B")
		o(updated[1].dom).equals(root.childNodes[1])
	})
	o("creates el in middle", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "b", key: 2}]
		var updated = [{tag: "a", key: 1}, {tag: "i", key: 3}, {tag: "b", key: 2}]

		render(root, vnodes)
		render(root, updated)

		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("I")
		o(updated[1].dom).equals(root.childNodes[1])
		o(updated[2].dom.nodeName).equals("B")
		o(updated[2].dom).equals(root.childNodes[2])
	})
	o("creates el while reversing", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "b", key: 2}]
		var updated = [{tag: "b", key: 2}, {tag: "i", key: 3}, {tag: "a", key: 1}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(3)
		o(updated[0].dom.nodeName).equals("B")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("I")
		o(updated[1].dom).equals(root.childNodes[1])
		o(updated[2].dom.nodeName).equals("A")
		o(updated[2].dom).equals(root.childNodes[2])
	})
	o("deletes el at start", function() {
		var vnodes = [{tag: "b", key: 2}, {tag: "a", key: 1}]
		var updated = [{tag: "a", key: 1}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(1)
		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
	})
	o("deletes el at end", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "b", key: 2}]
		var updated = [{tag: "a", key: 1}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(1)
		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
	})
	o("deletes el at middle", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "i", key: 3}, {tag: "b", key: 2}]
		var updated = [{tag: "a", key: 1}, {tag: "b", key: 2}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(2)
		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("B")
		o(updated[1].dom).equals(root.childNodes[1])
	})
	o("deletes el while reversing", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "i", key: 3}, {tag: "b", key: 2}]
		var updated = [{tag: "b", key: 2}, {tag: "a", key: 1}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(2)
		o(updated[0].dom.nodeName).equals("B")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("A")
		o(updated[1].dom).equals(root.childNodes[1])
	})
	o("creates, deletes, reverses els at same time", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "i", key: 3}, {tag: "b", key: 2}]
		var updated = [{tag: "b", key: 2}, {tag: "a", key: 1}, {tag: "s", key: 4}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(3)
		o(updated[0].dom.nodeName).equals("B")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("A")
		o(updated[1].dom).equals(root.childNodes[1])
		o(updated[2].dom.nodeName).equals("S")
		o(updated[2].dom).equals(root.childNodes[2])
	})
	o("adds to empty array followed by el", function() {
		var vnodes = [{tag: "[", key: 1, children: []}, {tag: "b", key: 2}]
		var updated = [{tag: "[", key: 1, children: [{tag: "a"}]}, {tag: "b", key: 2}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(2)
		o(updated[0].children[0].dom.nodeName).equals("A")
		o(updated[0].children[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("B")
		o(updated[1].dom).equals(root.childNodes[1])
	})
	o("reverses followed by el", function() {
		var vnodes = [{tag: "[", key: 1, children: [{tag: "a", key: 2}, {tag: "b", key: 3}]}, {tag: "i", key: 4}]
		var updated = [{tag: "[", key: 1, children: [{tag: "b", key: 3}, {tag: "a", key: 2}]}, {tag: "i", key: 4}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(3)
		o(updated[0].children[0].dom.nodeName).equals("B")
		o(updated[0].children[0].dom).equals(root.childNodes[0])
		o(updated[0].children[1].dom.nodeName).equals("A")
		o(updated[0].children[1].dom).equals(root.childNodes[1])
		o(updated[1].dom.nodeName).equals("I")
		o(updated[1].dom).equals(root.childNodes[2])
	})
	o("updates empty array to html with same key", function() {
		var vnodes = [{tag: "[", key: 1, children: []}]
		var updated = [{tag: "<", key: 1, children: "<a></a><b></b>"}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(2)
		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[0].domSize).equals(2)
		o(updated[0].dom.nextSibling.nodeName).equals("B")
		o(updated[0].dom.nextSibling).equals(root.childNodes[1])
	})
	o("updates empty html to array with same key", function() {
		var vnodes = [{tag: "<", key: 1, children: ""}]
		var updated = [{tag: "[", key: 1, children: [{tag: "a"}, {tag: "b"}]}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(2)
		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[0].domSize).equals(2)
		o(updated[0].dom.nextSibling.nodeName).equals("B")
		o(updated[0].dom.nextSibling).equals(root.childNodes[1])
	})
	o("updates empty array to html without key", function() {
		var vnodes = [{tag: "[", children: []}]
		var updated = [{tag: "<", children: "<a></a><b></b>"}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(2)
		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[0].domSize).equals(2)
		o(updated[0].dom.nextSibling.nodeName).equals("B")
		o(updated[0].dom.nextSibling).equals(root.childNodes[1])
	})
	o("updates empty html to array without key", function() {
		var vnodes = [{tag: "<", children: ""}]
		var updated = [{tag: "[", children: [{tag: "a"}, {tag: "b"}]}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(2)
		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[0].domSize).equals(2)
		o(updated[0].dom.nextSibling.nodeName).equals("B")
		o(updated[0].dom.nextSibling).equals(root.childNodes[1])
	})
	o("updates array to html with same key", function() {
		var vnodes = [{tag: "[", key: 1, children: [{tag: "a"}, {tag: "b"}]}]
		var updated = [{tag: "<", key: 1, children: "<i></i><s></s>"}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(2)
		o(updated[0].dom.nodeName).equals("I")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[0].domSize).equals(2)
		o(updated[0].dom.nextSibling.nodeName).equals("S")
		o(updated[0].dom.nextSibling).equals(root.childNodes[1])
	})
	o("updates html to array with same key", function() {
		var vnodes = [{tag: "<", key: 1, children: "<a></a><b></b>"}]
		var updated = [{tag: "[", key: 1, children: [{tag: "i"}, {tag: "s"}]}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(2)
		o(updated[0].dom.nodeName).equals("I")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[0].domSize).equals(2)
		o(updated[0].dom.nextSibling.nodeName).equals("S")
		o(updated[0].dom.nextSibling).equals(root.childNodes[1])
	})
	o("updates array to html without key", function() {
		var vnodes = [{tag: "[", children: [{tag: "a"}, {tag: "b"}]}]
		var updated = [{tag: "<", children: "<i></i><s></s>"}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(2)
		o(updated[0].dom.nodeName).equals("I")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[0].domSize).equals(2)
		o(updated[0].dom.nextSibling.nodeName).equals("S")
		o(updated[0].dom.nextSibling).equals(root.childNodes[1])
	})
	o("updates html to array without key", function() {
		var vnodes = [{tag: "<", children: "<a></a><b></b>"}]
		var updated = [{tag: "[", children: [{tag: "i"}, {tag: "s"}]}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(2)
		o(updated[0].dom.nodeName).equals("I")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[0].domSize).equals(2)
		o(updated[0].dom.nextSibling.nodeName).equals("S")
		o(updated[0].dom.nextSibling).equals(root.childNodes[1])
	})
	o("updates empty array to html with same key followed by el", function() {
		var vnodes = [{tag: "[", key: 1, children: []}, {tag: "i", key: 2}]
		var updated = [{tag: "<", key: 1, children: "<a></a><b></b>"}, {tag: "i", key: 2}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(3)
		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[0].domSize).equals(2)
		o(updated[0].dom.nextSibling.nodeName).equals("B")
		o(updated[0].dom.nextSibling).equals(root.childNodes[1])
		o(updated[1].dom.nodeName).equals("I")
		o(updated[1].dom).equals(root.childNodes[2])
	})
	o("updates empty html to array with same key followed by el", function() {
		var vnodes = [{tag: "[", key: 1, children: []}, {tag: "i", key: 2}]
		var updated = [{tag: "<", key: 1, children: "<a></a><b></b>"}, {tag: "i", key: 2}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(3)
		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[0].domSize).equals(2)
		o(updated[0].dom.nextSibling.nodeName).equals("B")
		o(updated[0].dom.nextSibling).equals(root.childNodes[1])
		o(updated[1].dom.nodeName).equals("I")
		o(updated[1].dom).equals(root.childNodes[2])
	})
	o("populates array followed by null then el", function() {
		var vnodes = [{tag: "[", key: 1, children: []}, null, {tag: "i", key: 2}]
		var updated = [{tag: "[", key: 1, children: [{tag: "a"}, {tag: "b"}]}, null, {tag: "i", key: 2}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(3)
		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[0].domSize).equals(2)
		o(updated[0].dom.nextSibling.nodeName).equals("B")
		o(updated[0].dom.nextSibling).equals(root.childNodes[1])
		o(updated[2].dom.nodeName).equals("I")
		o(updated[2].dom).equals(root.childNodes[2])
	})
	o("populates childless array followed by el", function() {
		var vnodes = [{tag: "[", key: 1}, {tag: "i", key: 2}]
		var updated = [{tag: "[", key: 1, children: [{tag: "a"}, {tag: "b"}]}, {tag: "i", key: 2}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(3)
		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[0].domSize).equals(2)
		o(updated[0].dom.nextSibling.nodeName).equals("B")
		o(updated[0].dom.nextSibling).equals(root.childNodes[1])
		o(updated[1].dom.nodeName).equals("I")
		o(updated[1].dom).equals(root.childNodes[2])
	})
	o("populates childless array followed by null then el", function() {
		var vnodes = [{tag: "[", key: 1}, null, {tag: "i", key: 2}]
		var updated = [{tag: "[", key: 1, children: [{tag: "a"}, {tag: "b"}]}, null, {tag: "i", key: 2}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(3)
		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[0].domSize).equals(2)
		o(updated[0].dom.nextSibling.nodeName).equals("B")
		o(updated[0].dom.nextSibling).equals(root.childNodes[1])
		o(updated[2].dom.nodeName).equals("I")
		o(updated[2].dom).equals(root.childNodes[2])
	})
	o("moves from end to start", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "b", key: 2}, {tag: "i", key: 3}, {tag: "s", key: 4}]
		var updated = [{tag: "s", key: 4}, {tag: "a", key: 1}, {tag: "b", key: 2}, {tag: "i", key: 3}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(4)
		o(updated[0].dom.nodeName).equals("S")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("A")
		o(updated[1].dom).equals(root.childNodes[1])
		o(updated[2].dom.nodeName).equals("B")
		o(updated[2].dom).equals(root.childNodes[2])
		o(updated[3].dom.nodeName).equals("I")
		o(updated[3].dom).equals(root.childNodes[3])
	})
	o("moves from start to end", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "b", key: 2}, {tag: "i", key: 3}, {tag: "s", key: 4}]
		var updated = [{tag: "b", key: 2}, {tag: "i", key: 3}, {tag: "s", key: 4}, {tag: "a", key: 1}]

		render(root, vnodes)
		render(root, updated)

		o(root.childNodes.length).equals(4)
		o(updated[0].dom.nodeName).equals("B")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("I")
		o(updated[1].dom).equals(root.childNodes[1])
		o(updated[2].dom.nodeName).equals("S")
		o(updated[2].dom).equals(root.childNodes[2])
		o(updated[3].dom.nodeName).equals("A")
		o(updated[3].dom).equals(root.childNodes[3])
	})
	o("removes then recreate", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "b", key: 2}, {tag: "i", key: 3}, {tag: "s", key: 4}]
		var temp = []
		var updated = [{tag: "a", key: 1}, {tag: "b", key: 2}, {tag: "i", key: 3}, {tag: "s", key: 4}]

		render(root, vnodes)
		render(root, temp)
		render(root, updated)

		o(root.childNodes.length).equals(4)
		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("B")
		o(updated[1].dom).equals(root.childNodes[1])
		o(updated[2].dom.nodeName).equals("I")
		o(updated[2].dom).equals(root.childNodes[2])
		o(updated[3].dom.nodeName).equals("S")
		o(updated[3].dom).equals(root.childNodes[3])
	})
	o("removes then recreate reversed", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "b", key: 2}, {tag: "i", key: 3}, {tag: "s", key: 4}]
		var temp = []
		var updated = [{tag: "s", key: 4}, {tag: "i", key: 3}, {tag: "b", key: 2}, {tag: "a", key: 1}]

		render(root, vnodes)
		render(root, temp)
		render(root, updated)

		o(root.childNodes.length).equals(4)
		o(updated[0].dom.nodeName).equals("S")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("I")
		o(updated[1].dom).equals(root.childNodes[1])
		o(updated[2].dom.nodeName).equals("B")
		o(updated[2].dom).equals(root.childNodes[2])
		o(updated[3].dom.nodeName).equals("A")
		o(updated[3].dom).equals(root.childNodes[3])
	})
	o("removes then recreate smaller", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "b", key: 2}]
		var temp = []
		var updated = [{tag: "a", key: 1}]

		render(root, vnodes)
		render(root, temp)
		render(root, updated)

		o(root.childNodes.length).equals(1)
		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
	})
	o("removes then recreate bigger", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "b", key: 2}]
		var temp = []
		var updated = [{tag: "a", key: 1}, {tag: "b", key: 2}, {tag: "i", key: 3}]

		render(root, vnodes)
		render(root, temp)
		render(root, updated)

		o(root.childNodes.length).equals(3)
		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("B")
		o(updated[1].dom).equals(root.childNodes[1])
		o(updated[2].dom.nodeName).equals("I")
		o(updated[2].dom).equals(root.childNodes[2])
	})
	o("removes then create different", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "b", key: 2}]
		var temp = []
		var updated = [{tag: "i", key: 3}, {tag: "s", key: 4}]

		render(root, vnodes)
		render(root, temp)
		render(root, updated)

		o(root.childNodes.length).equals(2)
		o(updated[0].dom.nodeName).equals("I")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("S")
		o(updated[1].dom).equals(root.childNodes[1])
	})
	o("removes then create different smaller", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "b", key: 2}]
		var temp = []
		var updated = [{tag: "i", key: 3}]

		render(root, vnodes)
		render(root, temp)
		render(root, updated)

		o(root.childNodes.length).equals(1)
		o(updated[0].dom.nodeName).equals("I")
		o(updated[0].dom).equals(root.childNodes[0])
	})
	o("removes then create different bigger", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "b", key: 2}]
		var temp = []
		var updated = [{tag: "i", key: 3}, {tag: "s", key: 4}, {tag: "div", key: 5}]

		render(root, vnodes)
		render(root, temp)
		render(root, updated)

		o(root.childNodes.length).equals(3)
		o(updated[0].dom.nodeName).equals("I")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("S")
		o(updated[1].dom).equals(root.childNodes[1])
		o(updated[2].dom.nodeName).equals("DIV")
		o(updated[2].dom).equals(root.childNodes[2])
	})
	o("removes then create mixed", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "b", key: 2}]
		var temp = []
		var updated = [{tag: "a", key: 1}, {tag: "s", key: 4}]

		render(root, vnodes)
		render(root, temp)
		render(root, updated)

		o(root.childNodes.length).equals(2)
		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("S")
		o(updated[1].dom).equals(root.childNodes[1])
	})
	o("removes then create mixed reversed", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "b", key: 2}]
		var temp = []
		var updated = [{tag: "s", key: 4}, {tag: "a", key: 1}]

		render(root, vnodes)
		render(root, temp)
		render(root, updated)

		o(root.childNodes.length).equals(2)
		o(updated[0].dom.nodeName).equals("S")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("A")
		o(updated[1].dom).equals(root.childNodes[1])
	})
	o("removes then create mixed smaller", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "b", key: 2}, {tag: "i", key: 3}]
		var temp = []
		var updated = [{tag: "a", key: 1}, {tag: "s", key: 4}]

		render(root, vnodes)
		render(root, temp)
		render(root, updated)

		o(root.childNodes.length).equals(2)
		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("S")
		o(updated[1].dom).equals(root.childNodes[1])
	})
	o("removes then create mixed smaller reversed", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "b", key: 2}, {tag: "i", key: 3}]
		var temp = []
		var updated = [{tag: "s", key: 4}, {tag: "a", key: 1}]

		render(root, vnodes)
		render(root, temp)
		render(root, updated)

		o(root.childNodes.length).equals(2)
		o(updated[0].dom.nodeName).equals("S")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("A")
		o(updated[1].dom).equals(root.childNodes[1])
	})
	o("removes then create mixed bigger", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "b", key: 2}]
		var temp = []
		var updated = [{tag: "a", key: 1}, {tag: "i", key: 3}, {tag: "s", key: 4}]

		render(root, vnodes)
		render(root, temp)
		render(root, updated)

		o(root.childNodes.length).equals(3)
		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("I")
		o(updated[1].dom).equals(root.childNodes[1])
		o(updated[2].dom.nodeName).equals("S")
		o(updated[2].dom).equals(root.childNodes[2])
	})
	o("removes then create mixed bigger reversed", function() {
		var vnodes = [{tag: "a", key: 1}, {tag: "b", key: 2}]
		var temp = []
		var updated = [{tag: "s", key: 4}, {tag: "i", key: 3}, {tag: "a", key: 1}]

		render(root, vnodes)
		render(root, temp)
		render(root, updated)

		o(root.childNodes.length).equals(3)
		o(updated[0].dom.nodeName).equals("S")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("I")
		o(updated[1].dom).equals(root.childNodes[1])
		o(updated[2].dom.nodeName).equals("A")
		o(updated[2].dom).equals(root.childNodes[2])
	})
	o("removes then recreates then reverses children", function() {
		var vnodes = [{tag: "a", key: 1, children: [{tag: "i", key: 3}, {tag: "s", key: 4}]}, {tag: "b", key: 2}]
		var temp1 = []
		var temp2 = [{tag: "a", key: 1, children: [{tag: "i", key: 3}, {tag: "s", key: 4}]}, {tag: "b", key: 2}]
		var updated = [{tag: "a", key: 1, children: [{tag: "s", key: 4}, {tag: "i", key: 3}]}, {tag: "b", key: 2}]

		render(root, vnodes)
		render(root, temp1)
		render(root, temp2)
		render(root, updated)

		o(root.childNodes.length).equals(2)
		o(updated[0].dom.nodeName).equals("A")
		o(updated[0].dom).equals(root.childNodes[0])
		o(updated[1].dom.nodeName).equals("B")
		o(updated[1].dom).equals(root.childNodes[1])
		o(updated[0].dom.childNodes.length).equals(2)
		o(updated[0].dom.childNodes[0].nodeName).equals("S")
		o(updated[0].dom.childNodes[1].nodeName).equals("I")
	})
	o("removes then recreates nested", function() {
		var vnodes = [{tag: "a", key: 1, children: [{tag: "a", key: 3, children: [{tag: "a", key: 5}]}, {tag: "a", key: 4, children: [{tag: "a", key: 5}]}]}, {tag: "a", key: 2}]
		var temp = []
		var updated = [{tag: "a", key: 1, children: [{tag: "a", key: 3, children: [{tag: "a", key: 5}]}, {tag: "a", key: 4, children: [{tag: "a", key: 5}]}]}, {tag: "a", key: 2}]

		render(root, vnodes)
		render(root, temp)
		render(root, updated)

		o(root.childNodes.length).equals(2)
		o(root.childNodes[0].childNodes.length).equals(2)
		o(root.childNodes[0].childNodes[0].childNodes.length).equals(1)
		o(root.childNodes[0].childNodes[1].childNodes.length).equals(1)
		o(root.childNodes[1].childNodes.length).equals(0)
	})
	o("recycles", function() {
		var vnodes = [{tag: "div", key: 1}]
		var temp = []
		var updated = [{tag: "div", key: 1}]

		render(root, vnodes)
		render(root, temp)
		render(root, updated)

		o(vnodes[0].dom).equals(updated[0].dom)
		o(updated[0].dom.nodeName).equals("DIV")
	})
	o("recycles when toggling", function() {
		var vnodes = [{tag: "div", key: 1}]
		var temp = [{tag: "div"}]
		var updated = [{tag: "div", key: 1}]

		render(root, vnodes)
		render(root, temp)
		render(root, updated)

		o(vnodes[0].dom).equals(updated[0].dom)
		o(updated[0].dom.nodeName).equals("DIV")
	})
	o("recycles deep", function() {
		var vnodes = [{tag: "div", children: [{tag: "a", key: 1}]}]
		var temp = [{tag: "div"}]
		var updated = [{tag: "div", children: [{tag: "a", key: 1}]}]

		render(root, vnodes)
		render(root, temp)
		render(root, updated)

		o(vnodes[0].dom.firstChild).equals(updated[0].dom.firstChild)
		o(updated[0].dom.firstChild.nodeName).equals("A")
	})
})