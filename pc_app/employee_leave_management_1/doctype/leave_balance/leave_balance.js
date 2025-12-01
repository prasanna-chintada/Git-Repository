// Copyright (c) 2025, chinthada prasanna and contributors
// For license information, please see license.txt

frappe.ui.form.on('Leave Balance', {
    entitlement: function(frm) {
        calculate_balance(frm);
    },
    leave_taken: function(frm) {
        calculate_balance(frm);
    }
});

function calculate_balance(frm) {
    let ent = frm.doc.entitlement || 0;
    let taken = frm.doc.leave_taken || 0;
    frm.set_value("leave_remaining", ent - taken);
}
