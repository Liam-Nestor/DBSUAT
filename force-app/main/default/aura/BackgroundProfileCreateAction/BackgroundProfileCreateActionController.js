({
    handleSubmit: function(component, event, helper) {
        helper.showSpinner(component);
        event.preventDefault();
        var fields = event.getParam('fields');
        var secretId = helper.getUrlParameter('id');
        fields.Questionnaire_Key__c = secretId;
       	component.find('backgroundProfileForm').submit(fields);
    },

    doInit : function(component, event, helper) {
        helper.init(component, helper);
    },

    handleError: function(component, event, helper) {
        var errors = event.getParams();
        if(errors.message === 'The requested resource does not exist') {
            helper.getRecordId(component, helper);
        } else {
            helper.hideSpinner(component);
            if(errors.detail != '') {
               helper.showToast('Error', 'Error', errors.message + ': ' + errors.detail);
            } else {
                helper.showToast('Error', 'Error', errors.message);
            }
        }
    },

    handleSuccess : function(component, event, helper) {
        component.set('v.backgroundProfileId',  event.getParam('response').id);
        helper.uploadAttachments(component, helper, 0);
    },

    onChangeFieldHandler : function(component, event, helper) {
        let params = event.getParams().arguments;
        var apiNameField = params.apiNameField;
        if(apiNameField == 'Owned_Partly_Owned_by_a_Govt_Dept__c') {
            helper.ownedPartlyOwnedChange(component, params.values);
        } else if (apiNameField == 'Interaction_w_Govt_Entities_Officials__c') {
            helper.interactionEntitiesOfficialsChange(component, params.values);
        } else if (apiNameField == 'Plan_to_interact_w_Govt_Entities_Offic__c') {
            helper.planToInteractEntitiesOfficeChange(component, params.values);
        } else if (apiNameField == 'Present_or_Former_Government_Official__c') {
            helper.governmentOfficialChange(component, params.values);
        } else if (apiNameField == 'Government_Official_Family_Relations__c') {
            helper.governmentOfficialFamilyRelationsChange(component, params.values);
        } else if (apiNameField == 'Provide_Financial_Compensation__c') {
            helper.provideFinancialCompensationChange(component, params.values);
        } else if (apiNameField == 'Company_Suspension__c') {
            helper.companySuspensionChange(component, params.values);
        } else if (apiNameField == 'Counselling_Services__c') {
            helper.counsellingServicesChange(component, params.values);
        } else if (apiNameField == 'Recruitment_and_Counselling_Procedure__c') {
            helper.recruitmentAndCounsellingProcedureChange(component, params.values);
        } else if (apiNameField == 'How_is_Visa_Counselling_delivered__c') {
            helper.howIsVisaCounsellingDeliveredChange(component, params.values);
        } else if (apiNameField == 'How_did_you_hear_about_DBS__c') {
            helper.howDidYouHearAboutDbsChange(component, params.values);
        } else if (apiNameField == 'Are_you_Dir_Owner_Legal_Rep_None__c') {
            helper.howAreYouChange(component, params.values);
        } else if (apiNameField == 'X4_Do_you_have_any_branch_offices__c') {
            helper.doYouHaveAnyBranchOfficeChange(component, params.values);
        } else if (apiNameField == 'X6_Do_you_have_Branch_Offices_in_any__c') {
            helper.doYouHaveAnyBranchOfficeInOtherCountriesChange(component, params.values);
        } else if (apiNameField == 'Other_Business_Partners__c') {
            helper.otherBusinessPartnersChange(component, params.values);
        } else if (apiNameField == 'Working_with_other_Kaplan_Divisions__c') {
            helper.otherKaplanDivisionsChange(component, params.values);
        } else if (apiNameField == 'Number_of_Bank_Details__c') {
            helper.numberOfBankDetails(component, params.values);
        } else if (apiNameField == 'Bank_Account_Type__c') {
            helper.displayPersonalBankDetailsSection1(component, params.values);
        } else if (apiNameField == 'Bank_2_Account_Type__c') {
            helper.displayPersonalBankDetailsSection2(component, params.values);
        } else if (apiNameField == 'Bank_3_Account_Type__c') {
            helper.displayPersonalBankDetailsSection3(component, params.values);
        } else if (apiNameField == 'Declaration__c') {
            helper.disableSubmitButton(component, params.values);
        } else if (apiNameField == 'Type_of_Business__c') {
            helper.setTypeOfBuissness(component, params.values);
        } else if (apiNameField == 'Number_of_Staff_in_Employment__c') {
            helper.numberOfEmployeesChange(component, params.values);
        }
    }
});