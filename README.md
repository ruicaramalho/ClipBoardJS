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

    if (clipVals.FileType.includes('image')) {
        let img = $('<img>');
        img.prop("src", clipVals.BlobSrc);
        $('#clipresult').html(img);
    }
    else if (clipVals.FileType.includes('text')){
        console.log("é texto: " + clipVals.Text);
        $('#clipresult').html(clipVals.Text);
    }
    else {
        new_window = window.open(clipVals.BlobSrc);
    }
    
}
~~~~

## Options

~~~~json
{ eventObj: window, single: true,  getBase64: false };
~~~~
