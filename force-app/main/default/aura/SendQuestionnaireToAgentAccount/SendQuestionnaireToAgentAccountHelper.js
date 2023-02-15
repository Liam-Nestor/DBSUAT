({
    onInit : function(component, helper) {
        helper.hideSpinner(component);
    },

    saveOperationHelper : function(component, helper) {
        var name = component.find("agentName").get("v.value");
        var email = component.find("agentEmail").get("v.value");
        let saveMethod = component.get('c.saveOperation');
        saveMethod.setParams({
            "accountId" : component.get('v.recordId'),
            "agentName" : name,
            "agentEmail" : email
        });
        saveMethod.setCallback(this, function(response) {
            let state = response.getState();
            if(state == 'SUCCESS') {
                console.log('good');
            } else {
                console.log('bad');
            }
            helper.closeDialog(component);
            helper.hideSpinner(component);
            $A.get('e.force:refreshView').fire();
        });
        $A.enqueueAction(saveMethod);
    },

    closeDialog : function(component) {
        $A.get("e.force:closeQuickAction").fire();
    },

    showSpinner : function(component) {
        component.set('v.showSpinner', true);
    },

    hideSpinner : function(component) {
        component.set('v.showSpinner', false);
    }
});