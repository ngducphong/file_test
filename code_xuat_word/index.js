var view = this;
var objectFocus = { "id": "", "color": "" };
// Lưu lại trạng thái html tag trước khi được focus
var htmlBeforeFocused = {"id": "", "backcolor": ""};
var colorRed = 'rgba(245, 39, 39, 0.54)';

/**
 * Set up theo cặp HTML và biến BPM tương ứng
 */
function onloadHTML () {
	setupHTML("appBookId_key", "numberHD", "[…]");
	setupHTML("day_key", "dateHD", "[…]");
	setupHTML("month_key", "monthHD", "[…]");
	setupHTML("year_key", "yearHD", "[…]");
	setupHTML("at_key", "atPlace", "[…]");
	setupHTML("bankAddress_key", "address", "[…]");
	setupHTML("bankPhone_key", "benAphoneNumber", "[…]");
	setupHTML("bankFax_key", "benAfaxNumber", "[…]");
	setupHTML("bankCode_key", "benAbusinessCode", "[…]");
	setupHTML("bankRep_key", "benArepresentativeName", "[…]");
	setupHTML("bankRepPos_key", "benAposition", "[…]");
	setupHTML("poaDocId_key", "benAauthorizationDocumentNumber", "[…]");
	setupHTML("poaDocDate_key", "benAauthorizationDocumentDate", "[…]");
	setupHTML("poaDocBy_key", "benAbranchAuthorizationDocument", "[…]");
}

/**
 * Set up giá trị HTML theo biến BPM
 * và add event khi click HTML
 */
function setupHTML(htmlId, bpmId, defaultVal) {
	try {
		// load giá trị từ BPM vào HTML
		updateContentHTML(htmlId, bpmId, defaultVal);
		// add event khi click HTML sẽ focus vào BPM tương ứng
		addEventOnclickHTML(htmlId, bpmId);
	} catch (e) {
		console.error("ERROR ---- setupHTML--" + "htmlId:" + htmlId + "---bpmmId:" + bpmId + "--- Detail ERROR ---" + e.toString());
	}
}

/**
 * Update HTML = giá trị BPM input theo ID tương ứng
 * và đổi màu background
 */
function updateContentHTML(htmlId, bpmId, defaultVal) {
	try {
		// Lấy value BPM tùy theo kiểu dữ liệu
		var bpmValue = "";
		var bpmInput = view.ui.get(bpmId);
		if (!bpmInput) {
			return;
		}
		var bpmInputType = bpmInput.getType() || "";
		if (bpmInputType == "text.3") {
			bpmValue = bpmInput.getData() || "";
		} else if (bpmInputType == "integer.3" || bpmInputType == "decimal.3") {
			bpmValue = convertNumbertoString(bpmInput.getData()) || "";
		} else if (bpmInputType == "dateTimePicker.3") {
			bpmValue = fomatDate(bpmInput.getDate());
		} else if (bpmInputType == "singleSelect.3") {
			bpmValue = bpmInput.getItemText(bpmInput.getSelectedItem());
		}

		// Update HTML
		var htmlEle = document.getElementById(htmlId);
		if (!htmlEle) {
			console.warn("updateContentHTML tag id " + htmlId + " does not exist in HTML file");
			return;
		}
		if (bpmValue != "") {
			htmlEle.textContent = bpmValue;
			htmlEle.style.backgroundColor = colorRed;
		} else {
			htmlEle.textContent = defaultVal;
			htmlEle.style.backgroundColor = '#FFF';
		}
	} catch (e) {
		console.error("ERROR ---- updateContentHTML with" + "htmlId =" + htmlId + "--- Detail ERROR ---" + e.toString());
	}
}

/**
 * Add event khi click HTML focus vào BPM tương ứng
 */
function addEventOnclickHTML (htmlId, bpmId) {
	try {
		var htmlEle = document.getElementById(htmlId);
		if (htmlEle) {
			jQuery('body').on('click', `#${htmlId}`, function () {
				htmlEle.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
				var bpmUI = view.ui.get(bpmId);
				bpmUI.focus();
			});
		}
	} catch (e) {
		console.error("ERROR -- addEventFocusOnBpmUI---" + htmlId + "--- " + e.toString());
	}
}

