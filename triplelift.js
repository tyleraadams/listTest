function List(DOMlist, form) {
	this.ul = DOMlist;
	this.form = form;
	this.console = form.querySelector('.console')
	this.addButton = form.querySelector('button');
	this.submitButton = form.querySelector('.submit');
}

List.prototype.addItem = function(item) {
	if (item === "") {
		this.showMessage('no input');
	} else {
		var domItem = this.createListItem(item);
		this.ul.appendChild(domItem);
		this.clearInput();
		this.showMessage('your item has been added')
	}
};

List.prototype.createListItem = function(item) {
	var node = document.createElement('li');
	var textNode = document.createTextNode(item);
	node.appendChild(textNode);
	this.addDeleteButton(node);

	return node;
};

List.prototype.createDeleteButton = function() {
	var deleteButton = document.createElement('img');
	deleteButton.setAttribute('src', 'public/trash.png');
	deleteButton.className = 'trash';
	return deleteButton;
};

List.prototype.addDeleteButton = function(node) {
	var deleteButton = this.createDeleteButton();
	node.appendChild(deleteButton);
	var that = this;
	deleteButton.addEventListener('click', function(e) {
		e.preventDefault();
		that.removeItem(e);
	});
};

List.prototype.removeItem = function(e) {
	this.ul.removeChild(e.target.parentNode);
};

List.prototype.clearInput = function() {
	document.querySelector('.field').value = "";
};

List.prototype.submitList = function() {
	console.log(this.prepareList());
};

List.prototype.prepareList = function() {
	var domList = this.ul.querySelectorAll('li');
	var listArr = [];
	
	for (var i = 0; i < domList.length; i++) {
		listArr.push(domList[i].innerText);
	}

	return listArr;
};

List.prototype.showMessage = function(message) {
	this.console.querySelector('p').innerText = message;
};

// 
var ul = document.querySelector('ul');
var form = document.querySelector('form');
var list = new List(ul, form);

list.addButton.addEventListener('click', function(e) {
	e.preventDefault();
	var listItem = document.querySelector('.field').value;
	list.addItem(listItem);
});

list.submitButton.addEventListener('click', function(e) {
	e.preventDefault();
	list.submitList();
});


