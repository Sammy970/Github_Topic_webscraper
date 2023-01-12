const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");


// const url = "https://github.com/topics/windows";

function getIssuesPageHtml(url, topic, repoName) {

    request(url, cb);
    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else {
            // console.log(html);
            getIssues(html);
        }
    }

    function getIssues(html) {
        let $ = cheerio.load(html);
        let issuesElemArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        console.log(issuesElemArr.length);
        let arr = [];
        for (let i = 0; i < issuesElemArr.length; i++) {
            let link = $(issuesElemArr[i]).attr("href");
            // console.log(link);
            // arr.push(link);
            // console.log(arr);
            // let fullLink = `https://www.github.com${link}`;
            // console.log(fullLink);
            arr.push(link);

        }
        // console.log(topic, "         ", arr);

        let folderPath = path.join(__dirname, topic);
        dirCreator(folderPath);
        let filePath = path.join(folderPath, repoName + ".pdf");

        let text = JSON.stringify(arr);
        let pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();

        // fs.writeFileSync(filePath,);

    }

    function dirCreator(folderPath) {
        if (fs.existsSync(folderPath) == false) {
            fs.mkdirSync(folderPath);
        }

    }

}

module.exports = getIssuesPageHtml;