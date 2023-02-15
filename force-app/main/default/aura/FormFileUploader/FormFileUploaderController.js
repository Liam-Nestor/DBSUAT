({
    handleFilesChange: function(component, event, helper) {
        if(component.find("fileId").get("v.files").length == 0) {
           component.set("v.fileName", 'No File Selected...');
        } else {
            component.set("v.fileName", component.find("fileId").get("v.files")[0]["name"]);
        }
    }
});