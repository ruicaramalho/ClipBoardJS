/**
* ClipboardJs | Uses JQuery
* 
* @param {options} options
*/
function ClipBoard(options) {
    if (options == undefined) options = {};
    this.Values = null;

    _loading = () => {
        console.log("ClipBoard: loading please wait");
    }

    // default option values
    let _defopt = {
        eventObj: window, //By default is window but it can be an element like <div>
        single: true, // get only the first file
        getBase64: false, // also return file in base64 data
        loadingFunction: _loading
    };

    this.Options = $.extend({}, _defopt, options);

    // control async calls
    let promises = [];

    // default PasteEvent CallBack
    _callBack = () => {
        console.log("ClipBoard: Define callBack function for 'PastEvent'");
    }

    this.PastEvent = callBack => {
        if (typeof callBack != "function") {
            console.log("ClipBoard: callBack not a function");
            return;
        }
        _callBack = callBack;
        promises = [];
        this.Options.eventObj.addEventListener("paste", e => callRefresh(e));
    }

    callRefresh = (event) => {
        this.Options.loadingFunction();
        Getitems(event);
        Promise.all(promises).then(callReturn);
    }

    callReturn = () => {
        console.log(`ClipBoard: paste finished. Calling '${_callBack.name}'...`);
        _callBack(this.Values);
    }

    Getitems = (event) => {

        console.log("ClipBoard: getting clipboard items");
        let items = event.clipboardData.items;

        if (!items.length) {
            console.warn("ClipBoard: No files on ClipBoard")
            return;
        }

        //clear previous Blobs in browser memory
        if (this.Values !== null) {
            if (this.Options.single = false) {
                this.Values.forEach(o => {
                    if (typeof o.BlobSrc == 'string')
                        URL.revokeObjectURL(o.BlobSrc)
                });
                this.Values = [];
            }
            else {
                if (typeof this.Values.BlobSrc == 'string')
                    URL.revokeObjectURL(this.Values.BlobSrc)
            }
        }

        for (var i = 0; i < items.length; i++) {
            let _retObj = {};
            let item = items[i];

            _retObj.Type = item.type;

            // is File
            if (item.kind == 'file') {
                let blob = item.getAsFile();
                _retObj.Name = blob.name;
                _retObj.Size = blob.size;
                _retObj.Date = new Date(blob.lastModified);

                let URLObj = window.URL || window.webkitURL;

                promises.push(
                    new Promise(resolve => {
                        // link to blob | https://javascript.info/blob
                        resolve(_retObj.BlobSrc = URLObj.createObjectURL(blob));
                    })
                );

                if (this.Options.getBase64 == true) {
                    console.log("ClipBoard: getting base64 string...");
                    promises.push(
                        new Promise(resolve => {
                            let reader = new FileReader();
                            // converts the blob to base64 and calls onload
                            reader.readAsDataURL(blob);
                            reader.onload = function () {
                                resolve(_retObj.Base64Data = reader.result);
                            }
                        })
                    );
                }

            }
            // is string
            else {
                promises.push(
                    new Promise(resolve => {
                        item.getAsString((s) => {
                            resolve(_retObj.Text = s);
                        })
                    })
                );
            }
            if (this.Options.single = false)
                this.Values.push(_retObj);
            else {
                this.Values = _retObj;
                break;
            }
        }
    }
}
