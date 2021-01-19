/* ---------------------------------------
 Exported Module Variable: Wiki2Reveal
 Package:  wiki2reveal
 Version:  2.1.16  Date: 2021/01/19 12:57:27
 Homepage: https://github.com/niebert/Wiki2Reveal#readme
 Author:   Engelbert Niehaus
 License:  MIT
 Date:     2021/01/19 12:57:27
 Require Module with:
    const Wiki2Reveal = require('wiki2reveal');
 JSHint: installation with 'npm install jshint -g'
 ------------------------------------------ */

/*jshint  laxcomma: true, asi: true, maxerr: 150 */
/*global alert, confirm, console, prompt */

//#################################################################
//# Javascript Class: Wiki2HTML()
//#       SuperClass:
//#   Class Filename: wiki2html.js
//#
//# Author of Class:      Engelbert Niehaus
//# email:                niehaus@uni-landau.de
//# created               21.1.2018
//# last modifications    2018/01/21 17:17:18
//# GNU Public License V3 - OpenSource
//#
//# created with JavaScript Class Creator JSCC
//#     https://niebert.github.io/JavascriptClassGenerator
//#################################################################

  	/*
  	This Library was created with JavascriptClassCreator
  	https://niebert.github.io/JavascriptClassCreator
  	The library is based on  wiki2HTML library of Elia Contini
  	publised under GPL.
  	Parses wiki markup and generates HTML 5 showing a preview.
      Copyright (C) 2010-2013 Elia Contini

      This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      any later version.

      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.

      You should have received a copy of the GNU General Public License
      along with this program. If not, see http://www.gnu.org/licenses/.
   */

//---------------------------------------------------------------------
//---Store File in Subdirectory /js and import this Class in HTML-File with
// SCRIPT-Tag:  LANGUAGE="JavaScript" SRC="js/wiki2html.js"
//---------------------------------------------------------------------
//---Constructor of Class Wiki2HTML()
// Call the constructor for creating an instance of class Wiki2HTML
// by the following command in HTML-file that imports this class
// var vMyInstance = new Wiki2HTML();
//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
//---------------------------------------------------------------------
// If you want to access the attributes of Wiki2HTML, use
// the attribute name with a leading "this." in the definition of method of Wiki2HTML, e.g.
// this.aName = "Hello World";
//---------------------------------------------------------------------
//----Methods----------------------------------------------------------
//---------------------------------------------------------------------
// (1) If you want to assign definitions of methods for single instance of the class 'Wiki2HTML'
// they are defined with
//    this.my_method = function (pPar1,pPar2)
// this approach allows to overwrite the method definition of single instances dynamically.
//---------------------------------------------------------------------
// (2) A prototype definition of methods for 'Wiki2HTML' will be set by
// use the method's name and extend it with 'Wiki2HTML'.
//    Wiki2HTML.prototype.my_method = function (pPar1,pPar2)
// This approach consumes less memory for instances.
//---------------------------------------------------------------------

	// no superclass defined


function Wiki2HTML () {
	// no superclass defined

  //---------------------------------------------------------------------
  //---Attributes of Class "Wiki2HTML()"
  //---------------------------------------------------------------------
	//---PUBLIC: aProjectDir (String): the attribute 'aProjectDir' stores in 'String' the relative path in the PanDoc root directory
	this.aWikiTitle = "Swarm intelligence";
	//---PUBLIC: aProjectDir (String): the attribute 'aProjectDir' stores in 'String' the relative path in the PanDoc root directory
	this.aProjectDir = "demo/my_article";
	//---PUBLIC: aRemoteMedia (Boolean): the attribute 'aRemoteMedia' stores in 'Boolean' variable if the MediaLinks are stored in the local file system of referenced to remote Media Server
	this.aRemoteMedia = false;
	//---PUBLIC: aLanguage ID (String): defines the Language of the MediaWiki
	this.aLanguage = "en";
	//---PUBLIC: aDomain(String): defines the MediaWiki product of Wiki Foundation "wikiversity", "wikipedia", ..
	this.aDomain = "wikiversity";
	//---PUBLIC: aTOC stored the TOC Table of Contents parsed from the section structure of the Wiki/HMTL file
	this.aTOC = [];
	this.aInsertTOC = true; // will be inserted in sections
	//---PUBLIC: aServer is set with the init(pLanguage,pDomain) together with aLanguage and aDomain
	this.aServer = "https://en.wikiversity.org/wiki/";
	//---PUBLIC: aMediaPath is used for downloading the embedded image resp. the referencing the images in the HTML
	this.aMediaPath = "https://en.wikiversity.org/wiki/Special:Redirect/file/";
	//---PUBLIC: aDocJSON is a Hash that collects the data while parsing the vWikiCode generated by wtf_wikipedia.js set by init()-call
	this.aDocJSON = {};
	// depricated replaced by aDocJSON
	this.aParseJSON = {};
	//---PUBLIC: aDefaultImageWidth is used if width of the image in not defined
	this.aDefaultImageWidth = 300;

	this.aMap = {};
	this.aMap["w"] = "wikipedia";
	this.aMap["wikipedia"] = "wikipedia";
	this.aMap["Wikipedia"] = "wikipedia";
	this.aMap["v"] = "wikiversity";
	this.aMap["wikiversity"] = "wikiversity";
	this.aMap["Wikiversity"] = "wikiversity";
	this.aMap["b"] = "wikibooks";
	this.aMap["wikibooks"] = "wikibooks";
	this.aMap["Wikibooks"] = "wikibooks";

	this.aFilePrefix = {};
	this.aFilePrefix["File"] = "File";
	this.aFilePrefix["file"] = "File";
	this.aFilePrefix["Datei"] = "File";
	this.aFilePrefix["Image"] = "File";

	this.aMediaArray = [];
	this.aTplEngine = new TemplateEngine();


  //---------------------------------------------------------------------
  //---Methods of Class "Wiki2HTML()"
  //---------------------------------------------------------------------
	//----PUBLIC Method: Wiki2HTML.parse(pWikiCode:String):String-----
	// parse(pWikiCode)  Return: String
	//	parses the MediaWiki code in argument and returns a HTML string
	//----PUBLIC Method: Wiki2HTML.clean_source(pWikiCode:String):String-----
	// clean_source(pWikiCode)  Return: String
	//	clean_source(pWikiCode) normalizes line breaks in order to have a common base string for all browsers.
	//	clean_source() uses the MediaWiki source code `pWikiCode` from the parameter of the function and returns a HTML string
	//	after removing all CRs.
	//----PUBLIC Method: Wiki2HTML.sections(pWikiCode:String):String-----
	// sections(pWikiCode)  Return: String
	//	Convert all sections in Wiki source code
	//----PUBLIC Method: Wiki2HTML.horizontalRule(pWikiCode:String):String-----
	// horizontalRule(pWikiCode)  Return: String
	//	Convert the  horizontal rules in Wiki source code
	//----PUBLIC Method: Wiki2HTML.inlineElement(pWikiCode:String):String-----
	// inlineElement(pWikiCode)  Return: String
	//	Convert for inline elements of the Wiki source code
	//----PUBLIC Method: Wiki2HTML.replaceImages(pWikiCode:String):String-----
	// replaceImages(pWikiCode)  Return: String
	//	Convert for inline elements of the Wiki source code
	//----PUBLIC Method: Wiki2HTML.list(pWikiCode:String):String-----
	// list(pWikiCode)  Return: String
	//	Convert orderd and unorderd list in the Wiki Source code
	//----PUBLIC Method: Wiki2HTML.table(pWikiCode:String):String-----
	// table(pWikiCode)  Return: String
	//	Convert the table from WikiSource code in HTML
	//----PUBLIC Method: Wiki2HTML.paragraph(pWikiCode:String):String-----
	// paragraph(pWikiCode)  Return: String
	//	Convert all paragraphs in the Wiki source code
	//----PUBLIC Method: Wiki2HTML.math2jax(pWikiCode:String,pFormat:String):String-----
	// math2jax(pWikiCode,pFormat)  Return: String
	//	Convert the MATH-tag to a MathJax compatible HTML enviroment dependent of the pFormat of the parameter of math2jax.
	//	pFormat = 'reveal' 'html' are possible formats
	//----PUBLIC Method: Wiki2HTML.extractTOC(pWikiCode:String):String-----
	// extractTOC(pWikiCode)  Return: String
	//	Convert the table of contents from Wiki source code into HTML
	//----PUBLIC Method: Wiki2HTML.generateTOC(pWikiCode:String):String-----
	// generateTOC(pWikiCode)  Return: String
	//	Convert the table of contents from Wiki source code into HTML. TOC stored in this.aTOC as JSON file
	//----PUBLIC Method: Wiki2HTML.convertWiki2Local(pContent:String,:Hash):String-----
	// convertWiki2Local(pContent)  Return: String
	//	convertWiki2Local() replaces the MediaWiki internal links to links that work in a local HTML file. The parsed vMediaWiki Links
	//----PUBLIC Method: Wiki2HTML.parseWiki4Media(pWikiCode:String):Array-----
	// parseWiki4Media(pWikiCode)  Return: Array
	//	parseWiki4Media() the pWikiCode and extract the Media and File links.
	//----PUBLIC Method: Wiki2HTML.createMediaParseJSON(vMediaArray:Array)-----
	// createMediaParseJSON(vMediaArray)
	//	createMediaParseJSON(vMediaArray:Array) creates in this.aParseJSON["media"]={} a Hash
	//	that maps the local file path 'image/my_image.png' to the replace path
	//	this.aParseJSON["media"]["image/my_image.png"] = "https://commons.wikimedia.org/wiki/my_image.png"
	//----PUBLIC Method: Wiki2HTML.checkParseJSON(pHashID:String)-----
	// checkParseJSON(pHashID)
	//	checkParseJSON() checks if the File Link definitions exists in the pWikiHash["media"]
	//----PUBLIC Method: Wiki2HTML.getMediaSubDir(pMediaLink:String)-----
	// getMediaSubDir(pMediaLink)
	//	getMediaSubDir(pMediaLink) return for a pMediaLink the appropriate subdirectory.
	//----PUBLIC Method: Wiki2HTML.convertWikiMedia2File(pMediaLink:String):String-----
	// convertWikiMedia2File(pMediaLink)  Return: String
	//	convertWikiMedia2File(pMediaLink) converts the pMediaLink into an URL and returns the media link.
	//	removes blanks at the tail and replaces blanks with and underscore "_"
	//	and non-alpha-numerical characters with an underscore, so that finally the filename works fine on all file systems
	//----PUBLIC Method: Wiki2HTML.convertWikiMedia2URL(pMediaLink:String):String-----
	// convertWikiMedia2URL(pMediaLink)  Return: String
	//	convertWikiMedia2URL(pMediaLink) removes blanks at the tail and replaces blanks with and underscore "_"
	//----PUBLIC Method: Wiki2HTML.downloadWikiMedia(pMediaArray:Array)-----
	// downloadWikiMedia(pMediaArray)
	//	downloadWikiMedia(pMediaArray:Array) download the images to level-fs
	//	that can be exported as ZIP-file with archiver NPM module
	//----PUBLIC Method: Wiki2HTML.downloadMediaFile(pMediaLink:String)-----
	// downloadMediaFile(pMediaLink)
	//	downloadMediaFile(pMediaFile) from WikiMedia Commons to the local filesystem emulated with level-fs
	//----PUBLIC Method: Wiki2HTML.convertMediaLink4Wiki(pContent:String,pMediaArray:Array):String-----
	// convertMediaLink4Wiki(pContent,pMediaArray)  Return: String
	//	convertMediaLink4Wiki(pContent,pMediaWiki) convert the link
	//	- [[File:MyFile.png....   with
	//	- [File:https://commons.wikimedia.org/.../MyFile.png
	//----PUBLIC Method: Wiki2HTML.replaceString(pString:String,pSearch:String,pReplace:String):String-----
	// replaceString(pString,pSearch,pReplace)  Return: String
	//	replaceString(pString,pSearch,pReplace) replaces globally pSearch by pReplace and returns the modified string
	//----PUBLIC Method: Wiki2HTML.convertWiki2Online(pContent:String):String-----
	// convertWiki2Online(pContent)  Return: String
	//	convertWiki2Online(pContent) converts the Links and Media in way so that media and links
	//	are referenced to online resource to the server
	//----PUBLIC Method: Wiki2HTML.replaceWikiLinks(pWikiCode:String:Hash):String-----
	// replaceWikiLinks(pWikiCode)  Return: String
	//	Comment for replaceWikiLinks
	//----PUBLIC Method: Wiki2HTML.getWikiLinks(pWikiCode:String):String-----
	// getWikiLinks(pWikiCode)  Return: String
	//	getWikiLinks(pWikiCode) extract Double-Bracket [[...]] link in pWikiCode
	//----PUBLIC Method: Wiki2HTML.convertMediaLink4WikiOnline(pContent:String,pMediaArray:Array):String-----
	// convertMediaLink4WikiOnline(pContent,pMediaArray)  Return: String
	//	convertMediaLink4WikiOnline(pWikiCode,pMediaArray) converts Media Links to WikiMedia Commons
	//	to a remote link for local files



}
//-------------------------------------------------------------------------
//---END Constructor of Class "Wiki2HTML()"
//-------------------------------------------------------------------------

