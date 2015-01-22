## column_generator

Column generator creates columns with selected items.

### Parameters:
- *items [string|object]* -selected items
- *maxItems [number]* - maximum item amount in one column
- *maxCols [number]* - maximum columns
- *startIndex [number]* - start at 0 by default or from defined


### Usage example

``` JS
var options = {
   appendTo: $(".badge"),
   items: $(".class_columns"),
   maxItems: 7,
   startIndex: 2,
   columnTag: "div"
};

Columns(options);
```
