/*
 * Column generator and creating categories by alphabetical order and bold every new alphabet letter
 *
 * @author Khurtina Ekaterina
 *
 * */

var Columns = (function() {

  'use strict';

  return function (options) {
    if (!options) {
      throw new Error();
    }

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
      throw new Error("wrong parameter");
    }

    if (options.appendTo) {
      // validate appendTo: DOM Object
      if (typeof  options.appendTo == 'string') {
        appendTo = $(options.appendTo);
      } else {
        throw new Error();
      }
    } else {
      // when the script calls
    }

    if (options.items) {
      // validate items:Array
      if (isArray(options.items) || typeof options.items == 'object') {
        var items = options.items;
      } else {
        throw new Error();
      }
    } else {
      throw new Error();
    }

    if (options.itemTag && isArray(options.items)) {
      //validate itemTag:String
      if (typeof options.itemTag == "string") {
        itemTag = options.itemTag;
      } else {
        throw new Error();
      }
    }

    if (options.columnTag && isArray(options.items)) {
      //validate columnTag:String
      if (typeof options.columnTag == "string") {
        columnTag = options.columnTag;
      } else {
        throw new Error();
      }
    }

    if (options.itemClass) {
      //validate itemClass: String
      if (typeof options.itemClass == "string") {
        itemClass = options.itemClass;
      } else {
        return new Error();
      }
    }

    if (options.columnClass) {
      // validate columnClass: String
      if (typeof options.columnClass == "string") {
        columnClass = options.columnClass;
      } else {
        return new Error();
      }
    }

    if (options.startIndex) {
      //validate startIndex: Number
      if (typeof options.startIndex == "number") {
        startIndex = options.startIndex;
      } else {
        return new Error();
      }
    }


    if (options.maxItems) {
      //validate maxItems: Number
      if (typeof options.maxItems == "number") {
        maxItems = options.maxItems;
      } else {
        return new Error();
      }
    }

    if (options.maxCols) {
      // validate maxCols: Number
      if (typeof options.maxCols == "number") {
        maxCols = options.maxCols;
      } else {
        return new Error();
      }
    }

    if (!options.maxCols && !options.maxItems) {
      return new Error("maxCols and (or) maxItems must be defined");
    }


    // если элемент массива строка, то оборачиваем сами и учитываем columnTag (ul) и itemTag(li)
    // если элемент массива объект то оборачивать не надо и колонки columnTag(ul или заданный)

    var documentFragment = document.createDocumentFragment();
    for (var i = startIndex; i < items.length; ) {
      var imaxCols = maxCols, imaxItems = maxItems;

      if (maxItems && !maxCols) {
        imaxCols = Math.ceil(items.length / maxItems);
      }
      else if (!maxItems && maxCols) {
        imaxItems = Math.ceil(items.length / maxCols);
      }

      for (var j = 0; j < imaxCols; j++) {
        var $column = document.createElement(columnTag);
        $column.setAttribute("class", columnClass);

        for (var k = 0; k < imaxItems; k++) {
          if (!items[i]) break;
          else {

            var $columnItem;

            if (typeof items[0] == "string") {
              // оборачиваем в теги и вешаем классы
              $columnItem = document.createElement(itemTag);
              $columnItem.setAttribute("class", itemClass);
              $columnItem.textContent = items[i];
            } else if (typeof items[0] == 'object') {
              // оборачивать не надо а просто добавить в колонку
              $columnItem = items[i];
            }
            columnItems.push($columnItem);


            if (options.beforeItemAdd && typeof options.beforeItemAdd == 'function') {
              options.beforeItemAdd($columnItem);
            }

            $column.appendChild($columnItem);
            documentFragment.appendChild($column);
            i++;
          }
        }
      }
    }

    if (options.onFinish && typeof options.onFinish == 'function') {
      options.onFinish(documentFragment.cloneNode(true), columnItems);
    }


    if (options.appendTo && typeof options.appendTo == 'string') {
      var tmp = documentFragment.cloneNode(true);
      var type = options.appendTo.substring(0, 1);
      if (type == ".") {
        document.getElementsByClassName(options.appendTo.substring(1)).item(0).appendChild(tmp);
      }
      else if (type == '#') {
        document.getElementById(options.appendTo.substring(1)).item(0).appendChild(tmp);
      }
      else {
        document.getElementsByTagName(options.appendTo).item(0).appendChild(tmp);
      }
    }

    else {
      return documentFragment;
    }
  };

})();
