(function() {

	var items = document.querySelectorAll('.projects li');
	var el = null;
	var del = document.querySelector('.delete');
	var add = document.querySelector('.add');
	var ul = document.querySelector('ul');
	var form = document.querySelector('form');

	function addListeners() {
		[].forEach.call(items, function(item) {
			item.setAttribute('draggable', 'true');
			item.addEventListener('dragstart', dragStart, false);
			item.addEventListener('dragenter', dragEnter, false);
			item.addEventListener('dragover', dragOver, false);
			item.addEventListener('dragleave', dragLeave, false);
			item.addEventListener('drop', dragDrop, false);
			item.addEventListener('dragend', dragEnd, false);
		});
	}

	del.addEventListener('dragover', delOver, false);
	del.addEventListener('dragenter', delEnter, false);
	del.addEventListener('dragleave', delLeave, false);
	del.addEventListener('drop', deleteItem, false);

	add.addEventListener('click', addItem, false);

	function dragStart(e) {
		this.style.opacity = '0.4';
		el = this;
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/html', this.innerHTML);
	}

	function dragOver(e) {
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.dataTransfer.dropEffect = 'move';
		return false;
	}

	function dragEnter(e) {
		this.classList.add('over');
	}

	function dragLeave(e) {
		this.classList.remove('over');
	}

	function dragDrop(e) {
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		if (el != this) {
			el.innerHTML = this.innerHTML;
			this.innerHTML = e.dataTransfer.getData('text/html');
			listChange();
		}
		return false;
	}

	function delOver(e) {
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.dataTransfer.dropEffect = 'move';
		return false;
	}

	function delEnter(e) {
		this.style.borderColor = 'red';
	}

	function delLeave(e) {
		this.style.borderColor = '#ccc';
	}

	function deleteItem(e) {
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		deleteProject(el.innerHTML);
		el.parentNode.removeChild(el);
		this.style.borderColor = '#ccc';
		return false;
	}

	function dragEnd(e) {
		this.style.opacity = '1';
		[].forEach.call(items, function(item) {
			item.classList.remove('over');
		});
	}

	function addItem(e) {
		e.preventDefault();
		var newItem = document.createElement('li');
		var title = form.elements['project'].value;
		if (title === '') {
			return false;
		}
		var ownerIndex = form.elements['owner'].selectedIndex;
		var owner = form.elements['owner'].options[ownerIndex].value;
		var monthIndex = form.elements['month'].selectedIndex;
		var month = form.elements['month'].options[monthIndex].value;
		var dayIndex = form.elements['day'].selectedIndex;
		var day = form.elements['day'].options[dayIndex].value;

		var newContent = title + ' - ' + owner + ' - ' + month + ' ' + day;
		newItem.innerHTML = newContent;

		ul.appendChild(newItem);
		items = document.querySelectorAll('.projects li');
		addListeners();
		listChange();
	}

	function listChange() {
		var tempItems = document.querySelectorAll('.projects li');
		[].forEach.call(tempItems, function(item, i) {
			var order = i + 1;
			var it = 'project=' + item.innerHTML + '&project_order=' + order;
			saveList(it);
		});
	}

	function saveList(item) {
		var request = new XMLHttpRequest();
		request.open('GET', 'save.php?' + item);
		request.send();
	}

	function deleteProject(item) {
		var request = new XMLHttpRequest();
		request.open('GET', 'delete.php?project=' + item);
		request.send();
	}

	addListeners();

})();