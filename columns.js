/**
 * Column generator and creating categories by alphabetical order and bold every new alphabet letter
 * @module Column generator
 * @author Katy Khurtina
 * @since Jan, 2014
 * @version 1
 */

var Columns;

if (!Columns) Columns = (function() {

  'use strict';

  return function (options) {
    if (!options) {
      throw new Error("options must be defined");
    }

    var items;
    var appendTo = "";
    var itemTag = "li";
    var columnTag = "ul";
    var itemClass = "";
    var columnClass = "";
    var startIndex = 0;
    var maxItems = 0;
    var maxCols = 0;
    var columnItems = [];

    function isArray(obj) {
      if (Array.isArray) {
        return Array.isArray(obj);
      } else {
        return typeof(obj) == 'object' && Object.prototype.toString().call(obj) == '[object Array]';
      }
    }


    // validate options
    if (typeof(options) != 'object') {
      throw new Error("options is not an object");
    }

    if (options.appendTo) {
      // validate appendTo: DOM Object
      if (typeof  options.appendTo == 'string') {
        appendTo = options.appendTo;
      } else {
        throw new Error("appendTo is not a string");
      }
    }

    if (options.items) {
      // validate items:Array
      if (isArray(options.items) || typeof options.items == 'object') {
        items = options.items;
      } else {
        throw new Error("items must be object or array");
      }
    } else throw new Error("items must be defined");


    if (options.itemTag && isArray(options.items)) {
      //validate itemTag:String
      if (typeof options.itemTag == "string") {
        itemTag = options.itemTag;
      } else {
        throw new Error("itemTag is not a string");
      }
    }

    if (options.columnTag && isArray(options.items)) {
      //validate columnTag:String
      if (typeof options.columnTag == "string") {
        columnTag = options.columnTag;
      } else {
        throw new Error("columnTag is not a string");
      }
    }

    if (options.itemClass) {
      //validate itemClass: String
      if (typeof options.itemClass == "string") {
        itemClass = options.itemClass;
      } else {
        return new Error("itemClass must be a string");
      }
    }

    if (options.columnClass) {
      // validate columnClass: String
      if (typeof options.columnClass == "string") {
        columnClass = options.columnClass;
      } else {
        return new Error("columnClass must be a string");
      }
    }

    if (options.startIndex) {
      //validate startIndex: Number
      if (typeof options.startIndex == "number") {
        startIndex = options.startIndex;
      } else {
        return new Error("startIndex must be a number");
      }
    }

    if (options.maxItems) {
      //validate maxItems: Number
      if (typeof options.maxItems == "number") {
        maxItems = options.maxItems;
      } else {
        return new Error("maxItems must be a number");
      }
    }

    if (options.maxCols) {
      // validate maxCols: Number
      if (typeof options.maxCols == "number") {
        maxCols = options.maxCols;
      } else {
        return new Error("maxCols must be a number");
      }
    }

    if (!options.maxCols && !options.maxItems) {
      return new Error("maxCols and (or) maxItems must be defined");
    }

    var documentFragment = document.createDocumentFragment();

    var imaxCols = maxCols, imaxItems = maxItems;

    if (maxItems && !maxCols) {
      imaxCols = Math.ceil(items.length / maxItems);
    }
    else if (!maxItems && maxCols) {
      imaxItems = Math.ceil(items.length / maxCols);
    }

    var item = startIndex;
    var col, row;
    for (col = 0; col < imaxCols; col++) {
      var $column = document.createElement(columnTag);
      if (columnClass != "") $column.setAttribute("class", columnClass);

      for (row = 0; row < imaxItems; row++) {
        var $columnItem;
        if (!items[item]) break;
        else {
          if (typeof items[0] == "string") {
            $columnItem = document.createElement(itemTag);
            if (itemClass != "") $columnItem.setAttribute("class", itemClass);
            $columnItem.textContent = items[item];
          } else if (typeof items[0] == 'object') {
            $columnItem = items[item];
          }
          columnItems.push($columnItem);

          if (options.beforeItemAdd && typeof options.beforeItemAdd == 'function') {
            options.beforeItemAdd($columnItem);
          }

          $column.appendChild($columnItem);
          documentFragment.appendChild($column);
          item++;
        }
      }
    }

    if (options.onFinish && typeof options.onFinish == 'function') {
      options.onFinish(documentFragment.cloneNode(true), columnItems);
    }


    if (options.appendTo && typeof options.appendTo == 'string') {
      var type = options.appendTo.substring(0, 1);
      if (type == ".") {
        document.getElementsByClassName(options.appendTo.substring(1)).item(0).appendChild(documentFragment);
      }
      else if (type == '#') {
        document.getElementById(options.appendTo.substring(1)).item(0).appendChild(documentFragment);
      }
      else {
        document.getElementsByTagName(options.appendTo).item(0).appendChild(documentFragment);
      }
    }

    else {
      return documentFragment;
    }
  };

})();