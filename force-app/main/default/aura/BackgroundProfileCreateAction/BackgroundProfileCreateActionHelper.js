({

    interactionEntitiesOfficialsChange : function(component, value) {
        component.set('v.displayInteractionEntitiesOfficialsAdditionalField', value == 'Yes');
    },

    ownedPartlyOwnedChange : function(component, value) {
        component.set('v.displayOwnedPartlyOwnedChangeAdditionalField', value == 'Yes');
    },

    governmentOfficialChange : function(component, value) {
        component.set('v.displayGovernmentOfficialAdditionalField', value == 'Yes');
    },

    planToInteractEntitiesOfficeChange : function(component, value) {
        component.set('v.displayPlanToInteractEntitiesOfficeAdditionalField', value == 'Yes');
    },

    companySuspensionChange : function(component, value) {
        component.set('v.displayCompanySuspensionAdditionalField', value == 'Yes');
    },

    provideFinancialCompensationChange : function(component, value) {
        component.set('v.displayProvideFinancialCompensationAdditionalField', value == 'Yes');
    },

    governmentOfficialFamilyRelationsChange : function(component, value) {
        component.set('v.displayGovernmentOfficialFamilyRelationsAdditionalField', value == 'Yes');
    },

    counsellingServicesChange : function(component, value) {
        component.set('v.displayCounsellingServicesAdditionalField', value.includes('Other'));
    },

    recruitmentAndCounsellingProcedureChange : function(component, value) {
        component.set('v.displayRecruitmentAndCounsellingProcedureAdditionalField', value == 'Yes, we are following part of the procedures');
    },

    howIsVisaCounsellingDeliveredChange : function(component, value) {
        component.set('v.howIsVisaCounsellingDeliveredValue', value);
    },

    howDidYouHearAboutDbsChange : function(component, value) {
        component.set('v.displayHowDidYouHearAboutDbsAdditionalField', value == 'Other');
    },

    howAreYouChange : function(component, value) {
        component.set('v.displayHowAreYouAdditionalFields', value == 'None of the above');
        component.set('v.DirectorOwnerLegal', value);
    },
    
    numberOfEmployeesChange : function(component, value) {
        var typeOfBuissness  = component.get('v.buissnessType');
        var directorOwnerLegal = component.get('v.DirectorOwnerLegal');
        if ((typeOfBuissness == 'Other' || typeOfBuissness == 'Corporation / Ltd. company'
        || typeOfBuissness == 'Partnership') && (directorOwnerLegal == 'Owner' 
        || directorOwnerLegal == 'Director'
        || directorOwnerLegal == 'Legal Representative') 
        && value != '1 (You are the sole proprietor Or You are the only member of the company)') {
            component.set('v.displayOtherRecipentOfEmail', true);
        } else {
            component.set('v.displayOtherRecipentOfEmail', false);
        }
    },
    
    setTypeOfBuissness : function(component, value){
        component.set('v.buissnessType', value);  
    },

    doYouHaveAnyBranchOfficeChange : function(component, value) {
        component.set('v.displayDoYouHaveAnyBranchOfficesAdditionalField', value == 'Yes');
    },

    doYouHaveAnyBranchOfficeInOtherCountriesChange : function(component, value) {
        component.set('v.displayDoYouHaveAnyBranchOfficesInOtherCountriesAdditionalField', value == 'Yes');
    },

    otherBusinessPartnersChange : function(component, value) {
        component.set('v.displayOtherBusinessPartnersAdditionalField', value == 'Yes');
    },

    otherKaplanDivisionsChange : function(component, value) {
        component.set('v.displayOtherKaplanDivisionsAdditionalField', value == 'Yes');
    },

    numberOfBankDetails : function(component, value) {
        component.set('v.numberOfBankDetails', value);
    },

    displayPersonalBankDetailsSection1 : function(component, value) {
        component.set('v.displayPersonalBankDetailsSection1', value);
    },

    displayPersonalBankDetailsSection2 : function(component, value) {
        component.set('v.displayPersonalBankDetailsSection2', value);
    },

    displayPersonalBankDetailsSection3 : function(component, value) {
        component.set('v.displayPersonalBankDetailsSection3', value);
    },

    disableSubmitButton : function(component, value) {
        component.set('v.disableSubmitButton', value == 'No');
    },

    init: function(component, helper) {
        this.showSpinner(component);
        let initApexMethod = component.get('c.getSettingsForQuestionnaire');
        initApexMethod.setParams({
            'secretId' : this.getUrlParameter('id')
        })
        initApexMethod.setCallback(this, function(response) {
            let state = response.getState();
            if (state == 'SUCCESS') {
            } 
            else if (state == 'ERROR') {
                component.set('v.isError', true);
                component.set('v.message', this.getError(response.getError()));
            } else if (response.getState() == 'INCOMPLETE') {
                component.set('v.isError', true);
                component.set('v.message', 'Something went wrong!');
            }
            this.hideSpinner(component);
        }); 
        $A.enqueueAction(initApexMethod);
    },

    getRecordId: function(component, helper) {
        let initApexMethod = component.get('c.getBackgroundProfileId');
        initApexMethod.setParams({
            'secretId' : this.getUrlParameter('id')
        })
        initApexMethod.setCallback(this, function(response) {
            let state = response.getState();
            if (state == 'SUCCESS') {
                component.set('v.backgroundProfileId',  response.getReturnValue());
                this.uploadAttachments(component, helper, 0);
            } else if (state == 'ERROR') {
                component.set('v.isError', true);
                component.set('v.message', this.getError(response.getError()));
            } else if (response.getState() == 'INCOMPLETE') {
                component.set('v.isError', true);
                component.set('v.message', 'Something went wrong!');
            }
        });
        $A.enqueueAction(initApexMethod);
    },

    uploadAttachments: function(component, helper, i) {
        let selectedFiles = [];
        component.find('fileUploaderId').forEach(element => {
            let fileInput = element.find('fileId');
            let files = fileInput.get('v.files');
            if(files != undefined && files != null) {
                for(var index = 0 ; index < files.length; index++) {
                    selectedFiles.push(files[index]);
                }
            }
        });
        if(selectedFiles.length > 0 && i < selectedFiles.length) {
            var file = selectedFiles[i];
            var iteration = i;
            var sizeOfSelectedFiles = selectedFiles.length;
            var objFileReader = new FileReader();
            objFileReader.onload = $A.getCallback(function() {
                var fileContents = objFileReader.result;
                            var base64 = 'base64,';
                            var dataStart = fileContents.indexOf(base64) + base64.length;
                            fileContents = fileContents.substring(dataStart);
                helper.uploadFile(component, helper, file, fileContents, iteration, i == (sizeOfSelectedFiles - 1));
            });
            objFileReader.readAsDataURL(file);
        } else if ((selectedFiles.length > 0 || selectedFiles.length == 0) && selectedFiles.length == i) {
            helper.hideSpinner(component);
            component.set('v.isSuccess', true);
        }
    },

    uploadFile : function(component, helper, file, fileContent, iteration, isLast) {
        let initApexMethod = component.get('c.saveAttachment');
        initApexMethod.setParams({
            'fileContent' : encodeURIComponent(fileContent),
            'fileName' : file.name,
            'backgroundProfileId' : component.get('v.backgroundProfileId'),
            'isLastAttachment' : isLast
        });
        initApexMethod.setCallback(this, function(response) {
            let state = response.getState();
            if (state == 'SUCCESS') {
               helper.uploadAttachments(component, helper, ++iteration);
            } else if (state == 'ERROR') {
                helper.deleteRecord(component, helper, this.getError(response.getError()));
            } else if (state == 'INCOMPLETE') {
                helper.deleteRecord(component, helper, 'Something went wrong!');
            }
        });
        $A.enqueueAction(initApexMethod);
    },

    deleteRecord : function(component, helper, message) {
        let initApexMethod = component.get('c.deleteRecord');
        initApexMethod.setParams({
            'backgroundProfileId' : component.get('v.backgroundProfileId')
        });
        initApexMethod.setCallback(this, function(response) {
            let state = response.getState();
            if (state == 'SUCCESS') {
                component.set('v.isError', true);
                component.set('v.message', message);
            } else if (state == 'ERROR') {
                component.set('v.isError', true);
                component.set('v.message', this.getError(response.getError()));
            } else if (response.getState() == 'INCOMPLETE') {
                component.set('v.isError', true);
                component.set('v.message', 'Something went wrong!');
            }
            helper.hideSpinner(component);
        });
        $A.enqueueAction(initApexMethod);
    },

    showSpinner: function (component) {
        component.set("v.showSpinner", true);
    },

    hideSpinner: function (component) {
        component.set("v.showSpinner", false);
    },

    getUrlParameter : function(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    },

    getError : function(errors) {
        if(errors) {
            if (errors[0] && errors[0].message) {
                return errors[0].message;
            }
        } else {
            return 'Unknown error';
        }
        return null;
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