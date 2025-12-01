// Copyright (c) 2025, chinthada prasanna and contributors
// For license information, please see license.txt

frappe.ui.form.on('Staff Record', {
    employee_id: function(frm) {
        if (frm.doc.employee_id) {
            frappe.db.get_value('Employee', frm.doc.employee_id, 'employee_name')
                .then(r => {
                    if (r.message) {
                        frm.set_value('employee_name', r.message.employee_name);
                    }
                });
        }
    }
});
