({
    onInit : function(component, helper) {
        let getLeadRecord = component.get('c.getLeadRecord');
        getLeadRecord.setParams({
            "leadId" : component.get('v.recordId')
        });
        getLeadRecord.setCallback(this, function(response) {
            let state = response.getState();
            if(state == 'SUCCESS') {
                let leadRecord = response.getReturnValue();

                if (leadRecord.Email != null) {
                    if(leadRecord.Background_Profile__c != null) {
                        component.set('v.message', $A.get("$Label.c.Questionnaire_To_Agent_Background_Profile_Exist_Msg"));
                    } else {
                        component.set('v.message', $A.get("$Label.c.Questionnaire_To_Agent_Required_Field_Pass_Msg"));
                    }
                    component.set('v.showConfirmButton', true);
                } else {
                    component.set('v.message', $A.get("$Label.c.Questionnaire_To_Agent_Required_Field_Fail_Msg"));
                }
            } else {
            }
            helper.hideSpinner(component);
        });
        $A.enqueueAction(getLeadRecord);
    },

    saveOperationHelper : function(component, helper) {
        let saveMethod = component.get('c.saveOperation');
        saveMethod.setParams({
            "leadId" : component.get('v.recordId')
        });
        saveMethod.setCallback(this, function(response) {
            let state = response.getState();
            if(state == 'SUCCESS') {
                
            } else {
            }
            helper.closeDialog(component);
            helper.hideSpinner(component);
            $A.get('e.force:refreshView').fire();
        });
        $A.enqueueAction(saveMethod);
    },

    closeDialog : function(component) {
        $A.get("e.force:closeQuickAction").fire()
    },

    showSpinner : function(component) {
         component.set('v.showSpinner', true);
    },

    hideSpinner : function(component) {
         component.set('v.showSpinner', false);
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