/**
 * Focus vào HTML tương ứng khi click vào BPM input
 */
this.focusOnHTML = function (htmlId) {
	var htmlEle = document.getElementById(htmlId);
	htmlBeforeFocused.id = htmlId;
	htmlBeforeFocused.backcolor = htmlEle.style.backgroundColor;
	htmlEle.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
	htmlEle.style.backgroundColor = 'rgba(243, 245, 39, 0.5)';
}
/**
 * Blur khỏi HTML
 */
this.blurHTML = function (htmlId) {
	var htmlEle = document.getElementById(htmlId);
	htmlEle.style.backgroundColor = htmlBeforeFocused.backcolor;
}

this.warningChangeData = function (id, key) {
	var respApi = view.context.options.benBResp.get("value").get(key);
	var data = view.ui.get(id).getData();

	view.ui.get(id).setValid(true);
	view.ui.get(id).addClass("", "warningChange");

	if (!!respApi && !!respApi.get("value")) {
		if (id == "benBauthorizationDocumentDate") {
			if (!data || (!!data && data.toLocaleDateString('it-iT') != respApi.get("value").toLocaleDateString('it-iT'))) {
				view.ui.get(id).setValid(false, "Dữ liệu nhập thay đổi so với dữ liệu tích hợp!");
				view.ui.get(id).addClass("warningChange", "");
			}
		} else {
			if (data != respApi.get("value")) {
				view.ui.get(id).setValid(false, "Dữ liệu nhập thay đổi so với dữ liệu tích hợp!");
				view.ui.get(id).addClass("warningChange", "");
			}
		}
	}
}

function fomatDate(dateConvet) {
	var dateStr = "";
	try {
		var y = dateConvet.getFullYear();
		var m = dateConvet.getMonth() + 1;
		var d = dateConvet.getDate();
		var h = dateConvet.getHours();
		var mi = dateConvet.getMinutes();
		var sec = dateConvet.getSeconds();
		if (m < 10) m = "0" + m;
		if (d < 10) d = "0" + d;
		if (h < 10) h = "0" + h;
		if (mi < 10) mi = "0" + mi;
		if (sec < 10) sec = "0" + sec;
		return dateStr = d + "/" + m + "/" + y;
	} catch (e) {
		dateStr = "";
	}
	return dateStr;
}

function convertNumbertoString(number) {
	var numberStr = "";
	try {
		if (number != null && number != undefined) {
			numberStr = number.toString();
		}
	} catch (e) {

	}
	return numberStr;
}


// ========================	Start COMMENT & EDITOR	==========================

const article = document.getElementById("allvoice");
var commentsArray = JSON.parse(this.context.binding.get("value").get("commentData"));
//var commentsArray = [
//    { id: 'comment-box-1', comment: 'Sửa lại căn lề đi', name: 'Lý Công Thành' ,pID: null},
//    { id: 'comment-box-2', comment: 'Đổi điện thoại thành phone', name: 'Nguyễn Hoàng Long', pID: null },
//    { id: 'comment-box-3', comment: 'Đừng sửa chỗ này', name: 'Lưu Thị Lâm Oanh', pID:  'comment-box-1'},
//	  { id: 'comment-box-4', comment: 'OKKK', name: 'Lý Công Thành', pID: null}
//]
var commentIdCounter = 1; // cách sửa tạm thời
try {
	maxId = commentsArray[commentsArray.length - 1].id;
	commentIdCounter = Number(maxId.substring(maxId.length - 1));
} catch (err) {
	commentIdCounter;
}
const eventHandlers = {};
const processedElements = new Set();
var context = this.context;
var div;
var isDown = false;
var isDragging = false;

var newWord;
var inSpan_range = new Range();
var beforeSpan_range = new Range();
var afterSpan_range = new Range();
var inSpan = false;

var doc;
var editor;
var existingCommentBox;

//add funcion draggable
document.addEventListener('mouseup', function() {
	isDown = false;
}, true);

