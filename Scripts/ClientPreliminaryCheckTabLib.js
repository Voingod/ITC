function verificationPassedEnable() {
    var checksite = Xrm.Page.getAttribute("uds_checksite").getValue();
    var activityprofilesid = Xrm.Page.getAttribute("uds_activityprofilesid").getValue();
    var availabilityofprod = Xrm.Page.getAttribute("uds_availabilityofprod").getValue();
    var leadpurchaseset = Xrm.Page.getAttribute("uds_leadpurchaseset").getValue();
    var partnerofourpp = Xrm.Page.getAttribute("uds_partnerofourpp").getValue();

    if (checksite != null && activityprofilesid != null &&
        availabilityofprod != null && leadpurchaseset != null && partnerofourpp != null) {

        Xrm.Page.getAttribute("uds_checkcarriedout").setSubmitMode("always");
        Xrm.Page.getControl("uds_checkcarriedout").setDisabled(false);

        //console.log("all good");
    }
}

function setCheckedby() {
    Xrm.Page.getAttribute("uds_checkedby").setSubmitMode("always");
    var ownerid = Xrm.Page.getAttribute("ownerid").getValue();
    Xrm.Page.getAttribute("uds_checkedby").setValue(ownerid);
}

function checkRoleForUpdateField() {
    // Retrieve any user roles

    var fields = ["uds_checksite", "uds_activityprofilesid", "uds_availabilityofprod",
    "uds_leadpurchaseset", "uds_availabilityofprod","uds_listofpp","uds_partnerofourpp"]
    
    var userId = Xrm.Page.context.getUserId()
    var fetchXml =
        "<fetch mapping='logical'  distinct='true'>" +
        "<entity name='role'>" +
        "<attribute name='roleid' />" +
        "<attribute name='name' />" +
        "<order attribute='name' descending='false' />" +
        "    <link-entity name='systemuserroles' from='roleid' to='roleid' visible='false' intersect='true'>" +
        "      <link-entity name='systemuser' from='systemuserid' to='systemuserid' alias='aa'>" +
        "        <filter type='and'>" +
        "          <condition attribute='systemuserid' operator='eq' value='" + userId + "' />" +
        "        </filter>" +
        "      </link-entity>" +
        "    </link-entity>" +
        "</entity>" +
        "</fetch>";
    var usersRoles = XrmServiceToolkit.Soap.Fetch(fetchXml);
    var usersRolesName=[];
    var roleForUpdate = ["Системный администратор", "Бизнес-Администратор", "Аналитик", "Проверка клиентов перед передачей"];
    for (var i = 0; i < usersRoles.length; i++) {
        usersRolesName.push(usersRoles[i].attributes["name"].value);
    }

    for (var i = 0; i < roleForUpdate.length; i++) {
        if (usersRolesName.includes(roleForUpdate[i])) {
            //console.log(roleForUpdate[i])
            
            for (var j = 0; j < fields.length; j++) {
                Xrm.Page.getControl(fields[j]).setDisabled(false);
                //console.log(fields[j]);
            }
            break;
        }
        
    }
}