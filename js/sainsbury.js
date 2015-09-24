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

        var retailer = 'sainsburys';

        // Create a Sainsbury Explore instance of ExploreTableau
        var SainsburyEXP = ExploreTableau.getInstance({
            retailer_slug: retailer,
            vizHolder: '#vizHolder',
            drawMenuTabs: true
        });

        // Sainsbury Explore events
        $('#menu-items-' + retailer).on('click', 'a', function (e) {
            SainsburyEXP.newDasboardTab(e);
        });
        $('#export-excel').on('click', function (e) {
            SainsburyEXP.exportCrossTab(e);
        });
        $('#export-pdf').on('click', function (e) {
            SainsburyEXP.exportPDFTab(e);
        });
        $('#reset-btn').on('click', function (e) {
            SainsburyEXP.resetWorkbook(e);
        });

    });
}, function (err) {
    console.log(err)
});
