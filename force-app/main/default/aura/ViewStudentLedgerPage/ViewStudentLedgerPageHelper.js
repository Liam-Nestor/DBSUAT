({
    onInit : function(component, helper) {
        let initApexMethod = component.get('c.getRedirectLink');
        initApexMethod.setParams({
            "recordId" : component.get('v.recordId')
        });
        initApexMethod.setCallback(this, function(response) {
            let state = response.getState();
            if(state == 'SUCCESS') {
                var urlEvent = $A.get("e.force:navigateToURL");
                urlEvent.setParams({
                  "url": response.getReturnValue()
                });
                urlEvent.fire();
            } else if (state == 'ERROR') {
               var errors = response.getError();
               if (errors) {
                   if (errors[0] && errors[0].message) {
                       helper.showToast('Error', 'error', errors[0].message);
                   }
               } else {
                   helper.showToast('Error', 'error', 'Unknown error');
               }
            } else {
                helper.showToast('Error', 'error', 'Unknown error');
            }
            helper.closeDialog(component);
        });
        $A.enqueueAction(initApexMethod);
    },

    closeDialog : function(component) {
        $A.get("e.force:closeQuickAction").fire()
    },

    showToast : function(title, type, message) {
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "type": type,
            "message": message
        });
        toastEvent.fire();
    }
});