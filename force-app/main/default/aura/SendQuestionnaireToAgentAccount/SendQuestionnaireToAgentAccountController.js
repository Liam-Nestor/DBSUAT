({
    init : function(component, event, helper) {
        helper.showSpinner(component);
        helper.onInit(component, helper);
    },

    save : function(component, event, helper) {
       helper.showSpinner(component);
       helper.saveOperationHelper(component, helper);
    },

    hideDialog : function(component, event, helper) {
        helper.closeDialog(component);
    },
});