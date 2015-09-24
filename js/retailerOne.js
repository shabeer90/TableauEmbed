requirejs.config({
    //Set up paths to our libraries and plugins
    urlArgs: "nc=v3",
    paths: {
        // Base charts
        "exploreTableau": 'core/ExploreTableau',
        "exploreUtils": 'core/ExploreUtils'
    },
});

define('jquery', function () {
    return $; // Just return the jQuery loaded with `script`.
});


// Load Dashboard elements
require(["core/ExploreTableau", "core/ExploreUtils"], function (ExploreTableau, ExploreUtils) {
    $(document).ready(function () {

        var retailer = 'retailerOne';

        // Create a retailerOne Explore instance of ExploreTableau
        var RetailerOneEXP = ExploreTableau.getInstance({
            retailer_slug: retailer,
            vizHolder: '#vizHolder',
            drawMenuTabs: true
        });

        // retailerOne Explore events
        $('#menu-items-' + retailer).on('click', 'a', function (e) {
            RetailerOneEXP.newDasboardTab(e);
        });
        $('#export-excel').on('click', function (e) {
            RetailerOneEXP.exportCrossTab(e);
        });
        $('#export-pdf').on('click', function (e) {
            RetailerOneEXP.exportPDFTab(e);
        });
        $('#reset-btn').on('click', function (e) {
            RetailerOneEXP.resetWorkbook(e);
        });

    });
}, function (err) {
    console.log(err)
});
