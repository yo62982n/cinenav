import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

var cheerio = require('cheerio');
var rp = require('request-promise');

const url = 'https://cors-anywhere.herokuapp.com/www.imdb.com/news/movie/?ref_=nv_nw_mv';

export class Test extends Component {
    state = {
        json : {}
    }

    componentDidMount(){
        rp(url)
            .then(res => {
                
                var $ = cheerio.load(res);
        
                // var title, content;
                //var json = { title : "", content : ""};
                var json = { title : "", content : ""};
        
                // var data = $(this);
                
                var titles = $('h2.news-article__title').text() // Returns all the titles as one big string seperated by \n
                var content = $('div.news-article__content').text(); // Returns all the content as one big string seperated by \n

                // json.title = cleanAndArray(titles);
                // json.content = cleanAndArray(content);

                titles = cleanAndArray(titles);
                content = cleanAndArray(content);

                json.title = titles[0]
                json.content = content[0]
                json.title1 = titles[1]
                json.content1 = content[1]
                json.title2 = titles[2]
                json.content2 = content[2]
                json.title3 = titles[3]
                json.content3 = content[3]
                json.title4 = titles[4]
                json.content4 = content[4]


                // below code is to loop through the array and get all titles
                // cleanAndArray(titles).forEach(function(item) {
                //   var li = document.createElement("li");
                //   var text = document.createTextNode(item);
                //   li.appendChild(text);
                //   document.getElementById("myUl").appendChild(li);
                // });

        
                return json;
            })
            .then(json => {
                return this.setState({
                    json: json
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
           <div>
                <Grid container>
                    <Grid item sm={2}/>
                    <Grid item sm={8} xs={12}>
                        <h2>{this.state.json.title}.</h2>
                        <body className="newsBody">{this.state.json.content}</body>
                        <h2>{this.state.json.title1}.</h2>
                        <body className="newsBody">{this.state.json.content1}</body>
                        <h2>{this.state.json.title2}.</h2>
                        <body className="newsBody">{this.state.json.content2}</body>
                        <h2>{this.state.json.title3}.</h2>
                        <body className="newsBody">{this.state.json.content3}</body>
                        <h2>{this.state.json.title4}.</h2>
                        <body className="newsBody">{this.state.json.content4}</body>
                    </Grid>
                    <Grid item sm={2}/>
                </Grid>
           </div>
        )
    }
}

export default Test


function cleanAndArray(stringResult) {
    var trimmedResult = stringResult.trim(); // trim is to remove first \n
    var cleanedArray = trimmedResult.split("\n"); // split into array
    for (var i = 0; i < cleanedArray.length; i++) {
        if (cleanedArray[i] == "            ") {
            cleanedArray.splice(i, 1); // remove new line array elements
        }
    }
    for (var x = 0; i < cleanedArray.length; x++) {
        cleanedArray[x].trim() // trim remaining dirty array elements
    }

    return cleanedArray;
}
