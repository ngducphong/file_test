view = this;

var context = this.context;
/**
* Set up theo cặp HTML và biến BPM tương ứng
*/
this.onloadHTML = onloadHTML;

this.loadConfig = function () {
	var acessLevel = this.context.options.acessLevel.get("value");
	if (acessLevel == "N2") {
		_set_readonly_with(page.ui.get("/Template1/HDBD01_HopDongTheChap_View1/Vertical_Layout2"), false);
	}
}

this.loadButton = function () {
	var accessLevel = this.context.options.acessLevel.get("value") || "";
	var Button1 = view.ui.get("Button1");//Đóng
	var Button2 = view.ui.get("Button2");//Lưu
	var Button3 = view.ui.get("Button3");//Chỉnh sửa
	var Button4 = view.ui.get("Button4");//Xem thay đổi
	var Button5 = view.ui.get("Button5");//Xuất file PDF
	var Button6 = view.ui.get("Button6");//Xuất file Docx
	var Button7 = view.ui.get("Button7");//Cập nhật dữ liệu
	var Button8 = view.ui.get("Button8");//Đồng ý
	if (accessLevel == "N2") {
		//	 	Button3.setVisible(false, true);
		Button8.setVisible(false, true);
	}
	console.log("accessLevel---------" + accessLevel);
}


