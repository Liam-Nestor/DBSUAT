public without sharing class BackgroundProfileQuestionnaireController {

    @AuraEnabled
    public static void saveAttachment(String fileContent, String fileName, String backgroundProfileId, Boolean isLastAttachment) {

        ContentDocumentBuilder.getBuilder()
                .setPathOnClient(fileName)
                .setVersionData(EncodingUtil.base64Decode(EncodingUtil.urlDecode(fileContent, 'UTF-8')))
                .setGuestRecordId(backgroundProfileId).save();

        if (isLastAttachment) {
            update new Background_Profile__c(Id = backgroundProfileId, Is_Ready_To_Process__c = true);
        }
    }

    @AuraEnabled
    public static void deleteRecord(String backgroundProfileId) {
        delete new Background_Profile__c(Id = backgroundProfileId);
        delete [SELECT ID FROM ContentDocument WHERE LatestPublishedVersion.Guest_Record_Id__c = :backgroundProfileId];
    }

    @AuraEnabled
    public static void getSettingsForQuestionnaire(String secretId) {
        if (secretId == null || String.isBlank(secretId)) {
            throw new AuraHandledException(Label.Questionnaire_To_Agent_Missing_Id);
        }
        List<Lead> leads = LeadSelector.getLeadByQuestionnaireKey(secretId);
        List<Account> accounts = [SELECT Id FROM Account WHERE Questionnaire_Key__c = :secretId];
        List<Background_Profile__c> backgroundProfiles = BackgroundProfileSelector.getBackgroundProfileByQuestionnaireKey(secretId);
        if (leads.isEmpty() && accounts.isEmpty()) {
            throw new AuraHandledException(Label.Questionnaire_To_Agent_Wrong_Id);
        } else if (!backgroundProfiles.isEmpty()) {
            throw new AuraHandledException(Label.Questionnaire_To_Agent_Id_Was_Used);
        }
    }

    @AuraEnabled
    public static Id getBackgroundProfileId(String secretId) {
        return BackgroundProfileSelector.getBackgroundProfileByQuestionnaireKey(secretId).get(0).Id;
    }
}