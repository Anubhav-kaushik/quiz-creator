function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

function getRndInteger(min, max) {
    // returns a random number between min (included) and max (excluded)
    return Math.floor(Math.random() * (max - min)) + min;
}

function downloadObjectAsJson(exportObj, exportName) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function convertToJson(object) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(object));

    return dataStr;
}

function copyToClipboard(data) {
    navigator.clipboard.writeText(data).then(async function () {
        console.log('Copying to clipboard was successful!');
        console.log(data);
    },
    function (err) {
        console.error('Could not copy text: ', err);
    });
}