document.addEventListener('mousemove', function(event) {
	var div = document.querySelector('.comment-box');
	event.preventDefault();
	if (isDown) {
		isDragging = true;
		mousePosition = {
			x : event.clientX,
			y : event.clientY
		};
		div.style.left = (mousePosition.x + offset[0]) + 'px';
		div.style.top  = (mousePosition.y + offset[1]) + 'px';
	}
}, true);




function LoadComment() {
	// Lay HTML tu DB
	//$('#editor').trumbowyg('html', context.binding.get("value").get("htmlContent"));

	// Disable editor by default
	//$('#editor').trumbowyg('disable');

	doc = document.getElementById('allvoice');

	// var comment_box = document.createElement('div');
	// comment_box.classList.add('nav-action-comment-box');
	// comment_box.classList.add('col');
	// comment_box.id = 'comment-list';
	// // comment_box.contentEditable = "false";
	// doc.parentNode.insertBefore(comment_box, doc);

	findAndAddEventListeners();
}

//Xoá tất cả các class focus trong html element
function removeAllFocusClasses() {
	const focusedElements = document.querySelectorAll('.focus');
	console.log(focusedElements);
	focusedElements.forEach(element => {
		element.classList.remove('focus');
	});
}

//tìm và thêm event handler
function findAndAddEventListeners() {
	commentsArray.forEach(comment => {
		const elements = document.querySelectorAll(`.${comment.id}`);
		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];
			if (!processedElements.has(element)) {
				processedElements.add(element);
				//element.addEventListener('click', () => {
				jQuery('body').on('click', `.${comment.id}`, () => {
					console.log("chạy click");
					event.stopPropagation();
					if (!document.getElementById(comment.id)) {
						removeAllFocusClasses();
						showCommentBox(comment.id, comment.comment, comment.name);
						const elementfocus = document.querySelectorAll(`.${comment.id}`);
						applyClasses(['focus'], elementfocus);
					}
				});
			}
		}
	});
	saveCommentData();
}

function saveCommentData() {
	var commentString = JSON.stringify(commentsArray);
	context.binding.get("value").set("commentData", commentString);
}

function createReply(commentElement, id, content, name) {
	const replyContainer = document.createElement('div');
	replyContainer.classList.add('reply-container-${id}');
	replyContainer.innerHTML = `
		<div class="reply-header" id="reply-header-${id}">
			<div class="reply-author">
				<span>${name}</span>
			</div>
		</div>
		<div class="reply-content" id="reply-content-${id}">
			<textarea id="reply-text-${id}" rows="2" class="comment-textarea" placeholder="Viết trả lời vào đây">${content}</textarea>
		</div>
		<div class="reply-footer" style = "visibility: visible;">
			<button class="comment-cancel-docs" id="reply-cancel-${id}">Xoá</button>
		</div>
	`;

	commentElement.appendChild(replyContainer);
	const cancelButton = commentElement.querySelector(`#reply-cancel-${id}`);

	cancelButton.addEventListener('click', () => {
		commentElement.removeChild(replyContainer);
	});
}

