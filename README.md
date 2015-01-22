## column_generator

Column generator creates columns with selected items.

### Parameters:
- **items [string|object]** - selected items
- **maxItems [number]** (optional) - maximum amount of items in one column
- **maxCols [number]** (optional) - maximum columns. Either **maxItems** or **maxCols** or both must be defined.
- **startIndex [number]** (optional) - start at 0 by default or from defined index (actual if **items** is an array of strings).
- **appendTo [string]** (optional) - target element. Script will append generated columns to it. If not defined, script will return DocumentFragment.
- **itemClass[string]** (optional) - name of css class that appends to element of each column.
- **itemTag[string]** (optional) - name of tag that wrapps each element of column (actual if **items** is an array of strings). Equals "li" by default.
- **columnTag[string]** (optional) - name of tag that wraps each column. Equals "ul" by default.
- **columnClass[string]** (optional) - name of css class that adds to each column.
- **beforeItemAdd[function]** (optional) - callback function that runs before each element of column will added to DocumentFragment (may need for some customization each element of column separately and don't need to wait when all elements will added). Callback arguments: columnItem [object] HTMLElement
- **onFinish[function]** (optional) - callback function that runs when all elements of columns and columns were added to DocumentFragment. Callback arguments: dFragment [object](cloned DocumentFragment), columnItems [object] HTMLElement

### Usage example

twig + js

```twig
...
<div class='badge'></div>
{% set elements = ["apple", "orange", "cinnamon", "grape", 
"apricot", "peach", "cranberry", "lemon", "pineapple"] %}
{% for element in elements %}
   <div class="fruit"> {{ element }} </div>
{% endfor %}
```

``` JS
var options = {
   appendTo: ".badge",
   items: $(".fruit"),
   maxItems: 2,
   columnTag: "div",
   beforeItemAdd: function (item) {
       var text = $(item).text();
       $(item).addClass('before_added');
   },
   onFinish: function (columns, items) {
       // sorting, all next alphabetical letter will be bold and uppercase
       var textItems = [];
       for (var i = 0; i < items.length; i++) {
           textItems.push($(items).eq(i).text().replace(/[^A-Za-zА-Яа-я0-9]/g, ""));
       }
       textItems.sort();

       console.log(textItems);

       $(items).eq(0).html("<strong>" +
       textItems[0].substring(0, 1).toUpperCase() + "</strong>" + textItems[0].substring(1));
       for (var i = 1; i < items.length; i++) {
           $(items).eq(i).text(textItems[i]);
           var current = textItems[i];
           var next = textItems[i - 1];

           if (current.substring(0, 1) != next.substring(0, 1)) {
               $(items).eq(i).html("<strong>" + current.substring(0, 1).toUpperCase()
               + "</strong>" + current.substring(1));
           }
       }
   }
};

Columns(options);
```

The result will be

```html
<div class="badge">
   <ul>
      <div class="fruit before_added"><strong>A</strong>pple</div>
      <div class="fruit before_added">apricot</div>
   </ul>
   <ul>
      <div class="fruit before_added"><strong>C</strong>innamon</div>
      <div class="fruit before_added">cranberry</div>
   </ul>
   <ul>
      <div class="fruit before_added"><strong>G</strong>rape</div>
      <div class="fruit before_added"><strong>L</strong>emon</div>
   </ul>
   <ul>
      <div class="fruit before_added"><strong>O</strong>range</div>
      <div class="fruit before_added"><strong>P</strong>each</div>
   </ul>
   <ul>
      <div class="fruit before_added">pineapple</div>
   </ul>
</div>
```
