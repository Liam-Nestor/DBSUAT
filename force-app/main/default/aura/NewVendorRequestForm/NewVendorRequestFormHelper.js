({
    onInit : function(component, helper) {
        let initApexMethod = component.get('c.initValidation');
        initApexMethod.setParams({
            "backgroundProfileId" : component.get('v.recordId')
        });
        initApexMethod.setCallback(this, function(response) {
            let state = response.getState();
            if(state == 'SUCCESS') {
                var responseWrapper = response.getReturnValue();
                if (responseWrapper.backgroundProfileRecord.Id == component.get('v.recordId')) {
                    let fname = responseWrapper.backgroundProfileRecord.Your_First_Name__c != null ? responseWrapper.backgroundProfileRecord.Your_First_Name__c : '';
                    let lname = responseWrapper.backgroundProfileRecord.Your_Last_Name__c ? responseWrapper.backgroundProfileRecord.Your_Last_Name__c : '';
                    let fname2 = responseWrapper.backgroundProfileRecord.Director_Owner_Legal_Rep_First_Name__c != null ? responseWrapper.backgroundProfileRecord.Director_Owner_Legal_Rep_First_Name__c : '';
                    let lname2 = responseWrapper.backgroundProfileRecord.Director_Owner_Legal_Rep_Last_Name__c != null ? responseWrapper.backgroundProfileRecord.Director_Owner_Legal_Rep_Last_Name__c : '';
                    let fname3 = responseWrapper.backgroundProfileRecord.Your_First_Name_2__c != null ? responseWrapper.backgroundProfileRecord.Your_First_Name_2__c : '';
                    let lname3 = responseWrapper.backgroundProfileRecord.Your_Last_Name_2__c != null ? responseWrapper.backgroundProfileRecord.Your_Last_Name_2__c : '';
                    if (fname == '' && lname == '' || fname == null && lname == null) {
                        component.set('v.typeOfBusiness', responseWrapper.backgroundProfileRecord.Type_of_Business__c);
                        component.set('v.areYou', responseWrapper.backgroundProfileRecord.Are_you_Dir_Owner_Legal_Rep_None__c);
                        component.set('v.currentTitleOfFirstRecipient', responseWrapper.backgroundProfileRecord.Your_Job_Title__c != null ? responseWrapper.backgroundProfileRecord.Your_Job_Title__c : '');
                        component.set('v.currentEmailOfFirstRecipient', responseWrapper.backgroundProfileRecord.X9_4_Contact_Email_Address__c != null ? responseWrapper.backgroundProfileRecord.X9_4_Contact_Email_Address__c : '');
                        component.set('v.currentNameOfFirstRecipient', fname3 + ' ' + lname3);
                    } else {
                        component.set('v.typeOfBusiness', responseWrapper.backgroundProfileRecord.Type_of_Business__c);
                        component.set('v.areYou', responseWrapper.backgroundProfileRecord.Are_you_Dir_Owner_Legal_Rep_None__c);
                        component.set('v.currentTitleOfFirstRecipient', responseWrapper.backgroundProfileRecord.Your_Position_at_Company__c != null ? responseWrapper.backgroundProfileRecord.Your_Position_at_Company__c : '');
                        component.set('v.currentEmailOfFirstRecipient', responseWrapper.backgroundProfileRecord.Your_Contact_Email_Address__c != null ? responseWrapper.backgroundProfileRecord.Your_Contact_Email_Address__c : '');
                        component.set('v.currentNameOfFirstRecipient', fname + ' ' + lname);
                    }
                    component.set('v.currentTitleOfCeoRecipient', responseWrapper.backgroundProfileRecord.Director_Position_Title__c != null ? responseWrapper.backgroundProfileRecord.Director_Position_Title__c : '');
                    component.set('v.currentNumberOfBankAccounts', responseWrapper.backgroundProfileRecord.Number_of_Bank_Details_Formula__c != null ? responseWrapper.backgroundProfileRecord.Number_of_Bank_Details_Formula__c : '');
                    component.set('v.currentEmailOfCeoRecipient', responseWrapper.backgroundProfileRecord.Director_Owner_Legal_Email_Address__c != null ? responseWrapper.backgroundProfileRecord.Director_Owner_Legal_Email_Address__c : '');
                    component.set('v.currentNameOfCeoRecipient', fname2 + ' ' + lname2);
                    component.set('v.titlePicklist', responseWrapper.titlePicklist);
                    component.set('v.bankPicklist', responseWrapper.bankPicklist);
                    component.set('v.twoSigns', responseWrapper.twoSigns);
                } else {
                    component.set('v.mostRecentlyRecord', responseWrapper.backgroundProfileRecord);
                }  
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
            helper.hideSpinner(component);
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
    },

    showSpinner : function(component) {
         component.set('v.showSpinner', true);
    },

    hideSpinner : function(component) {
         component.set('v.showSpinner', false);
    },
 
    navigateToRecord : function(component) {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
          "recordId": component.get('v.mostRecentlyRecord').Id,
        });
        navEvt.fire();
    },

    validInputs : function(component) {
        var allValid = component.find('fieldId').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && !inputCmp.get('v.validity').valueMissing;
        }, true);
        if (allValid) {
            return true;
        } else {
            return false;
        }
    },

    saveOperationHelper : function(component, helper) {
        if (component.get('v.mostRecentlyRecord') != undefined && component.get('v.mostRecentlyRecord') != null) {
            helper.navigateToRecord(component);
        } else {
            if (helper.validInputs(component)) {
                let saveApexMethod = component.get('c.sendChangeRequestForm');
                saveApexMethod.setParams({
                    "backgroundProfileId" : component.get('v.recordId'),
                    "firstRecipientName" : component.get('v.currentNameOfFirstRecipient'),
                    "firstRecipientEmail" : component.get('v.currentEmailOfFirstRecipient'),
                    "secRecipientName" : component.get('v.currentNameOfCeoRecipient'),
                    "secRecipientEmail" : component.get('v.currentEmailOfCeoRecipient'),
                    "firstRecipientTitle" : component.get('v.currentTitleOfFirstRecipient'),
                    "secRecipientTitle" : component.get('v.currentTitleOfCeoRecipient'),
                    "numBankAccounts" : component.get('v.currentNumberOfBankAccounts')
                });
                saveApexMethod.setCallback(this, function(response) {
                    let state = response.getState();
                    if(state == 'SUCCESS') {
                        helper.showToast('Success', 'Success', 'Change Request was send to recipients');
                    } else if (state == 'ERROR') {
                       var errors = response.getError();
                       console.log(errors);
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
                    $A.get('e.force:refreshView').fire();
                });
                $A.enqueueAction(saveApexMethod);
            } else {
                helper.hideSpinner(component);
            }
        }
    }
});