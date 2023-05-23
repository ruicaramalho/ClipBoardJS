/**
* Paste or Copy to clipboard
* 
* @param {options} options
*/
function ClipBoard(options) {
    //const clp_ele_img = document.querySelector(elemID);
    if (options == undefined)
        options = {};

    let _defopt = {
        eventObj: window,
        single: true,
        getBase64: false
    };
    this.Values = null;

    _opt = $.extend({}, options, _defopt);

    this.Options = _opt;

    //_opt.eventObj.addEventListener("paste", e => GetPastedFiles(e))

    let promises = [];

    _callBack = () => {
        console.log("ClipBoard: Define callBack function")
    }

    this.PastEvent = callBack => {
        if (typeof callBack != "function") {
            console.log("ClipBoard: callBack not a function");
            return;
        }
        _callBack = callBack;

        promises = [];
        _opt.eventObj.addEventListener("paste", e => callRefresh(e));
    }

    this.ToBase64 = () => {

    }


    callRefresh = (event) => {
        Getitems(event);
        Promise.all(promises).then(callReturn);

    }

    callReturn = () => {
        console.log(`ClipBoard: paste finished calling '${_callBack.name}'`);
        _callBack(this.Values);
    }

    Getitems = (event) => {

        console.log("ClipBoard: getting clipboard items");




        let items = event.clipboardData.items;



        if (!items.length) {
            console.warn("ClipBoard: No files on ClipBoard")
            return;
        }

        //clear previous Blobs in memory
        if (this.Values !== null) {
            if (_opt.single = false) {
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



            _retObj.FileType = item.type;
            if (item.kind == 'file') {
                let blob = item.getAsFile();
                _retObj.Name = blob.name;
                _retObj.Size = blob.size;
                _retObj.Date = new Date(blob.lastModified);

                //console.log(blob);

                let URLObj = window.URL || window.webkitURL;

                promises.push(
                    new Promise(resolve => {

                        // link to blob
                        // https://javascript.info/blob
                        resolve(_retObj.BlobSrc = URLObj.createObjectURL(blob));
                    })
                );

                if (_opt.getBase64) {
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
            else {
                promises.push(
                    new Promise(resolve => {
                        item.getAsString((s) => {
                            resolve(_retObj.Text = s);
                        })
                    })
                );
            }
            if (_opt.single = false)
                this.Values.push(_retObj);
            else {
                this.Values = _retObj;
                break;
            }

        };
    }
}