//#################################################################
//# PUBLIC Method: init()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pLanguage:String
//#    pWikiID:String
//# Comment:
//#    parses the MediaWiki code in argument and returns a HTML string
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################


Wiki2HTML.prototype.init = function (pLanguage,pDomain,pDocJSON) {
	this.aLanguage = pLanguage;
	this.aDomain = pDomain; // e.g. "wikiversity"
	this.aServer = "https://"+this.aLanguage+"."+this.aDomain+".org/wiki/";
	this.aMediaPath = "https://"+this.aLanguage+"."+this.aDomain+".org/wiki/Special:Redirect/file/";
	this.aDocJSON = pDocJSON || {};
	if (this.aDocJSON.hasOwnProperty("lang_or_wikiid")) {
			delete this.aDocJSON["lang_or_wikiid"];
	};
	this.aDocJSON["language"] = pLanguage;
	this.aDocJSON["domain"] = pDomain;
};
//----End of Method init Definition


//#################################################################
//# PUBLIC Method: parse()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    parses the MediaWiki code in argument and returns a HTML string
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.parse = function (pWikiCode,pWikiTitle) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: parse(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: parse(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.parse(pWikiCode);
  //-------------------------------------------------------

  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/regexp
			pWikiTitle = pWikiTitle || "Title undefined in parse()";
  		var html = '<p>function wiki2html(pWikiCode): an error occurs</p>';
			this.aWikiTitle = pWikiTitle.replace(/_/g," ");
			// set Title in DocJSON
			if ((this.aDocJSON) && (this.aDocJSON.sections) && (this.aDocJSON.sections.length >0)) {
				// set Title in first section of aDocJSON
				this.aDocJSON.sections[0]["title"] = this.replaceString(this.aWikiTitle,"_"," ");
				// set Downloaded URL in aDocJSON
				this.aDocJSON["url"] = this.aServer+this.aWikiTitle;
				// set Download Time in aDocJSON
				var now = new Date();
				this.aDocJSON["date"] = now.toJSON();
			};
			if (this.aRemoteMedia == true) {
				// remote Media links
				//pWikiCode = this.convertWiki2Online(pWikiCode);
			} else {
				// local media links - requires download of Media files for display
				//pWikiCode = this.convertWiki2Local(pWikiCode);
				// ZIP/archive downloaded files TODO
			};
			// saveJSON("wikidata.json",vParseJSON); // TODO
			pWikiCode = this.clean_source(pWikiCode);
			pWikiCode = this.paragraph(pWikiCode);
			pWikiCode = this.math2jax(pWikiCode);
			pWikiCode = this.math2reveal(pWikiCode);
			pWikiCode = this.sections(pWikiCode);
  		pWikiCode = this.horizontalRule(pWikiCode);
			pWikiCode = this.replaceWikiLinks(pWikiCode);
			//pWikiCode = this.convertWiki2Local(pWikiCode);
			pWikiCode = this.replaceImages(pWikiCode);
			pWikiCode = this.inlineElement(pWikiCode);

  		pWikiCode = this.list(pWikiCode);
  		pWikiCode = this.table(pWikiCode);
			// collect a TOC (Table of Contents) JSON in vHashTOC.
			// Level=0 is the root level of TOC, it will NOT be stored in this.aTOC
			// unless vDepthIncrease > 0 and "title" of root section != ""
			// extractTOC() uses aDocJSON to create the TOC
			// this.extractTOC() will replace the this.aTOC attribute with vHashTOC if level=0
			var vDepthIncrease = 0; // increase depth of TOC (Table of Contents)
			//  set vDepthIncrease to 1 for WikiBookCreator because a section for collected articles necessary
			this.extractTOC(vDepthIncrease); // parse TOC
			pWikiCode = this.insertTOC(pWikiCode); // Inserts if this.aInsertTOC == true
			// Clean Wiki deletes currently unsupported Wiki Source Code
			pWikiCode = this.clean_unsupported_wiki(pWikiCode);
			html = pWikiCode;

  		return html;

};
//----End of Method parse Definition

//#################################################################
//# PUBLIC Method: clean_unsupported_wiki()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    clean_unsupported_wiki(pWikiCode) removes double bracket {{...}} Wiki commands.
//#    clean_unsupported_wiki() uses the MediaWiki source code `pWikiCode` from the parameter of the function and returns a HTML string
//#    after removing all {{...}} commands still left in Wiki Code.
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.clean_unsupported_wiki = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: clean_unsupported_wiki(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: clean_unsupported_wiki(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.clean_unsupported_wiki(pWikiCode);
  //-------------------------------------------------------
	pWikiCode = pWikiCode.replace(/\{\{[^}]\}\}/g, '');
  return pWikiCode;

};
//----End of Method clean_unsupported_wiki Definition


//#################################################################
//# PUBLIC Method: clean_source()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    clean_source(pWikiCode) normalizes line breaks in order to have a common base string for all browsers.
//#    clean_source() uses the MediaWiki source code `pWikiCode` from the parameter of the function and returns a HTML string
//#    after removing all CRs.
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.clean_source = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: clean_source(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: clean_source(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.clean_source(pWikiCode);
  //-------------------------------------------------------
	pWikiCode = this.replaceString(pWikiCode,"[[Image:","[[File:");
	pWikiCode = this.replaceString(pWikiCode,"[[Datei:","[[File:");
	pWikiCode = this.replaceString(pWikiCode,"|thumbnail|","|thumb|");
	pWikiCode = this.replaceString(pWikiCode,"|thumbnail]]","|thumb| ]]");
	pWikiCode = this.replaceString(pWikiCode,"|mini|","|thumb|");
	pWikiCode = this.replaceString(pWikiCode,"|mini]]","|thumb| ]]");
	//pWikiCode = pWikiCode.replace(/[|](thumbnail|mini)(\]|\|)/g,"|thumb$2");
  pWikiCode = pWikiCode.replace(/\r/g, '');
  return pWikiCode;

};
//----End of Method clean_source Definition


//#################################################################
//# PUBLIC Method: sections()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Convert all sections in Wiki source code
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.sections = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: sections(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: sections(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.sections(pWikiCode);
  //-------------------------------------------------------

  	  var heading_1_regEx = /^=[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?=/gm;
  		var heading_2_regEx = /^==[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?==/gm;
  		var heading_3_regEx = /^===[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?===/gm;
  		var heading_4_regEx = /^====[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?====/gm;
  		var heading_5_regEx = /^=====[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?=====/gm;
  		var heading_6_regEx = /^======[\s]*?([0-9A-Za-z].[^=\[]*)[\s]*?======/gm;

  		pWikiCode = pWikiCode.replace(heading_6_regEx, '<h6>$1</h6>');
  		pWikiCode = pWikiCode.replace(heading_5_regEx, '<h5>$1</h5>');
  		pWikiCode = pWikiCode.replace(heading_4_regEx, '<h4>$1</h4>');
  		pWikiCode = pWikiCode.replace(heading_3_regEx, '<h3>$1</h3>');
  		pWikiCode = pWikiCode.replace(heading_2_regEx, '<h2>$1</h2>');
  		pWikiCode = pWikiCode.replace(heading_1_regEx, '<h1>$1</h1>');

  		return pWikiCode;

};
//----End of Method sections Definition


//#################################################################
//# PUBLIC Method: horizontalRule()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Convert the  horizontal rules in Wiki source code
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.horizontalRule = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: horizontalRule(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: horizontalRule(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.horizontalRule(pWikiCode);
  //-------------------------------------------------------

  	var horizontalLine = /----/g;

  	pWikiCode = pWikiCode.replace(horizontalLine, '<hr>');

  	return pWikiCode;

};
//----End of Method horizontalRule Definition


//#################################################################
//# PUBLIC Method: inlineElement()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Convert for inline elements of the Wiki source code
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.inlineElement = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: inlineElement(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: inlineElement(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.inlineElement(pWikiCode);
  //-------------------------------------------------------

			//var strongEm = /'''''([(0-9A-Za-z].*)'''''/g;
			var strongEm = /'''''([^']*)'''''([^'])?/g;
			//var strong = /'''([(0-9A-Za-z].*)'''/g;
			var strong = /'''([^']*)'''([^'])?/g;
			//var em = /''([(0-9A-Za-z].*)''/g;
			var em = /''([^']*)''([^'])?/g;

  		pWikiCode = pWikiCode.replace(strongEm, '<strong><em>$1</em></strong>$2');
  		pWikiCode = pWikiCode.replace(strong, '<strong>$1</strong>$2');
  		pWikiCode = pWikiCode.replace(em, '<em>$1</em>$2');

  		return pWikiCode;

};
//----End of Method inlineElement Definition


//#################################################################
//# PUBLIC Method: replaceImages()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Convert for inline elements of the Wiki source code
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.replaceImages = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: replaceImages(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: replaceImages(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.replaceImages(pWikiCode);
  //-------------------------------------------------------

	//var image = /\[\[File:(.[^\]|]*)([|]thumb|frame|mini)?([|]alt=.[^\]|]*)?([|].[^\]|]*)?\]\]/g;
	var image = /\[\[File:(.[^\]]*)\]\]/g;
	var vTitle = "";
	var vAltText = "";
	var vClass = "image";
	var vURL = "";
	var vCaption = "";
  while(tokens = image.exec(pWikiCode)) {
		vTitle = "";
		vAltText = "";
		//[[File:my Image.png|thumb|alt=Alternative Text|<a href="test.html">Test Comment</a> Image Comment]]
		//tokens[0]=my Image.png|thumb|alt=Alternative Text|<a href="test.html">Test Comment</a> Image Comment
		var vLinkSplit = (tokens[0]).split("|");
		vURL = this.getWikiMediaURL(vLinkSplit[0]);
		if (vLinkSplit.length == 1) {
			pWikiCode = pWikiCode.replace(tokens[0], '<figure class="' + vClass + '"><img src="' + vURL + '" class="' + vClass + '></figure>');
		} else {
			if (vLinkSplit.length == 2) {
				vCaption = this.checkCaption(vLinkSplit[1]);
				//pWikiCode = pWikiCode.replace(tokens[0], '<figure class="' + vClass + '"><img src="' + vURL + '" class="' + vClass + '" alt="' + tokens[0] + '"><figcaption>' + tokens[4] + '</figcaption></figure>');
				pWikiCode = pWikiCode.replace(tokens[0], '<figure class="' + vClass + '"><img src="' + vURL + '" class="' + vClass + '><figcaption>' + vCaption + '</figcaption></figure>');
			} else {
				//if vLinkSplit.length > 2 do the following LinkSplit parsing
				for (var i = 1; i < (vLinkSplit.length-1); i++) {
					if ((vLinkSplit[i]).indexOf("alt=") == 0) {
						vAltText =  ' alt="' + vLinkSplit[i] + '" ';
					} else if (vLinkSplit[i] == "thumb") {
						console.log("Background Image Slide for 'thumb'");
					};
				};
				vCaption = this.checkCaption(vLinkSplit[vLinkSplit.length-1]);
				pWikiCode = pWikiCode.replace(tokens[0], '<figure class="' + vClass + '"><img src="' + vURL + '" class="' + vClass + '"' + vAltText + '><figcaption>' + vCaption + '</figcaption></figure>');
			}
		}; // else if vLineSplit.length
	}; // While tokens
  return pWikiCode;

};
//----End of Method replaceImages Definition


//#################################################################
//# PUBLIC Method: checkCaption()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pCaption:String
//# Comment:
//#    Correct a caption removes ]] at end
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.checkCaption = function (pCaption) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: checkCaption(pCaption:String):String");
  // alert("js/wiki2html.js - Call: checkCaption(pCaption:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.checkCaption(pCaption);
  //-------------------------------------------------------
	if (pCaption) {
		pCaption = pCaption.replace(/[\]]+$/g,"");
	};
	console.log("Caption Figure: '"+pCaption+"' ");
  return pCaption;

};
//----End of Method checkCaption Definition


//#################################################################
//# PUBLIC Method: list()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Convert orderd and unorderd list in the Wiki Source code
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.list = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: list(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: list(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.list(pWikiCode);
  //-------------------------------------------------------

  	// unordered
  		var unorderedStartList = /\n\n<li>/gm; //|\r\n\r\n<li>
  		var unorderedListItem = /^\*(.*)/gm;
  		var unorderedEndList = /<\/li>\n(?!<li>)/gm; // |<\/li>\r\n(?!<li>)

  		pWikiCode = pWikiCode.replace(unorderedListItem, '<li>$1</li>');
  		pWikiCode = pWikiCode.replace(unorderedStartList, "\n<ul>\n<li>");
  		pWikiCode = pWikiCode.replace(unorderedEndList, "</li>\n</ul>\n\n");

  		// ordered
  		var orderedStartList = /\n\n<li>/gm; // |\r\n\r\n<li> ///([^<\/li>][>]?[\n])<li>/g;
  		var orderedListItem = /^#[:]?[#]* (.*)/gm;
  		var orderedEndList = /<\/li>\n(?!<li>|<\/ul>)/gm; // |<\/li>\r\n(?!<li>|<\/ul>) ///<\/li>\n(?!<li>)/gm;

  		pWikiCode = pWikiCode.replace(orderedListItem, '<li>$1</li>');
  		pWikiCode = pWikiCode.replace(orderedStartList, "\n<ol>\n<li>");
  		pWikiCode = pWikiCode.replace(orderedEndList, "</li>\n</ol>\n\n");

  		return pWikiCode;

};
//----End of Method list Definition


//#################################################################
//# PUBLIC Method: table()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Convert the table from WikiSource code in HTML
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.table = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: table(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: table(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.table(pWikiCode);
  //-------------------------------------------------------

  		// http://www.mediawiki.org/wiki/Help:Tables
  		var tableStart = /^\{\|/gm;
  		var tableRow = /^\|-/gm;
  		var tableHeader = /^!\s(.*)/gm;
  		var tableData = /^\|\s(.*)/gm;
  		var tableEnd = /^\|\}/gm;

  		pWikiCode = pWikiCode.replace(tableStart, '<table><tr>');
  		pWikiCode = pWikiCode.replace(tableRow, '</tr><tr>');
  		pWikiCode = pWikiCode.replace(tableHeader, '<th>$1</th>');
  		pWikiCode = pWikiCode.replace(tableData, '<td>$1</td>');
  		pWikiCode = pWikiCode.replace(tableEnd, '</tr></table>');

  		return pWikiCode;

};
//----End of Method table Definition


//#################################################################
//# PUBLIC Method: paragraph()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Convert all paragraphs in the Wiki source code
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.paragraph = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: paragraph(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: paragraph(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.paragraph(pWikiCode);
  //-------------------------------------------------------

	//var paragraph = /\n\n([^#\*=].*)/gm; //|\r\n\r\n([^#\*=].*)

	//pWikiCode = pWikiCode.replace(paragraph, "\n<p>$1</p>\n");
	var listbegin = /(\n[^#\*\n]*)(\n[#\*])/gm; //|\r\n\r\n([^#\*=].*)
	pWikiCode = pWikiCode.replace(listbegin, "$1\n\n$2");

	return pWikiCode;

};
//----End of Method paragraph Definition


//#################################################################
//# PUBLIC Method: math2jax()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//#    pFormat:String
//# Comment:
//#    Convert the MATH-tag to a MathJax compatible HTML enviroment dependent of the pFormat of the parameter of math2jax.
//#    pFormat = 'reveal' 'html' are possible formats
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.math2jax = function (pWikiCode,pFormat) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: math2jax(pWikiCode:String,pFormat:String):String");
  // alert("js/wiki2html.js - Call: math2jax(pWikiCode:String,pFormat:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.math2jax(pWikiCode,pFormat);
  //-------------------------------------------------------
	pWikiCode = pWikiCode.replace(/\\R /g,"\\mathbb R ");
	pWikiCode = pWikiCode.replace(/\\R\^/g,"\\mathbb R^");
	pWikiCode = pWikiCode.replace(/\\R</g,"\\mathbb R<");
	pWikiCode = pWikiCode.replace(/\\R\s/g,"\\mathbb R ");
	//pWikiCode =this.replaceString(pWikiCode,'\\','\mathbb R \\');
	return pWikiCode;

};
//----End of Method math2jax Definition


//#################################################################
//# PUBLIC Method: mathsymbols()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//#    pFormat:String
//# Comment:
//#    Convert math symbols for proper handling in MathJax
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.mathsymbols = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: mathsymbols(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call:  mathsymbols(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    pWikiCode = vMyInstance.mathsymbols(pWikiCode);
  //-------------------------------------------------------
	pWikiCode = pWikiCode.replace(/\\R /g,"\\mathbb R ");
	pWikiCode = pWikiCode.replace(/\\R\^/g,"\\mathbb R^");
	pWikiCode = pWikiCode.replace(/\\R</g,"\\mathbb R<");
	pWikiCode = pWikiCode.replace(/\\R\s/g,"\\mathbb R ");
	//pWikiCode =this.replaceString(pWikiCode,'\\','\mathbb R \\');
	return pWikiCode;

};
//----End of Method math2jax Definition


//#################################################################
//# PUBLIC Method: math2reveal()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Convert math symbols for proper handling in MathJax
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.math2reveal = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: math2reveal(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call:  math2reveal(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    pWikiCode = vMyInstance.math2reveal(pWikiCode);
  //-------------------------------------------------------
	//pWikiCode = pWikiCode.replace(/\\R /g,"\\mathbb R ");
	//pWikiCode =this.replaceString(pWikiCode,'\\','\mathbb R \\');
	//-------------------------------------------------------
	// 'Greedy' means match longest possible string.
	// 'Lazy' means match shortest possible string.
	// For example, the greedy h.+l matches 'hell' in 'hello' but the lazy h.+?l
	//-------------------------------------------------------
	// DISPLAY MATH REPLACEMENT
	// DISPLAY MATH <p><span class="math display">\[ f(x) \]</span></p>
	var vMathTag = /\n(:<math[^>]+>)(.+?)(<\/math>)/gi;
	var vMath = "";
  while(tokens = vMathTag.exec(pWikiCode)) {
		vMath = tokens[1];
		pWikiCode = this.replaceString(pWikiCode,tokens[0]+tokens[1]+tokens[2],"<p><span class=\"math display\">\\["+vMath+"\\]</span></p>")
	};
	//-------------------------------------------------------
	// INLINE MATH REPLACEMENT
	// INLINE MATH <span class="math inline">\( f(x) \)</span>
	vMathTag = /(<math[^>]+>)(.+?)(<\/math>)/gi;
	while(tokens = vMathTag.exec(pWikiCode)) {
		vMath = tokens[1];
		pWikiCode = this.replaceString(pWikiCode,tokens[0]+tokens[1]+tokens[2],"<span class=\"math inline\">\\("+vMath+"\\)</span>")
	};
	return pWikiCode;

};
//----End of Method math2reveal() Definition


//#################################################################
//# PUBLIC Method: extractTOC()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Convert the table of contents from Wiki source code into HTML
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.extractTOC = function (pWikiCode,pDepthIncrease) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: extractTOC(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: extractTOC(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.extractTOC(pWikiCode);
  //-------------------------------------------------------
	pDepthIncrease = pDepthIncrease || 0; // Used for WikiBookCreator to increase TOC depth
	if (this.aDocJSON["type"] == "page") {
		var vSections = this.aDocJSON["sections"];
		this.aTOC = [];
		for (var i = 0; i < vSections.length; i++) {
			vSections[i]["depth"] += pDepthIncrease;
			if ((vSections[i]["title"] != "") && (vSections[i]["depth"] >0)) {
				// push a TOC record to TOC array
				this.aTOC.push({"title":vSections[i]["title"],"depth":vSections[i]["depth"]});
			}
		}; // end for
	};
};
//----End of Method extractTOC Definition

//#################################################################
//# PUBLIC Method: generateTOC()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Convert the table of contents from Wiki source code into HTML
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.generateTOC = function () {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: generateTOC(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: generateTOC(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.generateTOC(pWikiCode);
  //-------------------------------------------------------
	var vTOC = this.aTOC;
	for (var i = 0; i < vTOC.length; i++) {
		//if (vTOC[i]["depth"] > vDepth) {
			//vTOC[i]["depth"];
			//vTOC[i]["title"]
		//}
	}
	console.log("Not implemented yet");
  return vOutTOC;

};
//----End of Method generateTOC Definition

//#################################################################
//# PUBLIC Method: insertTOC()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pContent:String
//# Comment:
//#    return the opening environment of the TOC according to the depth
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.insertTOC = function (pWikiCode) {
	if (this.aInsertTOC == true) {
		var vPosH1 = pWikiCode.indexOf("<h1");
		if (vPosH1 >= 0) {
			pWikiCode = pWikiCode.slice(0, vPosH1) + "\n"+ this.generateTOC() +"\n" + pWikiCode.slice(vPosH1);
		};
	};
	return pWikiCode
};

//#################################################################
//# PUBLIC Method: openLevelTOC()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pDepth:Integer
//# Comment:
//#    return the closing environment of the TOC
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.openLevelTOC = function (pDepth) {
	return "<ul>"
};

//#################################################################
//# PUBLIC Method: itemLevelTOCC()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pDepth:integer
//#    pEnum:Array of Integer TOC enumeration
//#    pTitle:String
//# Comment:
//#    return the item of the TOC
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.itemLevelTOC = function (pDepth,pEnum,pTitle) {
	var vSecNr = "";
	var vDot = "";
	for (var i = 1; i < pEnum.length; i++) {
		vSecNr += vDot + pEnum[i];
	};

	return "<li>"+vSecNr+" "+pEnumpTitle+"</li>"
};

//#################################################################
//# PUBLIC Method: closeLevelTOC()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pDepth:Integer
//# Comment:
//#    return the closing environment of the TOC
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.closeLevelTOC = function (pDepth) {
	return "<ul>"
}

//#################################################################
//# PUBLIC Method: convertWiki2Local()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pContent:String
//# Comment:
//#    convertWiki2Local() replaces the MediaWiki internal links to links that work in a local HTML file. The parsed vMediaWiki Links
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.convertWiki2Local = function (pContent) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: convertWiki2Local(pContent:String):String");
  // alert("js/wiki2html.js - Call: convertWiki2Local(pContent:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.convertWiki2Local(pContent);
  //-------------------------------------------------------

		pContent = this.replaceWikiLinks(pContent);
		var vMediaArray = this.parseWiki4Media(pContent);
		this.createMediaParseJSON(vMediaArray);
    this.downloadWikiMedia(vMediaArray);
    pContent = this.convertMediaLink4Wiki(pContent,vMediaArray);
    return pContent;

};
//----End of Method convertWiki2Local Definition


//#################################################################
//# PUBLIC Method: parseWiki4Media()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    parseWiki4Media() the pWikiCode and extract the Media and File links.
//# Return: Array
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.parseWiki4Media = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: parseWiki4Media(pWikiCode:String):Array");
  // alert("js/wiki2html.js - Call: parseWiki4Media(pWikiCode:String):Array");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.parseWiki4Media(pWikiCode);
  //-------------------------------------------------------
		// the following code is performed in clean_source()
		//pWikiCode = this.replaceString(pWikiCode,"[[Image:","[[File:");
		//pWikiCode = this.replaceString(pWikiCode,"[[Datei:","[[File:");
		var vMediaArray = [];
		// (1) find the image specs "my_image.png|330px|thumb|My Caption" in "[[File:my_image.png|330px|thumb|My Caption]]"
    //var vSearch = /\[(File|Datei|Image):([^\|]*)/;
		// (2) find just the filename "my_image.png" in "[[File:my_image.png|330px|thumb|My Caption]]"
	    var vSearch = /\[(?:File|Image|Datei):([^\|\]]+)/g;
	    // \[            # "["
	    // (?:            # non-capturing group
	    //  File|Image|Datei        #   "File" or "Image" or "Datei"
	    // )              # end non-capturing group
	    //:             # ":"
	    //(              # group 1
	    //  [^\|\]]+      #   any character except "|" or "]" at least once
	    // )              # end group 1 - this will be the image's name
	    var vResult;
	    var vCount =0;
	    while (vResult = vSearch.exec(pWikiCode)) {
	      vCount++;
      vMediaArray.push(vResult[1]);
      console.log("Media "+vCount+": '" + vResult[1] + "' found");
    };
    return vMediaArray;

};
//----End of Method parseWiki4Media Definition


//#################################################################
//# PUBLIC Method: createMediaParseJSON()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    vMediaArray:Array
//# Comment:
//#    createMediaParseJSON(vMediaArray:Array) creates in this.aParseJSON["media"]={} a Hash
//#    that maps the local file path 'image/my_image.png' to the replace path
//#    this.aParseJSON["media"]["image/my_image.png"] = "https://commons.wikimedia.org/wiki/my_image.png"
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.createMediaParseJSON = function (pMediaArray) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: createMediaParseJSON(vMediaArray:Array)");
  // alert("js/wiki2html.js - Call: createMediaParseJSON(vMediaArray:Array)");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.createMediaParseJSON(vMediaArray);
  //-------------------------------------------------------

    var vMediaFile = "";
    var vSubDir = "";
    var vLocalID = "";
		var vID = "";
		this.checkParseJSON("media");
		this.aParseJSON["media"] = {};
		for (var i = 0; i < pMediaArray.length; i++) {
      vID = this.convertWikiMedia2ID(pMediaArray[i]);
      //this.aParseJSON[vMediaArray[i]] = vLocalID;
      this.aParseJSON["media"][vID] = this.getImageProps(pMediaArray[i]);
			// Hash contains all properties of the image
			//	"title": "Title of "+vMediaFile,
			//	"file": vMediaFile,
			//	"subdir": vSubDir + "/",
			//	"mediastring": pMediaArray[i],
			//	"url": "url-undefined",
			//	"align":"left"
	  };

};
//----End of Method createMediaParseJSON Definition


//#################################################################
//# PUBLIC Method: checkParseJSON()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pHashID:String
//# Comment:
//#    checkParseJSON() checks if the File Link definitions exists in the pWikiHash["media"]
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.checkParseJSON = function (pHashID) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: checkParseJSON(pHashID:String)");
  // alert("js/wiki2html.js - Call: checkParseJSON(pHashID:String)");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.checkParseJSON(pHashID);
  //-------------------------------------------------------
	if (this.aParseJSON[pHashID]) {
    console.log("ParseJSON['"+pHashID+"']  exists!");
  } else {
    this.aParseJSON[pHashID] = {};
  };
};
//----End of Method checkParseJSON Definition


//#################################################################
//# PUBLIC Method: getMediaSubDir()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pMediaLink:String
//# Comment:
//#    getMediaSubDir(pMediaLink) return for a pMediaLink the appropriate subdirectory.
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.getMediaSubDir = function (pMediaLink) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: getMediaSubDir(pMediaLink:String)");
  // alert("js/wiki2html.js - Call: getMediaSubDir(pMediaLink:String)");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.getMediaSubDir(pMediaLink);
  //-------------------------------------------------------
		var vMediaFile = "";
    var vSubDir = "";
    if (pMediaLink) {
      vSubDir = this.getMediaSubDir(pMediaLink);
      vMediaFile = this.convertWikiMedia2File(pMediaLink);
      vSubDir  = vSubDir + "/" + vMediaFile
    };
		return vSubDir;
};
//----End of Method getMediaSubDir Definition

//#################################################################
//# PUBLIC Method: correct_filename()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pFilename:String
//# Return: String
//# Comment:
//#    convert filename to local filename
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################
Wiki2HTML.prototype.correct_filename = function (pFileName) {
	pFileName = pFileName.replace(/[^\/\\A-Za-z0-9\.]/g,"_");
	pFileName = pFileName.replace(/[_]+/g,"_");
	return pFileName
}


//#################################################################
//# PUBLIC Method: getMediaSubDir()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pFilename:String
//# Return: String
//# Comment:
//#    get Subdirectory according to file extension
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################
Wiki2HTML.prototype.getMediaSubDir = function (pFileName) {
	if (pFileName) {
		this.correct_filename(pFileName)
	};
	return pFileName;
}

//#################################################################
//# PUBLIC Method: convertWikiMedia2File()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pMediaLink:String
//# Comment:
//#    convertWikiMedia2File(pMediaLink) converts the pMediaLink into an URL and returns the media link.
//#    removes blanks at the tail and replaces blanks with and underscore "_"
//#    and non-alpha-numerical characters with an underscore, so that finally the filename works fine on all file systems
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.convertWikiMedia2File = function (pMediaLink) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: convertWikiMedia2File(pMediaLink:String):String");
  // alert("js/wiki2html.js - Call: convertWikiMedia2File(pMediaLink:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.convertWikiMedia2File(pMediaLink);
  //-------------------------------------------------------
	var vMediaFile = "";

	var vPathSplit = pMediaLink.split("/");
	if (vPathSplit.length >0) {
		vMediaFile = vPathSplit[vPathSplit.length-1];
		//vMediaFile = this.correct_filename(vMediaFile);
	} else {
		console.log("ERROR: pMediaLink='"+pMediaLink+"' is not defined");
	};
  return vMediaFile;

};
//----End of Method convertWikiMedia2File Definition


//#################################################################
//# PUBLIC Method: convertWikiMedia2URL()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pMediaLink:String
//# Comment:
//#    convertWikiMedia2URL(pMediaLink) removes blanks at the tail and replaces blanks with and underscore "_"
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.convertWikiMedia2URL = function (pMediaLink) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: convertWikiMedia2URL(pMediaLink:String):String");
  // alert("js/wiki2html.js - Call: convertWikiMedia2URL(pMediaLink:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.convertWikiMedia2URL(pMediaLink);
  //-------------------------------------------------------

    pMediaLink = pMediaLink.replace(/[ \t]+$/,"");
    pMediaLink = pMediaLink.replace(/ /g,"_");
    //console.log("MediaLink: '"+pMediaLink+"'");
    return pMediaLink;

};
//----End of Method convertWikiMedia2URL Definition

//#################################################################
//# PUBLIC Method: convertWikiMedia2ID()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pMediaLink:String
//# Comment:
//#    convertWikiMedia2ID(pMediaLink) removes blanks at the tail and replaces blanks with and underscore "_"
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.convertWikiMedia2ID = function (pMediaLink) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: convertWikiMedia2ID(pMediaLink:String):String");
  // alert("js/wiki2html.js - Call: convertWikiMedia2ID(pMediaLink:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.convertWikiMedia2ID(pMediaLink);
  //-------------------------------------------------------

    pMediaLink = this.convertWikiMedia2URL(pMediaLink);
    pMediaLink = pMediaLink.replace(/[^A-Za-z0-9_]/g,"_");
		pMediaLink = pMediaLink.replace(/[_]+/g,"_");
    //console.log("MediaLink: '"+pMediaLink+"'");
    return pMediaLink;

};
//----End of Method convertWikiMedia2ID Definition

//#################################################################
//# PUBLIC Method: downloadWikiMedia()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pMediaArray:Array
//# Comment:
//#    downloadWikiMedia(pMediaArray:Array) download the images to level-fs
//#    that can be exported as ZIP-file with archiver NPM module
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.downloadWikiMedia = function (pMediaArray) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: downloadWikiMedia(pMediaArray:Array)");
  // alert("js/wiki2html.js - Call: downloadWikiMedia(pMediaArray:Array)");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.downloadWikiMedia(pMediaArray);
  //-------------------------------------------------------

    for (var i = 0; i < pMediaArray.length; i++) {
      this.downloadMediaFile(pMediaArray[i]);
    };

};
//----End of Method downloadWikiMedia Definition


//#################################################################
//# PUBLIC Method: downloadMediaFile()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pMediaLink:String
//# Comment:
//#    downloadMediaFile(pMediaFile) from WikiMedia Commons to the local filesystem emulated with level-fs
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.downloadMediaFile = function (pMediaLink) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: downloadMediaFile(pMediaLink:String)");
  // alert("js/wiki2html.js - Call: downloadMediaFile(pMediaLink:String)");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.downloadMediaFile(pMediaLink);
  //-------------------------------------------------------
	var vSubDir = this.getMediaSubDir(pMediaLink);
	// convertWikiMedia2File "http://www,srv.org/img/my_image.png" to  "my_image.png"
	var vMediaFile = this.convertWikiMedia2File(pMediaLink);
	// add a subdirectory according to file type
	// e.g."my_image.png" to "img/my_image.png"
	// or  "my_music.mp3" to "audio/my_music.mp3"
	// or  "my_video.webm" to "video/my_video.webm"
	var vLocalLink = vSubDir + "/" + vMediaFile;
	var vWGET_CMD = "wget -O " + this.aProjectDir + "/" + vLocalLink + " "+ pMediaLink;
	console.log("CALL WGET: "+vWGET_CMD+" (e.g. in NodeJS)");
	console.log("Download Media File '"+pMediaLink+"' to folder '"+this.aProjectDir+"' not implemented yet");

};
//----End of Method downloadMediaFile Definition


//#################################################################
//# PUBLIC Method: convertMediaLink4Wiki()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pContent:String
//#    pMediaArray:Array
//# Comment:
//#    convertMediaLink4Wiki(pContent,pMediaWiki) convert the link
//#    - [[File:MyFile.png....   with
//#    - [File:https://commons.wikimedia.org/.../MyFile.png
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.convertMediaLink4Wiki = function (pWikiCode,pMediaArray) {
  //----Debugging------------------------------------------
  console.log("js/wiki2html.js - Call: convertMediaLink4Wiki(pWikiCode:String,pMediaArray:Array):String");
  // alert("js/wiki2html.js - Call: convertMediaLink4Wiki(pContent:String,pMediaArray:Array):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.convertMediaLink4Wiki(pContent,pMediaArray);
  //-------------------------------------------------------

    var vReplaceLink;
    var vMediaFile;
    var vSubDir;
		var vLinkHTML;

    pWikiCode = pWikiCode.replace(/\[(File|Image|Datei):/gi,"[File:");

    for (var i = 0; i < pMediaArray.length; i++) {
      vSubDir = this.getMediaSubDir(pMediaArray[i]);
			// convertWikiMedia2File "http://www,srv.org/img/my_image.png" to  "my_image.png"
      vMediaFile = this.convertWikiMedia2File(pMediaArray[i]);
      vReplaceLink = vSubDir + "/" + vMediaFile;

			pWikiCode = this.replaceString(pWikiCode,"File:"+pMediaArray[i],"File:"+vReplaceLink);
    };
    return pWikiCode;

};
//----End of Method convertMediaLink4Wiki Definition


//#################################################################
//# PUBLIC Method: replaceString()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pString:String
//#    pSearch:String
//#    pReplace:String
//# Comment:
//#    replaceString(pString,pSearch,pReplace) replaces globally pSearch by pReplace and returns the modified string
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.replaceString = function (pString,pSearch,pReplace) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: replaceString(pString:String,pSearch:String,pReplace:String):String");
  // alert("js/wiki2html.js - Call: replaceString(pString:String,pSearch:String,pReplace:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.replaceString(pString,pSearch,pReplace);
  //-------------------------------------------------------

  	//alert("cstring.js - replaceString() "+pString);
  	if (!pString) {
  		alert("replaceString()-Call - pString not defined!");
  	} else if (pString != '') {
			//alert("cstring.js - replaceString() "+pString);
			var vHelpString = '';
			var vN = pString.indexOf(pSearch);
			var vReturnString = '';
			while (vN >= 0) {
				if (vN > 0)
					vReturnString += pString.substring(0, vN);
					vReturnString += pReplace;
								if (vN + pSearch.length < pString.length) {
						pString = pString.substring(vN+pSearch.length, pString.length);
				} else {
						pString = ''
				};
				vN = pString.indexOf(pSearch);
			};
			return vReturnString + pString;
		};
};
//----End of Method replaceString Definition


//#################################################################
//# PUBLIC Method: convertWiki2Online()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pContent:String
//# Comment:
//#    convertWiki2Online(pContent) converts the Links and Media in way so that media and links
//#    are referenced to online resource to the server
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.convertWiki2Online = function (pContent) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: convertWiki2Online(pContent:String):String");
  // alert("js/wiki2html.js - Call: convertWiki2Online(pContent:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.convertWiki2Online(pContent);
  //-------------------------------------------------------

    var vMediaArray = this.parseWiki4Media(pContent);
    // this.downloadWikiMedia(vMediaArray);
    pContent = this.convertMediaLink4WikiOnline(pContent,vMediaArray);
    pContent = this.replaceWikiLinks(pContent);
    return pContent;

};
//----End of Method convertWiki2Online Definition


//#################################################################
//# PUBLIC Method: replaceWikiLinks()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Comment for replaceWikiLinks
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.replaceWikiLinks = function (pWikiCode) {
  //----Debugging------------------------------------------
  console.log("js/wiki2html.js - Call: replaceWikiLinks(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: replaceWikiLinks(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.replaceWikiLinks(pWikiCode);
  //-------------------------------------------------------

    var vLinkArray = this.getWikiLinks(pWikiCode);
    var vURL,Title,vLink,vLocalLink;
    var vPipePos = 0;
		var vColonPos = 0;
		this.aMediaArray = [];
    this.checkParseJSON("links");
		var vCount = 0;
    for (var i = 0; i < vLinkArray.length; i++) {
      vLink = vLinkArray[i];
      vPipePos = vLink.indexOf("|");
			if (vPipePos>0) {
				//Wiki-Link 1: '/Birds/|Swarm of Birds' found
				//Wiki-Link 2: 'Water|Water Learning Resource' found
				//Wiki-Link 3: 'w:Water|Water Wikipedia' found
				//Wiki-Link 4: 'v:Water|Water Wikiversity' found
				vURL = vLink.substr(0,vPipePos);
				vTitle = vLink.substr(vPipePos+1,vLink.length);
      } else {
				//Wiki-Link 1: 'Swarm Intelligence' found
				//Wiki-Link 2: 'Water' found
				//Wiki-Link 3: '/Birds/' found
			  vURL = vLink;
        vTitle = vLink.replace(/\//g,"");
      };
			//Wiki-Link 1: 'w:Water|Water Wikipedia' found
			//Wiki-Link 4: 'Wikiversity:Water|Water Wikiversity' found
			vColonPos = vURL.indexOf(":");
			if (vColonPos > 0) {
				//for Wikipedia:Water vLinkSplit[0]= "Wikipedia" -> is a not interwikilink
				// link contains colon ":"
				var vColonPrefix = vURL.substr(0,vColonPos);
				//vColonPrefix w,v,Wikipedia,wikiversity Interwiki Link
				if (vColonPrefix.toLowerCase() == "category") {
					// [[Category:Risk management]]
					console.log("Category with Local Wiki Link '"+vURL+"' found");
					vURL = this.getWikiDisplayURL(vURL);
					vLocalLink = "<a href=\""+vURL+"\" target=\"_blank\">"+vTitle+"</a>";
				  pWikiCode = this.replaceString(pWikiCode,"[["+vLink+"]]",vLocalLink);
				  // for reverse replacement to online Wikipedia or Wikiversity store replacement in ParseJSON
				  this.aParseJSON["links"][vLocalLink] = "["+vLink+"]";
			 	} else if (this.aFilePrefix.hasOwnProperty(vColonPrefix)) {
					console.log("URL: '"+vURL+"' is an image, do not replace by URL text reference.");
					this.aMediaArray.push(vURL);
				} else if (this.aMap.hasOwnProperty(vColonPrefix)) {
					// do something for interwiki links
					console.log("Inter Wiki Link '"+vURL+"' found");
					vURL = this.getWikiDisplayURL(vURL);
		      vLocalLink = "<a href=\""+vURL+"\" target=\"_blank\">"+vTitle+"</a>";
		      pWikiCode = this.replaceString(pWikiCode,"[["+vLink+"]]",vLocalLink);
		      // for reverse replacement to online Wikipedia or Wikiversity store replacement in ParseJSON
		      this.aParseJSON["links"][vLocalLink] = "["+vLink+"]";
				}
			} else {
				console.log("Local Wiki Link '"+vURL+"' found");
				vURL = this.getWikiDisplayURL(vURL);
	      vLocalLink = "<a href=\""+vURL+"\" target=\"_blank\">"+vTitle+"</a>";
	      pWikiCode = this.replaceString(pWikiCode,"[["+vLink+"]]",vLocalLink);
	      // for reverse replacement to online Wikipedia or Wikiversity store replacement in ParseJSON
	      this.aParseJSON["links"][vLocalLink] = "["+vLink+"]";
			};
	  };
		// Replace External Links: [http://www.example.com Example Server]
		var external_links = /\[(https:\/\/|http:\/\/)([a-zA-Z0-9].[^\s]*) ([a-zA-Z0-9].[^\]]*)\]/g;
		pWikiCode = pWikiCode.replace(external_links, '<a href="$1$2" target="_blank">$3</a>');

    return pWikiCode;
};
//----End of Method replaceWikiLinks Definition

//#################################################################
//# PUBLIC Method: getWikiDisplayURL()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    Comment for replaceWikiLinks
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.getWikiDisplayURL= function (pLink) {
	var vLanguage = this.aLanguage;
	var vServer  = this.aLanguage+"."+this.aDomain+".org";
	console.log("getWikiDisplayURL('"+pLink+"') vServer='"+vServer+"'");
	var vMap = this.aMap;
	pLink = pLink || "undefined link";
	pLink =this.replaceString(pLink," ","_");
	var vLinkArr = pLink.split(":");
	// pLink = "Wikipedia:Water"
	var vArticle = pLink;
	// vArticle = "Water"
	if (vLinkArr.length == 2) {
		// Wikipedia:Swarm_intelligence
		// w:Swarm_intelligence
		// /Slime_mold/
		// Category:Risk Management
		if ((vLinkArr[0]).toLowerCase() == "category") {
			// Category:Risk Management
			vArticle = pLink || "undefined_wiki_link";
		} else {
			// w:Swarm_intelligence
			vServer = vLanguage + "." + vMap[vLinkArr[0]]+".org";
			vArticle = vLinkArr[1] || "undefined_wiki_link";
		};

	} else if (vLinkArr.length == 3) {
		// w:en:Swarm_intelligence
		// [[Wikipedia:Category:Risk Management]]
		var vLinkLanguage = this.aLanguage;
		var vLinkDomain = this.aDomain;
		if ((vLinkArr[1]).toLowerCase() == "category") {
			// [[Wikipedia:Category:Risk Management]]
			vArticle = vLinkArr[1]+":"+vLinkArr[2] || "undefined_category";
			// vArticle = "Category:Risk Management"
		} else {
			vArticle = vLinkArr[2] || "undefined_wiki_link";
			// w:en:Swarm_intelligence
			vLinkLanguage = vLinkArr[1];     // vLinkArr[1] = "en"
			vLinkDomain = vMap[vLinkArr[0]]; // map "w" to "wikipedia"
		};
		vServer = vLinkLanguage + "." + vLinkDomain +".org";
	} else if (vArticle.indexOf("/")==0) {
		// Link: "/Slime mold/"
		vArticle = this.aWikiTitle+vArticle;
		// Link: "Swarm intelligence/Slime mold/ "
		vArticle = vArticle.replace(/[\/\s]+$/i,"");
		// Link: "Swarm intelligence/Slime mold"
	};
	vArticle = this.replaceString(vArticle," ","_");
	// Link: "Swarm_intelligence/Slime_mold"
	return "https://"+vServer+"/wiki/"+vArticle;
};

//#################################################################
//# PUBLIC Method: getWikiMediaURL()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pFileName:String
//# Comment:
//#
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################
Wiki2HTML.prototype.getWikiMediaURL = function(pFileName) {
	pFileName = pFileName.replace(/^\[\[(File|Image|Datei):/gi,"");
	pFileName = pFileName.replace(/[\]]+$/gi,"");
	pFileName = pFileName.replace(/\s/g,"_");
	return this.aMediaPath+pFileName;
};

//#################################################################
//# PUBLIC Method: getWikiDisplayURL()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pFilename:String
//# Comment:
//#
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.getMediaFileType = function (pFileName) {
	var vType = "none";
	if ( /\.(jpe?g|png|gif|bmp)$/i.test(pFileName) ) {
		vType = "img";
	};
	if ( /\.(svg)$/i.test(pFileName) ) {
		vType = "svg";
	};
	if ( /\.(mp4|webm|mov|avi|mpe?g|ogv)$/i.test(pFileName) ) {
		vType = "video";
	};
	if ( /\.(mp3|wav|ogg|mid)$/i.test(pFileName) ) {
		vType = "audio";
	};
	return vType
}

//#################################################################
//# PUBLIC Method: getWikiLinks()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pWikiCode:String
//# Comment:
//#    getWikiLinks(pWikiCode) extract Double-Bracket [[...]] link in pWikiCode
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.getWikiLinks = function (pWikiCode) {
  //----Debugging------------------------------------------
  // console.log("js/wiki2html.js - Call: getWikiLinks(pWikiCode:String):String");
  // alert("js/wiki2html.js - Call: getWikiLinks(pWikiCode:String):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.getWikiLinks(pWikiCode);
  //-------------------------------------------------------

    // Wiki Links are open with ""
    var vLinkArray = [];
    //var vSearch = /\[(File|Datei|Image):([^\|]*)/;
    var vSearch = /\[\[([^\[\]]+)\]\]/g;
    // \[\[         # "[["
    //(             # group 1
    //  [^\[\]]+    #   any character except "[" and "]" ":" at least once
    // )            # end group 1 - this will be the image's name
    // \]\]         # "]]"
    var vResult;
    var vCount =0;
		var vLink = "";
		var vLinkSplit;
		var vType = "";
		while (vResult = vSearch.exec(pWikiCode)) {
      vCount++;
			vLinkSplit = vResult[1].split(":");
			if (vLinkSplit.length == 1) {
				// link contains no colon ":"
				vLinkArray.push(vResult[1]);
			} else if (this.aMap.hasOwnProperty(vLinkSplit[0])) {
				//for Wikipedia:Water vLinkSplit[0]= "Wikipedia" -> is a wikilink
				vLinkArray.push(vResult[1]);
				console.log("Wiki-Link ('"+vLinkSplit[0]+"') "+vCount+": '" + vResult[1] + "' found");
			} else if ((vLinkSplit[0]).toLowerCase() == "category") {
				//for Wikipedia:Water vLinkSplit[0]= "Wikipedia" -> is a wikilink
				vLinkArray.push(vResult[1]);
				console.log("Wiki-Category-Link ('"+vLinkSplit[0]+"') "+vCount+": '" + vResult[1] + "' found");
			} else {
				console.log("Wiki-File "+vCount+": '" + vResult[1] + "' found");
				//for File:Water.png vLinkSplit[0]= "File" not an own property of aMap -> not a Link
			};
    };
    return vLinkArray;

};
//----End of Method getWikiLinks Definition


//#################################################################
//# PUBLIC Method: convertMediaLink4WikiOnline()
//#    used in Class: Wiki2HTML
//# Parameter:
//#    pContent:String
//#    pMediaArray:Array
//# Comment:
//#    convertMediaLink4WikiOnline(pWikiCode,pMediaArray) converts Media Links to WikiMedia Commons
//#    to a remote link for local files
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2018/01/21 17:17:18
//#################################################################

Wiki2HTML.prototype.convertMediaLink4WikiOnline = function (pWikiCode,pMediaArray) {
  //----Debugging------------------------------------------
  console.log("js/wiki2html.js - Call: convertMediaLink4WikiOnline(pContent:String,pMediaArray:Array):String");
  // alert("js/wiki2html.js - Call: convertMediaLink4WikiOnline(pContent:String,pMediaArray:Array):String");
  //----Create Object/Instance of Wiki2HTML----
  //    var vMyInstance = new Wiki2HTML();
  //    vMyInstance.convertMediaLink4WikiOnline(pContent,pMediaArray);
  //-------------------------------------------------------

    var vReplaceLink;
    var vMediaFile;
    var vPathArray;

		// "File:" "Image:" "Datei:" will be replaced "File:" by clean_source()
		//pWikiCode = pWikiCode.replace(/\[\[(File|Image|Datei):/gi,"[[File:");

		//var vSearch = /\[(File|Datei|Image):([^\|]*)/;
    var vSearch = /(\[\[File:[^\]]+\]\])/g;
		// (              # begin capturing group
    // \[\[           # "[["
    //  File:         #   "File:"
		//  [^\]]+        #   any character except  "]" at least once
		// \]\]           # "]]"
    // )              # end capturing group
    var vResult;
    var vCount =0;
		var vReplaceArray = [];
    while (vResult = vSearch.exec(pWikiCode)) {
      vCount++;
      console.log("Media "+vCount+": '" + vResult[1] + "' replace into IMG-tag");
			vReplaceArray.push(vResult[1]);
    };
		if (vReplaceArray.length == pMediaArray.length) {
			for (var i = 0; i < pMediaArray.length; i++) {
				//vPathArray = (pMediaArray[i]).split("/");
				//vMediaFile = vPathArray[vPathArray.length-1];
				vMediaFile = pMediaArray[i];
				var vFileSplit = vMediaFile.split("|");
				vMediaFile = vFileSplit[0];
				var vWidth = this.aDefaultImageWidth;
				var vCenterImage = false;
				for (var i = 1; i < vFileSplit.length; i++) {
					if ((vFileSplit[i]).match(/^[0-9]+px$/)) {
						//vFileSplit[i] = "350px"
						vWidth = (vFileSplit[i]).replace(/[^0-9]/g,"");
						//vFileSplit[i] = "350"
					} else if (vFileSplit[i] == "center") {
						vCenterImage = true;
					};
				};
				var vCaption = "";
				if (vFileSplit.length >1) {
					//[[File:My File.png|center|400px|My Caption "Title"]]
					vCaption = this.checkCaption(vFileSplit[vFileSplit.length-1]);
					// vCaption ="My Caption \"Title\""
					vCaption =this.replaceString(vCaption,"\"","'");
					// vCaption ="My Caption 'Title'
				};
				// ReplaceLink created as image-tag
				vReplaceLink = "<img src=\""+this.getWikiMediaURL(vMediaFile) + "\" width=\""+vWidth+"\" ";
				if (vCaption != "") {
					vReplaceLink += " alt=\""+vCaption+"\" title=\""+vCaption+"\"";
				};
				if (vCenterImage == true) {
					vReplaceLink += " align=\"middle\" ";
				};
				vReplaceLink += ">";
				// add figcaption if aAddFigCaption as attribute is true
				if (this.aAddFigCaption == true) {
					vCaption = this.checkCaption(vCaption);
					vReplaceLink += "\n<figcaption>"+vCaption+"</figcaption>";
				};
				// wrap image into <figure>-tag
				vReplaceLink = "<figure>\n   "+vReplaceLink+"</figure>";
				//pWikiCode = this.replaceString(pWikiCode,vReplaceArray[i],vReplaceLink);
			};
		} else {
			console.log("ERROR: Replace Link for MediaLinks do not have the same length");
		};
	  return pWikiCode;

};
//----End of Method convertMediaLink4WikiOnline Definition

Wiki2HTML.prototype.getImageProps = function (pMediaLink) {
	var vImgProps = {
		"title": "",
		"file": "",
		"url": "",
		"mediastring": pMediaLink,
		"subdir": "images/",
		"width":this.aDefaultImageWidth,
		"align":"left",
		"thumb":true,
		"frame":false
	};

	var vFileSplit = pMediaLink.split("|");
	vMediaFile = vFileSplit[0];
	var vWidth = this.aDefaultImageWidth;
	var vCenterImage = false;
	for (var i = 1; i < vFileSplit.length; i++) {
		if ((vFileSplit[i]).match(/^[0-9]+px$/)) {
			//vFileSplit[i] = "350px"
			vImgProps["width"] = (vFileSplit[i]).replace(/[^0-9]/g,"");
			//vFileSplit[i] = "350"
		} else if (vFileSplit[i] == "center") {
			vImgProps["align"] = "center";
		} else if (vFileSplit[i] == "left") {
			vImgProps["align"] = "left";
		} else if (vFileSplit[i] == "right") {
			vImgProps["align"] = "right";
		} else if ((vFileSplit[i] == "thumb") && (vFileSplit[i] == "thumbnail") && (vFileSplit[i] == "mini")) {
			vImgProps["thumb"] = true;
		};
	};
	// Determine Caption of Image/Figure
	if (vFileSplit.length >1) {
		//[[File:My File.png|center|400px|My Caption "Title"]]
		vImgProps["title"] = vFileSplit[vFileSplit.length-1];
		// Caption ="My Caption \"Title\""
		vImgProps["title"] = this.replaceString(vImgProps["caption"],"\"","'");
		// Caption ="My Caption 'Title' ""
	};
	// Determine Media URL from WikiMedia Commons with this.aDocJSON["images"] Array
	console.log("IMAGE PROPS: Find '"+pMediaLink+"'");
	//getImageIndexDocJSON()
	return vImgProps;
}

//-------------------------------------------
//---End Definition of Class-----------------
// JS Class: Wiki2HTML
//-------------------------------------------