function showCommentBox(id = null, content = '', name = '') {
	const commentsContainer = document.getElementById("comment-list");
	console.log("chạy hàm showCommentBox");
	const existingCommentBox = document.querySelector('.comment-box');
	if (existingCommentBox) {
		commentsContainer.removeChild(existingCommentBox);
	}
	if (!id) {
		commentIdCounter++;  // Tăng giá trị biến đếm mỗi khi tạo comment box
		id = `comment-box-${commentIdCounter}`;  // Tạo ID duy nhất
		content = '';
	}
	const commentItem = document.createElement('div');
	commentItem.className = 'comment-box';
	commentItem.id = id;
	commentItem.setAttribute('tabindex', '0');
	commentItem.innerHTML = `
			<div class="comment-header">
				<div class="comment-author">
					<span contenteditable="false" id="comment-name-${id}">${name}</span>
				</div>
			</div>
			<div class="comment-content">
				<textarea id="comment-text-${id}" rows="5" class="comment-textarea">${content}</textarea>
			</div>
			<div class="comment-footer">
				<button class="comment-delete-docs" id="delete-${id}">Xoá</button>
				<button class="comment-cancel-docs">Ẩn</button>
			</div>
			<div id = "reply-list-${id}"></div>
			<div class="reply-content">
				<textarea id="reply-text-${id}" rows="2" class="comment-textarea" placeholder="Write a reply..."></textarea>
			</div>
			<div class="reply-footer" id="reply-footer-${id}">
				<button class="comment-cancel-docs" id="reply-cancel-${id}">Huỷ</button>
				<button class="comment-submit comment-submit-disabled" id="reply-submit-${id}">Lưu</button>
			</div>
		`;
	commentsContainer.appendChild(commentItem);
	commentItem.addEventListener('click', () => {
		if (!isDragging) {
			document.getElementsByClassName(id)[0].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
		}
	});
	commentItem.addEventListener('mousedown', function(e) {
		isDragging = false;
		isDown = true;
		offset = [
			commentItem.offsetLeft - e.clientX,
			commentItem.offsetTop - e.clientY
		];
	}, true);
	var cancelButton = commentItem.querySelector('.comment-cancel-docs');
	var deleteButton = document.querySelector(`#delete-${id}`);
	var replyTextarea = commentItem.querySelector(`#reply-text-${id}`);
	var replyFooter = commentItem.querySelector(`#reply-footer-${id}`);
	var replyCancelButton = commentItem.querySelector(`#reply-cancel-${id}`);
	var replySubmitButton = commentItem.querySelector(`#reply-submit-${id}`);
	var reply_list_id = `reply-list-${id}`;
	const reply_list = document.getElementById(reply_list_id);

	// Event click vào textarea của reply
	replyTextarea.addEventListener('focus', () => {
		replyFooter.style.visibility = 'visible';
	});

	replyTextarea.addEventListener('blur', () => {
		if (!replyTextarea.value.trim()) {
			replyFooter.style.visibility = 'hidden';
		}
	});

	replyTextarea.addEventListener('input', () => {
		if (replyTextarea.value.trim()) {
			replySubmitButton.classList.remove('comment-submit-disabled');
			replySubmitButton.classList.add('comment-submit-enable');
		} else {
			replySubmitButton.classList.remove('comment-submit-enable');
			replySubmitButton.classList.add('comment-submit-disabled');
		}
	});

	cancelButton.addEventListener('click', (event) => {
		event.stopPropagation();
		const commentsContainer = document.getElementById("comment-list");
		commentsContainer.removeChild(commentItem);
		removeAllFocusClasses();
	});

	replyCancelButton.addEventListener('click', () => {
		replyFooter.style.visibility = 'hidden';
		replyTextarea.value = '';
	});

	replySubmitButton.addEventListener('click', () => {
		commentIdCounter++;
		var reply_id = `comment-box-${commentIdCounter}`;
		createReply(reply_list, reply_id, replyTextarea.value, "Lý Công Thành");
		//thêm vào mảng
		commentsArray.push({
			id: reply_id,
			comment: replyTextarea.value,
			name: "Lý Công Thành",
			pID: id,
		});
		saveCommentData();
		//reset chỗ reply
		replyCancelButton.click();
	});

	deleteButton.addEventListener('click', (event) => {
	event.stopPropagation();
		const elements = document.querySelectorAll(`.${id}`);
		elements.forEach(element => {
			var textNode = document.createTextNode(element.textContent);
			element.parentNode.replaceChild(textNode, element);
		});
		commentsContainer.removeChild(commentItem);
		// Xóa comment khỏi mảng
		const commentIndex = commentsArray.findIndex(c => c.id === id);
		if (commentIndex !== -1) {
			commentsArray.splice(commentIndex, 1);
		}
		const replyIndex = commentsArray.findIndex(c => c.pID === id);
		if (replyIndex !== -1) {
			commentsArray.splice(replyIndex, 1);
		}
		removeAllFocusClasses();
		console.log(commentsArray);
	});

	//Thêm các cmt nếu có
	var addedReply = commentsArray.filter(comment => comment.pID === id);
	for (var i = 0; i < addedReply.length; i++) {
		createReply(reply_list, addedReply[i].id, addedReply[i].comment, addedReply[i].name);
	}

	//Ấn ra ngoài thì hide comment
    document.addEventListener('click', function(event) {
        if (!commentItem.contains(event.target)) {
            // Clicked outside the comment box, trigger the cancel button
            cancelButton.click();
        }
    }, true);
}