function onloadHTML() {

	view.ui.get("CommonView1").setupHTML("salutation_key", "salutation", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("notificationNumber_key", "notificationNumber", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("notificationDay_key", "notificationDay", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("notificationMonth_key", "notificationMonth", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("notificationYear_key", "notificationYear", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("branch_key", "branch", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("mortgageContract_key", "mortgageContract", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("notarizationNumber_key", "notarizationNumber", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("notarizationBookNumber_key", "notarizationBookNumber", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("bankBranch_key", "bankBranch", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("partner_key", "partner", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("mortgageeBankBranch_key", "mortgageeBankBranch", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("mortgageeAddress_key", "mortgageeAddress", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("mortgageeBusinessId_key", "mortgageeBusinessId", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("mortgageePhoneNumber_key", "mortgageePhoneNumber", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("mortgageeFaxNumber_key", "mortgageeFaxNumber", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("representativeDesignation_key", "representativeDesignation", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("mortgageeRepresentative_key", "mortgageeRepresentative", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("mortgageePosition_key", "mortgageePosition", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("collateralAsset_key", "collateralAsset", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("certificateOfOwnership_key", "certificateOfOwnership", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("certificateNumber_key", "certificateNumber", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("recordBookNumber_key", "recordBookNumber", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("certificateIssuedBy_key", "certificateIssuedBy", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("certificateHolder_key", "certificateHolder", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("currentMortgageStatus_key", "currentMortgageStatus", "[…]", "text-input");
	view.ui.get("CommonView1").setupHTML("notificationRecipients_key", "notificationRecipients", "[…]", "text-input");

	//view.ui.get("CommonView1").setupHTML("mortgagorName_key", "mortgagorName", "[…]", "text-input");
	//view.ui.get("CommonView1").setupHTML("mortgagorIdNumber_key", "mortgagorIdNumber", "[…]", "text-input");
	//view.ui.get("CommonView1").setupHTML("mortgagorIdIssuedBy_key", "mortgagorIdIssuedBy", "[…]", "text-input");
	//view.ui.get("CommonView1").setupHTML("mortgagorAddress_key", "mortgagorAddress", "[…]", "text-input");
	//view.ui.get("CommonView1").setupHTML("mortgagorBirthYear_key", "mortgagorBirthYear", "[…]", "datetimepicker-input");
	//view.ui.get("CommonView1").setupHTML("registrationRequestDate_key", "registrationRequestDate", "[…]", "datetimepicker-input");
	//view.ui.get("CommonView1").setupHTML("notarizationDate_key", "notarizationDate", "[…]", "datetimepicker-input");
	//view.ui.get("CommonView1").setupHTML("mortgagorIdIssuedDate_key", "mortgagorIdIssuedDate", "[…]", "datetimepicker-input");
	//view.ui.get("CommonView1").setupHTML("certificateIssuedDate_key", "certificateIssuedDate", "[…]", "datetimepicker-input");
	//view.ui.get("CommonView1").setupHTML("mortgageeBusinessRegistrationDay_key", "mortgageeBusinessRegistrationDay", "[…]", "datetimepicker-input");
	//view.ui.get("CommonView1").setupHTML("mortgageeBusinessIdIssuedBy_key", "mortgageeBusinessIdIssuedBy", "[…]", "text-input");
	//view.ui.get("CommonView1").setupHTML("mortgageeAuthorizationDocumentNumber_key", "mortgageeAuthorizationDocumentNumber", "[…]", "text-input");

}

this.loadBpmToHtml = function () {
	view.ui.get("CommonView1").loadBpmToHTML("salutation_key", "salutation");
	view.ui.get("CommonView1").loadBpmToHTML("notificationNumber_key", "notificationNumber");
	view.ui.get("CommonView1").loadBpmToHTML("notificationDay_key", "notificationDay");
	view.ui.get("CommonView1").loadBpmToHTML("notificationMonth_key", "notificationMonth");
	view.ui.get("CommonView1").loadBpmToHTML("notificationYear_key", "notificationYear");
	view.ui.get("CommonView1").loadBpmToHTML("branch_key", "branch");
	view.ui.get("CommonView1").loadBpmToHTML("mortgageContract_key", "mortgageContract");
	view.ui.get("CommonView1").loadBpmToHTML("notarizationNumber_key", "notarizationNumber");
	view.ui.get("CommonView1").loadBpmToHTML("notarizationBookNumber_key", "notarizationBookNumber");
	view.ui.get("CommonView1").loadBpmToHTML("bankBranch_key", "bankBranch");
	view.ui.get("CommonView1").loadBpmToHTML("partner_key", "partner");
	view.ui.get("CommonView1").loadBpmToHTML("mortgageeBankBranch_key", "mortgageeBankBranch");
	view.ui.get("CommonView1").loadBpmToHTML("mortgageeAddress_key", "mortgageeAddress");
	view.ui.get("CommonView1").loadBpmToHTML("mortgageeBusinessId_key", "mortgageeBusinessId");
	view.ui.get("CommonView1").loadBpmToHTML("mortgageePhoneNumber_key", "mortgageePhoneNumber");
	view.ui.get("CommonView1").loadBpmToHTML("mortgageeFaxNumber_key", "mortgageeFaxNumber");
	view.ui.get("CommonView1").loadBpmToHTML("representativeDesignation_key", "representativeDesignation");
	view.ui.get("CommonView1").loadBpmToHTML("mortgageeRepresentative_key", "mortgageeRepresentative");
	view.ui.get("CommonView1").loadBpmToHTML("mortgageePosition_key", "mortgageePosition");
	view.ui.get("CommonView1").loadBpmToHTML("collateralAsset_key", "collateralAsset");
	view.ui.get("CommonView1").loadBpmToHTML("certificateOfOwnership_key", "certificateOfOwnership");
	view.ui.get("CommonView1").loadBpmToHTML("certificateNumber_key", "certificateNumber");
	view.ui.get("CommonView1").loadBpmToHTML("recordBookNumber_key", "recordBookNumber");
	view.ui.get("CommonView1").loadBpmToHTML("certificateIssuedBy_key", "certificateIssuedBy");
	view.ui.get("CommonView1").loadBpmToHTML("certificateHolder_key", "certificateHolder");
	view.ui.get("CommonView1").loadBpmToHTML("currentMortgageStatus_key", "currentMortgageStatus");
	view.ui.get("CommonView1").loadBpmToHTML("notificationRecipients_key", "notificationRecipients");

	//view.ui.get("CommonView1").loadBpmToHTML("mortgagorName_key", "mortgagorName");
	//view.ui.get("CommonView1").loadBpmToHTML("mortgagorIdNumber_key", "mortgagorIdNumber");
	//view.ui.get("CommonView1").loadBpmToHTML("mortgagorIdIssuedBy_key", "mortgagorIdIssuedBy");
	//view.ui.get("CommonView1").loadBpmToHTML("mortgagorAddress_key", "mortgagorAddress");
	//view.ui.get("CommonView1").loadBpmToHTML("mortgagorBirthYear_key", "mortgagorBirthYear");
	//view.ui.get("CommonView1").loadBpmToHTML("registrationRequestDate_key", "registrationRequestDate");
	//view.ui.get("CommonView1").loadBpmToHTML("notarizationDate_key", "notarizationDate");
	//view.ui.get("CommonView1").loadBpmToHTML("mortgagorIdIssuedDate_key", "mortgagorIdIssuedDate");
	//view.ui.get("CommonView1").loadBpmToHTML("certificateIssuedDate_key", "certificateIssuedDate");
	//view.ui.get("CommonView1").loadBpmToHTML("mortgageeBusinessRegistrationDay_key", "mortgageeBusinessRegistrationDay");
	//view.ui.get("CommonView1").loadBpmToHTML("mortgageeBusinessIdIssuedBy_key", "mortgageeBusinessIdIssuedBy");
	//view.ui.get("CommonView1").loadBpmToHTML("mortgageeAuthorizationDocumentNumber_key", "mortgageeAuthorizationDocumentNumber");


	this.loadListBpmToHtml();

}

this.loadListBpmToHtml = function () {

	// bảng TB01BenTheChap

	var table = view.ui.get("TB01BenTheChap");
	var records = table.getRecords();
	if (records && records.length > 0) {
		var html = "";
		for (var i = 0; i < records.length; i++) {

			var htmlnew = [
				'<table class="table-no-border">',
				'<tr>',
				'<td class="tx12bold" style="width: 50%;">',
				'<span><span>Họ tên: </span><span id="mortgagorName_key' + i + '"> ' + getString(records[i].spouseName) + ' </span></span>',
				'</td>',
				'<td class="tx12" style="width: 50%;">',
				'<span>Sinh năm: </span><span id="mortgagorBirthYear_key' + i + '">  ' + getString(dateToString(records[i].spouseBirthYear)) + '  </span>',
				'</td>',
				'</tr>',
				'</table>',
				'<p class="tx12">',
				'<span>CCCD/CMND/Hộ chiếu số:</span><span id="mortgagorIdNumber_key' + i + '"> ' + getString(records[i].mortgagorIdNumber) + '</span>',
				'<span> do</span><span id="mortgagorIdIssuedBy_key' + i + '"> ' + getString(records[i].mortgagorIdIssuedBy) + ' </span>',
				'<span> cấp ngày</span><span id="mortgagorIdIssuedDate_key' + i + '"> ' + getString(dateToString(records[i].mortgagorIdIssuedDate)) + ' </span>',
				'</p>',
				'<p class="tx12">',
				'<span>Nơi thường trú: </span><span id="mortgagorAddress_key' + i + '"> ' + getString(records[i].mortgagorAddress) + '  </span>',
				'</p>'
			].join(" ");

			html += htmlnew;
		}

		view.ui.get("CommonView1").insertHtmlIntoElementById("TB01BenTheChap", html);

		for (var i = 0; i < records.length; i++) {
			var spouseName = table.ui.get("spouseName[" + i + "]");
			view.ui.get("CommonView1").setupHTMLList("mortgagorName_key" + i, spouseName, "[…]", "text-input");
			var spouseBirthYear = table.ui.get("spouseBirthYear[" + i + "]");
			view.ui.get("CommonView1").setupHTMLList("mortgagorBirthYear_key" + i, spouseBirthYear, "[…]", "datetimepicker-input");
			var mortgagorIdNumber = table.ui.get("mortgagorIdNumber[" + i + "]");
			view.ui.get("CommonView1").setupHTMLList("mortgagorIdNumber_key" + i, mortgagorIdNumber, "[…]", "text-input");
			var mortgagorIdIssuedBy = table.ui.get("mortgagorIdIssuedBy[" + i + "]");
			view.ui.get("CommonView1").setupHTMLList("mortgagorIdIssuedBy_key" + i, mortgagorIdIssuedBy, "[…]", "text-input");
			var mortgagorIdIssuedDate = table.ui.get("mortgagorIdIssuedDate[" + i + "]");
			view.ui.get("CommonView1").setupHTMLList("mortgagorIdIssuedDate_key" + i, mortgagorIdIssuedDate, "[…]", "datetimepicker-input");
			var mortgagorAddress = table.ui.get("mortgagorAddress[" + i + "]");
			view.ui.get("CommonView1").setupHTMLList("mortgagorAddress_key" + i, mortgagorAddress, "[…]", "text-input");
		}


	} 

	// bảng VanBanUyQuyen
	var tableVanBanUyQuyen = view.ui.get("VanBanUyQuyen");
	var recordsVanBanUyQuyen = tableVanBanUyQuyen.getRecords();
	if (recordsVanBanUyQuyen && recordsVanBanUyQuyen.length > 0) {
		var htmlTableVanBanUyQuyen = "";
		for (var i = 0; i < recordsVanBanUyQuyen.length; i++) {

			var htmlTableVanBanUyQuyenChild = [
				'<table class="table-no-border">',
				'    <tr>',
				'        <td class="tx12" style="width: 25%;">',
				'            <span>Văn bản ủy quyền số </span>',
				'        </td>',
				'        <td class="tx12">',
				'            <span>:</span>',
				'            <span>',
				'                <span class="title4Content" id="mortgageeAuthorizationDocumentNumber_key' + i + '">',
				'                    ' + getString(recordsVanBanUyQuyen[i].AuthorizationDocumentNumber) + ' ',
				'                </span>',
				'                <span class="title4Content">, Ngày:</span>',
				'                <span class="title4Content" id="mortgageeAuthorizationDocumentDay_key' + i + '">',
				'                    ' + getString(dateToString(recordsVanBanUyQuyen[i].AuthorizationDate)) + ' ',
				'                </span>',
				'                <span class="title4Content">, Của:</span>',
				'                <span class="title4Content" id="mortgageeAuthorizationDocumentBy_key' + i + '">',
				'                    ' + getString(recordsVanBanUyQuyen[i].Authorizer) + ' ',
				'                </span>',
				'            </span>',
				'        </td>',
				'    </tr>',
				'</table>'
			].join(" ");
			

			htmlTableVanBanUyQuyen += htmlTableVanBanUyQuyenChild;
		}

		view.ui.get("CommonView1").insertHtmlIntoElementById("VanBanUyQuyen", htmlTableVanBanUyQuyen);

		for (var i = 0; i < recordsVanBanUyQuyen.length; i++) {
			var AuthorizationDocumentNumber = tableVanBanUyQuyen.ui.get("AuthorizationDocumentNumber[" + i + "]");
			view.ui.get("CommonView1").setupHTMLList("mortgageeAuthorizationDocumentNumber_key" + i, AuthorizationDocumentNumber, "[…]", "text-input");

			var AuthorizationDate = tableVanBanUyQuyen.ui.get("AuthorizationDate[" + i + "]");
			view.ui.get("CommonView1").setupHTMLList("mortgageeAuthorizationDocumentDay_key" + i, AuthorizationDate, "[…]", "datetimepicker-input");

			var Authorizer = tableVanBanUyQuyen.ui.get("Authorizer[" + i + "]");
			view.ui.get("CommonView1").setupHTMLList("mortgageeAuthorizationDocumentBy_key" + i, Authorizer, "[…]", "text-input");
			
		}
	}

}


