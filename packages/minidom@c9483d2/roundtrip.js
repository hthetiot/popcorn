var minidom=require("./minidom"),content=require("fs").readFileSync(process.argv[2]).toString("utf8"),out=minidom(content).outerHTML;console.log("---"),console.log(out);