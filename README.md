# TableauEmbed

Embed Multiple Tableau workbooks on the page. The web application allows users to perform custom action with the help of the Tableau JavaScript API. Apart from embedding the workbook the Tableau JavaScript API was used to build off the shelf functionality for users.

##### Technologies used : 

  - JavaScript
  - jQuery 
  - Tableau JavaScript API
  - RequireJS
  - LESS
  - Bootstrap
  
##### Tableau embed structure overview 
Two Main JavaScript files, **ExploreTableau.js** and **ExploreUtils.js**
+ **ExploreTableau.js** contains all the core Tableau functionality required to embed a workbook.

+ **ExploreUtils.js** contains all the custom built functionality built around the Tableau workbook.

##### Adding a new Reatiler workbook
```
var retailer = 'newRetailer';

// Create a newRetailer Explore instance of ExploreTableau
var NewRetailerEXP = ExploreTableau.getInstance({
    retailer_slug: retailer,
    vizHolder: '#vizHolder',
    drawMenuTabs: true
});
```