function addComment(id = null, content = '', name = '', range) {
	const commentsContainer = document.getElementById("comment-list");
	var existingCommentBox = document.querySelector('.comment-box');
	if (existingCommentBox) {
		commentsContainer.removeChild(existingCommentBox);
	}
	if (!id) {
		commentIdCounter++;  // Tăng giá trị biến đếm mỗi khi tạo comment box
		id = `comment-box-${commentIdCounter}`;  // Tạo ID duy nhất
		content = '';
		name = 'Lý Công Thành';
	}
	const commentItem = document.createElement('div');
	commentItem.className = 'comment-box';
	commentItem.id = id;
	commentItem.setAttribute('tabindex', '0');
	commentItem.innerHTML = `
        <div class="comment-header">
            <div class="comment-author">
                <span id="comment-name-${id}">${name}</span>
            </div>
        </div>
        <div class="comment-content">
            <textarea id="comment-text-${id}" rows="5" class="comment-textarea" placeholder = "Viết bình luận vào đây">${content}</textarea>
        </div>
        <div class="comment-footer">
            <div class="">
                <button class="comment-delete-docs" id="delete-${id}">Xoá</button>
                <button class="comment-cancel-docs">Ẩn</button>
                <button class="comment-submit comment-submit-disabled" id="submit-${id}">Lưu</button>
            </div>
        </div>
    `;
	commentsContainer.appendChild(commentItem);
	commentItem.addEventListener('mousedown', function(e) {
		isDragging = false;
		isDown = true;
		offset = [
			commentItem.offsetLeft - e.clientX,
			commentItem.offsetTop - e.clientY
		];
	}, true);
	const commentNameInput = document.querySelector(`#comment-name-${id}`);
	const commentTextarea = document.querySelector(`#comment-text-${id}`);
	const commentSubmitButton = document.querySelector(`#submit-${id}`);
	const cancelButton = commentItem.querySelector('.comment-cancel-docs');

//	commentItem.focus();
	
	cancelButton.addEventListener('click', () => {
		commentsContainer.removeChild(commentItem);
	});

	commentTextarea.focus();

	commentTextarea.addEventListener('input', () => {
		if (commentTextarea.value.trim()) {
			commentSubmitButton.classList.remove('comment-submit-disabled');
			commentSubmitButton.classList.add('comment-submit-enable');
		} else {
			commentSubmitButton.classList.remove('comment-submit-enable');
			commentSubmitButton.classList.add('comment-submit-disabled');
		}
	});

	commentSubmitButton.addEventListener('click', () => {
		if (commentTextarea.value.trim()) {
			commentsArray.push({
				id: id,
				comment: commentTextarea.value.trim(),
				name: commentNameInput.textContent.trim(),
				pID: null,
			});
			console.log(commentsArray);
			//range start
			var rangeStart = new Range();
			rangeStart.setStart(range.startContainer, range.startOffset);
			rangeStart.setEnd(range.startContainer, range.startContainer.textContent.length);
			// end
			var rangeEnd = new Range();
			rangeEnd.setStart(range.endContainer, 0);
			rangeEnd.setEnd(range.endContainer, range.endOffset);

			var spansInRange = [];
			if (range.startContainer == range.endContainer) {
				var span = SpanCreate(range);
				spansInRange.push(span);
			}
			else {
				var startSpan = SpanCreate(rangeStart);
				var endSpan = SpanCreate(rangeEnd);
				var spansInRange = getSpansInRange(document.getElementById('allvoice'), range.startContainer, range.endContainer);
				spansInRange.push(endSpan);
			}
			// spansInRange.push(endSpan);
			console.log(spansInRange);
			removeAllFocusClasses();
			applyClasses([id, 'highlight', 'focus'], spansInRange);
			findAndAddEventListeners();

			showCommentBox(id, commentTextarea.value, name);
			console.log("chạy xong hàm");
		}
	});

	//Ấn ra ngoài thì hide comment
    // document.addEventListener('click', function(event) {
    //     if (!commentItem.contains(event.target)) {
	// 		console.log(event.target);
    //         // Clicked outside the comment box, trigger the cancel button
    //         cancelButton.click();
    //     }
    // }, true);
}

