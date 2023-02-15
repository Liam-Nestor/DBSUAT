({
    init : function(component, event, helper) {
        helper.showSpinner(component);
        helper.onInit(component, helper);
    },

    hideDialog : function(component, event, helper) {
        helper.closeDialog(component);
    },

    navigateToMostRecentlyRecord : function(component, event, helper) {
        helper.navigateToRecord(component);
    },

    save : function(component, event, helper) {
        helper.showSpinner(component);
        helper.saveOperationHelper(component, helper);
    },
});