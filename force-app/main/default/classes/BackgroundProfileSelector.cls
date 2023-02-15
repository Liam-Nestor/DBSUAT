public without sharing class BackgroundProfileSelector {

    public static List<Background_Profile__c> getBackgroundProfileByQuestionnaireKey(String questionnaireKey) {
        return [SELECT Id FROM Background_Profile__c WHERE Questionnaire_Key__c = :questionnaireKey];
    }

    public static Background_Profile__c getBackgroundProfileById(Id backgroundProfileId) {
        List<Background_Profile__c> backgroundProfiles = getBackgroundProfileByIds(new Set<String>{
                backgroundProfileId
        });
        if (backgroundProfiles.isEmpty()) {
            return null;
        } else {
            return backgroundProfiles.get(0);
        }
    }

    public static List<Background_Profile__c> getBackgroundProfileByIds(Set<String> backgroundProfileIds) {
        return [
                SELECT
                        Id,
                        Name,
                        Lead__c,
                        Company_Trading_Name__c,
                        CreatedById,
                        Company_Legal_Name__c,
                        Main_Contact_Email__c,
                        Main_Contact_Phone__c,
                        Company_Website__c,
                        Date_Business_was_established__c,
                        Where_is_company_registered__c,
                        Company_Registration_Number__c,
                        Recruitment_Country_Primary__c,
                        Account_Name__c,
                        Account_Name__r.DBS_Partner_Manager__r.Email,
                        CreatedDate,
                        Attachments_Count__c,
                        Questionnaire_Key__c,
                        Is_Ready_To_Linked__c,
                        Director_Owner_Legal_Email_Address__c,
                        Director_Owner_Legal_Rep_First_Name__c,
                        Director_Owner_Legal_Rep_Last_Name__c,
                        Lead__r.Email,
                        Lead__r.Name,
                        Lead__r.Owner.Email,
                        Your_First_Name__c,
                        Your_Last_Name__c,
                        Your_Contact_Email_Address__c,
                        Agent_Email__c,
                        Agent_First_Name__c,
                        Agent_Last_Name__c,
                        Agent_Job_Title__c,
                        Your_First_Name_2__c,
                        Your_Last_Name_2__c,
                        New_Contact_Mobile_Phone_Number__c,
                        New_Your_Contact_Mobile_Phone_Number__c,
                        X13_6_Your_Contact_Mobile_Phone_Number__c,
                        X9_5_Contact_Mobile_Phone_Number__c,
                        Number_of_Bank_Details_Formula__c,
                        Your_Job_Title__c,
                        X9_4_Contact_Email_Address__c,
                        Type_of_Business__c,
                        Number_of_Bank_Details__c,
                        Lead__r.FirstName,
                        Lead__r.LastName,
                        Company_Registered_Address__c,
                        Contract__r.Customer_Signed_by_Name__c,
                        Contract__r.Customer_Signed_by_Email__c,
                        Bank_Account_Name__c,
                        Bank_2_Account_Name__c,
                        Bank_3_Account_Name__c,
                        Bank_Swift_Code__c,
                        Bank_2_Swift_Code__c,
                        Bank_3_Swift_Code__c,
                        Bank_IBAN_Code__c,
                        Bank_2_IBAN_Code__c,
                        Bank_3_IBAN_Code__c,
                        Bank_Account_Number__c,
                        Bank_2_Account_Number__c,
                        Bank_3_Account_Number__c,
                        Backend_Bank_Number__c,
                        Bank_Name__c,
                        Bank_2_Name__c,
                        Bank_3_Name__c,
                        Your_Position_at_Company__c,
                        Director_Position_Title__c,
                        Director_Owner_Legal_Phone_Number__c,
                        X3_5_Company_Registered_Address_Country__c,
                        X3_4_Company_Registered_Address_PostCode__c,
                        X3_3_Company_Registered_Address_City__c,
                        X3_2_Company_Registered_Address_line_2__c,
                        X3_1_Company_Registered_Address_line_1__c,
                        Secondary_Contact_Name__c,
                        Are_you_Dir_Owner_Legal_Rep_None__c,
                        DocuSign_Envelope_Status__c,
                        Is_Ready_To_Process__c,
                        Number_of_Staff_in_Employment__c
                FROM
                        Background_Profile__c
                WHERE Id IN :backgroundProfileIds
        ];
    }

    public static List<Background_Profile__c> getBackgroundProfileWithLastContract(Set<Id> backgroundProfileIds) {
        return [
                SELECT
                        Id, (SELECT Id, Status FROM Contracts__r ORDER BY CreatedDate DESC LIMIT 1)
                FROM
                        Background_Profile__c
                WHERE Id IN :backgroundProfileIds
        ];
    }

    public static List<Background_Profile__c> getBackgroundProfileByAccountId(Id accountId) {
        return getBackgroundProfileByAccountId(new Set<String>{
                accountId
        });
    }


    public static List<Background_Profile__c> getBackgroundProfileByAccountId(Set<String> accountIds) {
        return [
                SELECT
                        ID,
                        Name,
                        Account_Name__c,
                        Your_First_Name__c,
                        Your_Last_Name__c,
                        Your_Contact_Email_Address__c,
                        Your_title__c,
                        Your_Position_at_Company__c,
                        Agent_Email__c,
                        Agent_First_Name__c,
                        Agent_Last_Name__c,
                        Agent_Job_Title__c,
                        Your_First_Name_2__c,
                        Your_Last_Name_2__c,
                        Your_Job_Title__c,
                        X9_4_Contact_Email_Address__c,
                        Number_of_Bank_Details_Formula__c,
                        Number_of_Bank_Details__c,
                        Backend_Bank_Number__c,
                        Director_Position_Title__c,
                        Number_of_Staff_in_Employment__c,
                        Director_Owner_Legal_Rep_Last_Name__c,
                        Director_Owner_Legal_Rep_First_Name__c,
                        Director_Owner_Legal_Email_Address__c,
                        Director_Owner_Legal_Rep_Title__c,
                        Type_of_Business__c,
                        Are_you_Dir_Owner_Legal_Rep_None__c
                FROM Background_Profile__c
                WHERE Account_Name__c = :accountIds
                ORDER BY CreatedDate DESC
        ];
    }

}