//thêm classes cho spans
function applyClasses(classes, spans) {
	spans.forEach(span => {
		classes.forEach(cls => {
			span.classList.add(cls);
		});
	});
}

//Tìm tất cả span có trong khoảng chọn
function getSpansInRange(rootNode, startNode, endNode) {
	let spanList = [];
	let isInRange = false;
	function traverse(node) {
		if (node === startNode) {
			isInRange = true;
		}
		if (isInRange && node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'span') {
			spanList.push(node);
		}
		for (let i = 0; i < node.childNodes.length; i++) {
			traverse(node.childNodes[i]);
		}
		if (node === endNode) {
			isInRange = false;
		}
	}
	traverse(rootNode);
	return spanList;
}

function SpanCreate(range) {
	var span = document.createElement('SPAN');
	span.innerHTML = range.toString();
	range.deleteContents();
	range.insertNode(span);
	return span;
}

//$('#editor').trumbowyg('html', document.getElementById('templateDM').outerHTML);
function onclick_btn_cmt() {
	var selection = window.getSelection();
	if (selection.rangeCount > 0) {
		var range = selection.getRangeAt(0);
		addComment(null, null, null, range);
	}
}

this.saveHTML = function () {
	// Bỏ phần comment khỏi HTML
	try {
		removeAllFocusClasses();
		document.getElementById("comment-list").innerHTML = '';
	} catch (err) {
		console.error(err);
	}
	// Lưu HTML
	//var htmlContent = $('#editor').trumbowyg('html');
	var htmlContent = document.getElementsByClassName("container")[0].outerHTML;
	context.binding.get("value").set("htmlContent", htmlContent);
}

// ===================	End COMMENT & EDITOR	======================

// ============= Start EXPORT HTML =======================
this.getHtmlExport = function (exportType) {
	htmlContent = modifiedHtml('allvoice', exportType);
	
	
	
	//var htmlContent = $('#editor').trumbowyg('html');
	console.log(htmlContent);
	return htmlContent;
}

/*
* Loc bo tat ca cac tag trong <body> HTML tru id duoc truyen vao
*/
function modifiedHtml(eleToKeep, exportType) {
	var htmlToKeep = document.getElementById(eleToKeep).outerHTML;
	var html = document.documentElement.outerHTML;
	var parser = new DOMParser();
	var tempDoc = parser.parseFromString(html, "text/html");
	var tempBody = tempDoc.body;
	tempBody.innerHTML = htmlToKeep;
	tempDoc.head.innerHTML= document.getElementById('css_khong_chi_muc').outerHTML;

	//if (exportType == 'docx') {
		convertHeadingIndex(tempDoc);
	//}
	var modifiedHtml = tempDoc.documentElement.outerHTML;
	
	console.log(modifiedHtml);
	return modifiedHtml;
}

/*
 * Chuyen cac chi muc tu ::before thanh span de xuat Docx
 */
