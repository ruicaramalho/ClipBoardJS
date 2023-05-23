# ClipBoardJS
Easy access Clipboard using Javascript

# How to use

Declare a ClipBoard object with the options you wan't.


Assign a ==PasteEvent== `function` so that when you paste in the browser you receive an object with the files on clipboard.

## Example

~~~~js

let clipb = new ClipBoard();
clipb.PastEvent(SeePast);

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
        /*
        new_window.onload = () => {
            newWindow.location = clipVals.BlobSrc;
        };
        */
    }
    
}
~~~~
