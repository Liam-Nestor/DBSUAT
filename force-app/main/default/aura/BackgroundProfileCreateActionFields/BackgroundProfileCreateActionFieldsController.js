({
    onChangeHandler : function(component, event, helper) {
        let parent = component.get('v.parent');
        if(parent != undefined && parent != null) {
            let eventSource = event.getSource();
            parent.fieldChangeHandler(eventSource.get('v.fieldName'), eventSource.get('v.value'));
        }
    }
});