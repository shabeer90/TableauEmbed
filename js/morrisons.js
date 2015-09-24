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

        var retailer = 'morrisons';

        // Create a Sainsbury Explore instance of ExploreTableau
        var MorrisonsEXP = ExploreTableau.getInstance({
            retailer_slug: retailer,
            vizHolder: '#vizHolder',
            drawMenuTabs: true
        });

        // Sainsbury Explore events
        $('#menu-items-' + retailer).on('click', 'a', function (e) {
            MorrisonsEXP.newDasboardTab(e);
        });
        $('#export-excel').on('click', function (e) {
            MorrisonsEXP.exportCrossTab(e);
        });
        $('#export-pdf').on('click', function (e) {
            MorrisonsEXP.exportPDFTab(e);
        });
        $('#reset-btn').on('click', function (e) {
            MorrisonsEXP.resetWorkbook(e);
        });

    });
}, function (err) {
    console.log(err)
});
