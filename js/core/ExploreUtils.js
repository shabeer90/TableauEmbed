/**
 * Created by ShabeerSheffa on 04/09/2015.
 */

define(['jquery', 'core/ExploreTableau'], function ($, ExploreTableau) {
    var ExploreUtils = (function () {

        // Instance stores a reference to the ExploreTableau
        var instance;

        function init(options) {

            // set options to the options supplied
            // or an empty object if none are provided
            options = options || {};
            var viz = options.viz;
            var workbook = options.workbook;
            var retailer_slug = options.retailer_slug;

            var menu_id = '#menu-items-' + retailer_slug;
            var explore_menu = '#explore-' + retailer_slug;
            var export_tabs = [];
            var export_key = 'AExport.';

            // Generate the list of sheets on the right MENU
            function drawDashboardTabs() {
                var sheets = workbook.getPublishedSheetsInfo(), links = '';

                for (var i = 0; i < sheets.length; i++) {
                    // Load sheets that are type 'dashboard'
                    if (sheets[i].getSheetType() === 'dashboard') {
                        var name_replaced = sheets[i].getName().replace(/ /g, '_');
                        links = links + "<li><a class='dashboard-menu' name='" + name_replaced + "' href='#" + name_replaced + "' >" + sheets[i].getName() + "</a></li>";
                    } else if (sheets[i].getSheetType() === 'worksheet') {
                        // Maintain a list of export sheets
                        var export_sheet = sheets[i].getName().replace(export_key, '');
                        export_tabs.push(export_sheet)
                    }
                }

                // Append the menu to the explore menu
                $(explore_menu).append("<span class='dcjq-icon'></span>").after("<ul class='sub'>" + links + "</ul>").show('slow');

                // Check if the first sheet has export enabled
                toggleExportExcelTab(sheets[0].getName());

                // Highlight the first menu link active
                highlightActiveMenuLink();
            }

            // Toggle Export button based on sheet
            function toggleExportExcelTab(sheet) {
                var $btn = $('#export-excel');
                (export_tabs.indexOf(sheet) != -1) ? $btn.removeClass('disabled') : $btn.addClass('disabled');
            }

            // Highlight the first menu link active
            function highlightActiveMenuLink() {
                var menu = $(menu_id + ' ul.sub')[0];
                $(menu).children().each(function () {
                    var name = $(this).children()[0];
                    if ($(name).attr('name').replace(/_/g, ' ') == workbook.getActiveSheet().getName())
                        $(this).addClass("active");
                });
            }

            // Highlight the active menu link
            function toggleMenuLinkActive(e) {
                // Remove active styles on menu links
                $(menu_id + ' .sub').children().each(function () {
                    if ($(this).attr('class') === 'active') {
                        $(this).removeClass('active');
                    }
                });

                // Set the class for the active menu
                $(e).parent().addClass("active");
            }


            return {
                // Public variables
                viz: viz,
                workbook: workbook,

                // Public methods
                drawDashboardTabs: function () {
                    drawDashboardTabs()
                },

                // Load Dashboards from menu
                loadNewDasboardTab: function (e) {
                    toggleMenuLinkActive(e.currentTarget);
                    var tab = $(e.currentTarget).attr('name');
                    tab = tab.replace(/_/g, ' ');

                    workbook.activateSheetAsync(tab);

                    // Toggle Export button based on sheet
                    toggleExportExcelTab(tab)
                },

                // Export selected workbook to Excel
                exportCrossTab: function (e) {
                    var active_sheet = workbook.getActiveSheet().getName();
                    if (export_tabs.indexOf(active_sheet) != -1) {
                        var export_sheet_name = export_key + active_sheet
                        viz.showExportCrossTabDialog(export_sheet_name)
                    }
                }
            };
        }

        return {
            // Get the ExploreUtils instance if one exists
            // or create one if it doesn't
            getInstance: function (options) {
                if (!instance) {
                    instance = init(options);
                }

                return instance;
            }
        };
    })();

    return ExploreUtils;
});
