const url = "https://github.com/topics";
const cheerio = require("cheerio")
const request = require("request");
const pdfkit = require("pdfkit");

const getReposPageHtml = require("./reposPage");

request(url, cb);

function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        // console.log(html);
        getTopicLinks(html);
    }
}

function getTopicLinks(html) {
    let $ = cheerio.load(html);
    let linkElemArr = $(".topic-box.position-relative.hover-grow.height-full.text-center.border.color-border-muted.rounded.color-bg-default.p-5 > a");
    for (let i = 0; i < linkElemArr.length; i++) {
        let link = $(linkElemArr[i]).attr("href");
        let topic = link.split("/").pop();
        let fullLink = "https://github.com" + link;
        // console.log(fullLink);
        getReposPageHtml(fullLink,topic);
    }

}