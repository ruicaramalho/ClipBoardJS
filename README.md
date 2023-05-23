# ClipBoardJS
Easy access Clipboard using Javascript. When using paste `ctrl+v` get clipboard info:

- Base24 data string (if option `getBase64` is true) (*1)
- Blob URL (use for: downlad button, image src, etc) (*1)
- Type (usualy is the mime type) (*1)
- Name (*1)
- File size (in bytes) (*1)
- Modified Date (*1)
- Text (*2)

(*1) - Only if not a string
(*2) - Only for strings

---

# How to use

Declare a `ClipBoard(<options>)` object with the options you wan't.

Assign a **PasteEvent** `function` so that when you paste in the browser you receive an object with the files on clipboard.

## Example

~~~~js
// This example uses JQuery

let clipb = new ClipBoard();
clipb.PastEvent(SeePast);

// This function can be anything, this is an example
function SeePast(clipVals) {
    console.log(clipVals);

    if (clipVals.Type.includes('image')) {
        let img = $('<img>');
        img.prop("src", clipVals.BlobSrc);
        $('#clipresult').html(img);
    }
    else if (clipVals.Type.includes('text')){
        console.log("é texto: " + clipVals.Text);
        $('#clipresult').html(clipVals.Text);
    }
    else {
        new_window = window.open(clipVals.BlobSrc);
    }
    
}
~~~~

## Entry Options

Default values:
~~~~js
{ eventObj: window, single: true,  getBase64: false }
~~~~

* eventObj - by default if you paste anywhere in the browser it will run, but you can send anotther obect for the paste event.
* single - if true only get's the first item in clipboard.
* getBase64 - if true also return the file base24 string in `Base64Data` property.

## Return

Depending on option value `single` either returns an object or array of objects

**return object examples**

~~~~js
{
    "Type": "image/png",
    "Name": "BlueTiger208x208.png",
    "Size": 132228,
    "Date": "2023-02-21T17:25:04.972Z",
    "BlobSrc": "blob:https://my.site.pt/bb67559a-6fd1-4b16-bd55-c5f6bb353179"
}
~~~~

~~~~js
{
    "Type": "text/plain",
    "Text": "não existe ou não é publico"
}
~~~~
