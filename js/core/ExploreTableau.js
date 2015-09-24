/**
 * Created by ShabeerSheffa on 04/09/2015.
 */

define(['jquery', 'core/ExploreUtils'], function ($, ExploreUtils) {
    var ExploreTableau = (function () {

        // Instance stores a reference to the ExploreTableau
        var instance;

        // Force page to reload when session times out
        // Session time set to 4hrs = 14400000MS
        setTimeout(function () {
            window.location.reload(1);
        }, 14400000);


        function init(options) {

            // set options to the options supplied
            // or an empty object if none are provided
            options = options || {};
            var viz = '', workbook = '', activeSheet = '', utils = 'asdf';
            var tableau_url = 'https://mytableau.domain.com/trusted';
            var site = window.location.host.split('.')[0];

            // Resize workbook on page resize
            $(window).on("resize", resizeWorkbook);
            $(".sidebar-toggle-box .fa-bars").on('click', resizeWorkbook);

            // Default variables CAN be overridden
            var retailer_slug = options.retailer_slug || console.error('Retailer not specified');
            var vizHolder = options.workbook_url || '#vizHolder';
            var wbk_width = options.width || $(vizHolder).width();
            var wbk_height = options.height || 700;
            var drawMenuTabs = options.drawMenuTabs || false;

            // Default variables CAN NOT be overridden
            var placeholderDiv = $(vizHolder)[0];
            var token = $(vizHolder).data('tableauToken');
            var workbook_url = $(vizHolder).data('workbook');
            var worksheet_url = $(vizHolder).data('worksheet');

            // Construct URL to embed workbook
            var url = tableau_url + "/" + token + "/t/" + site + "/views/" + workbook_url + "/" + worksheet_url;

            // Private methods
            (function drawVis() {
                var options = {
                    width: wbk_width,
                    height: wbk_height,
                    hideTabs: true,
                    hideToolbar: true,
                    onFirstInteractive: function () {
                        workbook = viz.getWorkbook();
                        activeSheet = workbook.getActiveSheet();

                        // Create instance of ExploreUtils
                        utils = ExploreUtils.getInstance({viz: viz, workbook: workbook, retailer_slug: retailer_slug});
                        if (drawMenuTabs)
                            utils.drawDashboardTabs(); // Draw the Dashboard Tabs
                    }
                };
                viz = new tableauSoftware.Viz(placeholderDiv, url, options);
            })();


            function resizeWorkbook() {
                setTimeout(function () {
                    try {
                        workbook.getViz().setFrameSize($(placeholderDiv).width(), wbk_height);
                    } catch (e) {
                        // handle e ....
                    }
                }, 800);
            }

            return {
                // Public variables
                viz: viz,
                workbook: workbook,
                retailer_slug: retailer_slug,

                newDasboardTab: function (e) {
                    try {
                        utils.loadNewDasboardTab(e)
                    } catch (err) {

                    }
                },
                exportCrossTab: function (e) {
                    utils.exportCrossTab(e)
                },

                // Export selected workbook to PDF
                exportPDFTab: function () {
                    viz.showExportPDFDialog()
                },

                // Reset workbook
                resetWorkbook: function () {
                    viz.revertAllAsync()
                },

            };
        };

        return {
            // Get the ExploreTableau instance if one exists
            // or create one if it doesn't
            getInstance: function (options) {
                if (!instance) {
                    instance = init(options);
                }

                return instance;
            }
        };
    })();

    return ExploreTableau;
})
;