function convertHeadingIndex(html) {
            // Khởi tạo chỉ số
            var idxLv1 = 0; // Chương
            var idxLv2 = 0; // Điều
            var idxLv3 = 0; // 1.
            var idxLv4 = 0; // 1.1
            var idxLv5 = 96; // Unicode a b c d

            // Lưu tất cả các tiêu đề vào mảng
            var headings = Array.from(html.getElementsByClassName("heading"));
            for (let i = 0; i < headings.length; i++) {
                let newContent = '';
                let newTable = '';
                
                // Nội dung
                let content = headings[i].outerHTML;

                if (headings[i].classList.contains("no-counter")) {
                    continue;
                }
                if (headings[i].classList.contains("section")) {
                    newContent = `<span style='font-weight: bold; margin-right: 10px;'>Điều ${++idxLv2}.</span>`;
                    idxLv3 = 0; // Reset số thứ tự khi gặp Điều
                    idxLv4 = 0; // Reset tiểu mục khi gặp số mới
                    idxLv5 = 96; // Reset chữ cái khi gặp tiểu mục mới

                     newTable = `
                        <table class="table-export">
                            <tr>
                                <td  class="table-export-index-heading-section"><p>${newContent}</p></td>
                                <td><p>${content}</p></td>
                            </tr>
                        </table>
                    `;

                } else if (headings[i].classList.contains("number")) {
                    newContent = `<span style='font-weight: bold; margin-right: 10px;'>${++idxLv3}.</span>`;
                    idxLv4 = 0; // Reset tiểu mục khi gặp số mới
                    idxLv5 = 96; // Reset chữ cái khi gặp tiểu mục mới

                     newTable = `
                        <table class="table-export">
                            <tr>
                                <td  class="table-export-index-heading"><p>${newContent}</p></td>
                                <td><p>${content}</p></td>
                            </tr>
                        </table>
                    `;
                } else if (headings[i].classList.contains("subnumber")) {
                    newContent = `<span style='font-weight: bold; margin-right: 10px;'>${idxLv3}.${++idxLv4}.</span>`;
                    idxLv5 = 96; // Reset chữ cái khi gặp tiểu mục mới

                     newTable = `
                        <table class="table-export">
                            <tr>
                                <td  class="table-export-index-heading"><p>${newContent}</p></td>
                                <td><p>${content}</p></td>
                            </tr>
                        </table>
                    `;
                } else if (headings[i].classList.contains("subletter")) {
                    newContent = `<span style='font-weight: bold; margin-right: 10px;'>${String.fromCharCode(++idxLv5)})</span>`;
                
                     newTable = `
                        <table class="table-export">
                            <tr>
                                <td  class="table-export-index-heading"><p>${newContent}</p></td>
                                <td><p>${content}</p></td>
                            </tr>
                        </table>
                    `;
                
                }     
                
                headings[i].outerHTML = newTable;
            }

            // Lưu tất cả các bullet points vào mảng
            var bulletPoints = Array.from(html.getElementsByClassName("bullet"));
            for (let i = 0; i < bulletPoints.length; i++) {
                let bulletSymbol = '';
                if (bulletPoints[i].classList.contains("bullet-level-1")) {
                    bulletSymbol = "-";
                } else if (bulletPoints[i].classList.contains("bullet-level-2")) {
                    bulletSymbol = "•";
                } else if (bulletPoints[i].classList.contains("bullet-level-3")) {
                    bulletSymbol = "◦";
                } else if (bulletPoints[i].classList.contains("bullet-level-4")) {
                    bulletSymbol = "▪";
                }

                // Thay thế bullet bằng bảng
                let bulletContent = bulletPoints[i].outerHTML;
                let newBulletTable = `
                        <table  class="table-export">
                            <tr>
                                <td  class="table-export-index-bullet"><p>${bulletSymbol}</p></td>
                                <td><p>${bulletContent}</p></td>
                            </tr>
                        </table>
                    `;
                bulletPoints[i].outerHTML = newBulletTable;
            }
        }

// =============== END EXPORT HTML ========================

// =============== START HTML diff ========================

this.diffDocument = function () {
	var orgContent = this.context.binding.get("value").get("htmlContent");
	var curContent = $('#editor').trumbowyg('html');
	orgContent = removeIds(orgContent);
	curContent = removeIds(curContent);
	var diffHtml = htmldiff(orgContent, curContent);
	document.getElementById('diffOutput').innerHTML = diffHtml;
}

function removeIds(htmlString) {
	// Tạo một DOM từ chuỗi HTML
	var parser = new DOMParser();
	var doc = parser.parseFromString(htmlString, 'text/html');

	// Tìm tất cả các phần tử có thuộc tính id và loại bỏ chúng
	doc.querySelectorAll('[id]').forEach(function (element) {
		element.removeAttribute('id');
	});

	// Chuyển đổi lại DOM thành chuỗi HTML
	return doc.body.outerHTML;
}

// =============== END HTML diff ===========================

// =============== START chỉ mục ========================


// =============== END chỉ mục ===========================
