(function(document, $) {

    "use strict";

    $(document).on("foundation-contentloaded", function(e) {
        showHide($(".cq-dialog-dropdown-showhide", e.target));
    });

    $(document).on("change", ".cq-dialog-dropdown-showhide", function(e) {
        showHide($(this));
    });

    function showHide(el) {

        el.each(function(i, element) {

            if ($(element).is("coral-select")) {

                Coral.commons.ready(element, function(component) {
                    toggle(component, element);

                    component.on("change", function() {
                        toggle(component, element);
                    });
                });

            }

        });

    }

    function toggle(component, element) {

        var value = component.value;
        var target = $(element).data("cq-dialog-dropdown-showhide-target");

        if (!target) return;

        var $target = $(target);

        $target.addClass("hide");

        $target.filter(function() {
            return $(this).data("showhidetargetvalue") === value;
        }).removeClass("hide");

    }

})(document, Granite.$);